import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { generateToken } from '@/config/auth';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import User from '@/models/user.model';
import { validateRegister } from '@/validators/register.validator';
import { validateLogin } from '@/validators/login.validator';
import { validateUpdateUser } from '@/validators/update-user.validator';
import logger from '@/config/logger';
import { validateId } from '@/validators/id.validator';
import Follower from '@/models/follower.model';
import UserService from '@/services/user.service';
import Country from '@/models/country.model';
import { validateUpdatePassword } from '@/validators/update-password.validator';
import { In, Like, Not } from 'typeorm';

import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { connection } from '@/config/database';
import Conversation from '@/models/conversation.model';
import env from '@/config/env';

const unlinkAsync = promisify(fs.unlink);

class UserController {
    async register(req: Request, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const validationResult = await validateRegister(req.body);
            if (!validationResult.status) {
                const { errors } = validationResult;
                return res.status(422).json({
                    message: errors,
                });
            }

            const serviceResult = await UserService.createUser(req.body);
            if (!serviceResult.status) {
                const { code, message } = serviceResult;
                return res.status(code).json({
                    message,
                });
            }

            const user = serviceResult.user;
            const token = generateToken(user!.id);

            return res.status(201).json({
                message: 'Usuario agregado con éxito',
                token,
            });
        } catch (error) {
            logger.error(`${error as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const validationResult = validateLogin(req.body);
            if (!validationResult.status) {
                return res.status(422).json({
                    message: validationResult.errors,
                });
            }

            const { email, password } = req.body;
            const requestedUser = await User.findOne({
                where: {
                    email,
                },
                relations: ['country'],
            });
            if (!requestedUser) {
                return res.status(401).json({
                    message: 'Credenciales incorrectas',
                });
            }

            const checkPassword = await bcrypt.compare(
                password,
                requestedUser.password,
            );
            if (!checkPassword) {
                return res.status(401).json({
                    message: 'Credenciales incorrectas',
                });
            }

            const token = generateToken(requestedUser.id);
            return res.json({
                message: 'Inicio de sesión éxitoso',
                user: requestedUser,
                token,
            });
        } catch (error) {
            logger.error(
                `Error durante un inicio de sesión: ${error as string}`,
            );
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async logout(req: Request, res: Response): Promise<Response> {
        return res.json({});
    }

    async update(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const userId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const authUser = req.user;
            if (user.id !== authUser.id) {
                return res.status(403).json({
                    message: 'Permiso denegado',
                });
            }

            const result = validateUpdateUser(req.body);
            if (!result.status) {
                return res.status(422).json({
                    message: result.errors,
                });
            }

            const { email, username, birthDate, gender, country } = req.body;

            const existingUserEmail = await User.findOne({
                where: {
                    email,
                    id: Not(userId),
                },
            });
            if (existingUserEmail) {
                return res.status(409).json({
                    message:
                        'El correo electrónico está siendo utilizado por alguien más',
                });
            }

            const existingUserUsername = await User.findOne({
                where: {
                    username,
                    id: Not(userId),
                },
            });
            if (existingUserUsername) {
                return res.status(409).json({
                    message:
                        'El nombre de usuario está siendo utilizado por alguien más',
                });
            }

            user.username = username ?? user.username;
            user.email = email ?? user.email;
            user.birthDate = birthDate ?? user.birthDate;
            user.gender = gender ?? user.gender;

            if (country) {
                const selectedCountry = await Country.findOneBy({
                    name: country,
                });
                if (selectedCountry) {
                    user.country = selectedCountry;
                }
            }

            await user.save();

            return res.json({
                message: 'Actualizado con éxito',
                user,
            });
        } catch (exception) {
            logger.error(`
                Error durante una actualización de usuario: 
                ${exception as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async updatePassword(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const contentType = req.get('content-type');
            if (!contentType?.includes('application/json')) {
                return res.status(415).json({
                    message: 'Tipo de contenido invalido',
                });
            }

            const userId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const authUser = req.user;
            if (user.id !== authUser.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const validationResult = await validateUpdatePassword(req.body);
            if (!validationResult.status) {
                const { errors } = validationResult;
                return res.status(422).json({
                    message: errors,
                });
            }

            const { currentPassword, newPassword } = req.body;

            const checkPassword = await bcrypt.compare(
                currentPassword,
                user.password,
            );
            if (!checkPassword) {
                return res.status(401).json({
                    message: 'Contraseña incorrecta',
                });
            }

            user.password = await bcrypt.hash(newPassword, 12);

            await user.save();

            return res.json({
                message: 'Actualizado con éxito',
            });
        } catch (error) {
            logger.error(`
                Error durante una actualización de contraseña: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async updateAvatar(req: AuthRequest, res: Response): Promise<Response> {
        try {
            if (!req.file) {
                return res.status(500).json({
                    message: 'Error',
                });
            }

            const userId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                await unlinkAsync(req.file.path);
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                await unlinkAsync(req.file.path);
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const authUser = req.user;
            if (user.id !== authUser.id) {
                await unlinkAsync(req.file.path);
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            const oldAvatar = user.avatar;
            user.avatar = req.file.filename;

            // TODO: Errores si no existe
            if (oldAvatar) {
                try {
                    await unlinkAsync(oldAvatar);
                } catch (error) {
                    logger.info(`No existe la imagen ${oldAvatar}`);
                }
            }

            await user.save();

            return res.json({
                message: 'El avatar fue añadido',
            });
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async getAvatar(req: AuthRequest, res: Response): Promise<void> {
        try {
            const userId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
                return;
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
                return;
            }

            console.log(env.get('server.uploads_dir'));

            res.sendFile(path.join(env.get('server.uploads_dir'), user.avatar));
        } catch (error) {
            res.sendFile(
                path.join(
                    env.get('server.uploads_dir'),
                    'default-profile-picture.png',
                ),
            );
        }
    }

    async delete(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const authUser = req.user;
            if (user.id !== authUser.id) {
                return res.status(401).json({
                    message: 'No autorizado',
                });
            }

            await user.softRemove();

            return res.json({
                message: 'La cuenta fue eliminada éxitosamente',
            });
        } catch (error) {
            logger.error(`
                Error durante una suspensión de cuenta: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    // TODO: PUEDE SER MEJOR
    async findAll(req: AuthRequest, res: Response): Promise<Response> {
        const authUser = req.user;
        const username = (req.query.username as string) ?? '';

        const query = connection
            .getRepository(Conversation)
            .createQueryBuilder('conversation')
            .innerJoin('conversation.participants', 'participants')
            .select('conversation.id')
            .where('participants.user = :userId', { userId: authUser.id })
            .getQuery();

        const usersWithoutConversation = await connection
            .getRepository(Conversation)
            .createQueryBuilder('conversation')
            .innerJoin('conversation.participants', 'participants')
            .innerJoin('participants.user', 'user')
            .select(['user.id'])
            .where(`conversation.id IN (${query})`)
            .andWhere('user.id != :userId', { userId: authUser.id })
            .getRawMany();

        const userIDs = usersWithoutConversation.map((user) => user.user_id);
        userIDs.push(authUser.id);

        const users = await User.find({
            where: {
                id: Not(In(userIDs)),
                username: Like(`%${username}%`),
            },
        });

        return res.json({
            users,
        });
    }

    async findNotChatUsers(req: Request, res: Response): Promise<Response> {
        const users = await User.find();

        const conversations = await Conversation.find();

        return res.json({
            users,
            conversations,
        });
    }

    async findOne(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.id) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: idResult.errors,
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            return res.json({
                user,
            });
        } catch (error) {
            logger.error(`
                Error buscando un usuario: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    // TODO: Follower controller
    async followUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const authUser = req.user;
            if (authUser.id === userId) {
                return res.status(400).json({
                    message: 'No te puedes seguir a ti mismo',
                });
            }

            // Validar si es que ya lo sigue
            const existingFollower = await Follower.findOne({
                where: {
                    followedUser: { id: user.id },
                    followerUser: { id: authUser.id },
                },
            });
            if (existingFollower) {
                return res.status(409).json({
                    message: 'Ya sigues a este usuario',
                });
            }

            const follower = new Follower();
            follower.followedUser = user;
            follower.followerUser = authUser;

            await follower.save();

            return res.status(201).json({
                message: 'Ahora sigues a este usuario',
            });
        } catch (error) {
            logger.error(`
                Error al seguir un usuario: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async unfollowUser(req: AuthRequest, res: Response): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const authUser = req.user;

            const existingFollower = await Follower.findOne({
                where: {
                    followedUser: { id: user.id },
                    followerUser: { id: authUser.id },
                },
            });
            if (!existingFollower) {
                return res.status(404).json({
                    message: 'No sigues a este usuario',
                });
            }

            await existingFollower.softRemove();

            return res.json({
                message: 'Se ha dejado de seguir el usuario',
            });
        } catch (error) {
            logger.error(`
                Error al dejar de seguir a un usuario: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    // TODO: Validar
    async getFollowersByUser(
        req: AuthRequest,
        res: Response,
    ): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            // const authUser = req.user;

            const maxLimitValue = Math.pow(2, 32);
            const pageQueryParam = req.query.page as string;
            const limitQueryParam = req.query.limit as string;

            const page = Number.parseInt(pageQueryParam) || 1;
            const limit = Number.parseInt(limitQueryParam) || 5;

            if (
                isNaN(page) ||
                !Number.isInteger(page) ||
                page < 1 ||
                page > maxLimitValue
            ) {
                return res.status(422).json({
                    message: 'Pagina no valido',
                });
            }

            if (
                isNaN(limit) ||
                !Number.isInteger(limit) ||
                limit < 1 ||
                limit > maxLimitValue
            ) {
                return res.status(422).json({
                    message: 'Límite no valido',
                });
            }

            const [followers, total] = await Follower.findAndCount({
                where: {
                    followedUser: { id: userId },
                },
                relations: ['followerUser'],
                skip: (page - 1) * limit,
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);

            return res.json({
                followers,
                totalPages,
            });
        } catch (error) {
            logger.error(`
                Error al dejar de seguir a un usuario: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async getFollowedByUser(
        req: AuthRequest,
        res: Response,
    ): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const maxLimitValue = Math.pow(2, 32);
            const pageQueryParam = req.query.page as string;
            const limitQueryParam = req.query.limit as string;

            const page = Number.parseInt(pageQueryParam) || 1;
            const limit = Number.parseInt(limitQueryParam) || 5;

            if (
                isNaN(page) ||
                !Number.isInteger(page) ||
                page < 1 ||
                page > maxLimitValue
            ) {
                return res.status(422).json({
                    message: 'Pagina no valido',
                });
            }

            if (
                isNaN(limit) ||
                !Number.isInteger(limit) ||
                limit < 1 ||
                limit > maxLimitValue
            ) {
                return res.status(422).json({
                    message: 'Límite no valido',
                });
            }

            // const authUser = req.user;

            const [following, total] = await Follower.findAndCount({
                where: {
                    followerUser: { id: userId },
                },
                relations: ['followedUser'],
                skip: (page - 1) * limit,
                take: limit,
            });
            const totalPages = Math.ceil(total / limit);

            return res.json({
                following,
                totalPages,
            });
        } catch (error) {
            logger.error(`
                Error al dejar de seguir a un usuario: 
                ${error as string}
            `);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }

    async getNotFollowedByUser(
        req: AuthRequest,
        res: Response,
    ): Promise<Response> {
        try {
            const userId = Number.parseInt(req.params.userId) || -1;
            const idResult = validateId(userId);
            if (!idResult.status) {
                return res.status(422).json({
                    message: 'El identificador seleccionado no es válido',
                });
            }

            const user = await User.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json({
                    message: 'El usuario solicitado no fue encontrado',
                });
            }

            const usersNotFollowedByUser = await connection
                .getRepository(User)
                .createQueryBuilder('u')
                .where(
                    'u.id NOT IN (' +
                        connection
                            .createQueryBuilder()
                            .select('f.followed_user_id')
                            .from('followers', 'f')
                            .where('f.follower_user_id = :userId', {
                                userId,
                            })
                            .getQuery() +
                        ')',
                )
                .andWhere('u.id != :userId', { userId })
                .orderBy('RAND()') // Esto varía según la base de datos, RAND() es para MySQL/MariaDB
                .getMany();

            return res.json(usersNotFollowedByUser);
        } catch (exception) {
            logger.error(`${exception as string}`);
            return res.status(500).json({
                message: 'Ocurrio un error en el servidor',
            });
        }
    }
}

export default new UserController();
