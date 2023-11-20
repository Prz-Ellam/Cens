import { connection } from '@/config/database';
import type { AuthRequest } from '@/middlewares/auth.middleware';
import Option from '@/models/option.model';
import { validateId } from '@/validators/id.validator';
import type { Response } from 'express';

class OptionController {
    async findByGender(req: AuthRequest, res: Response): Promise<Response> {
        const pollId = Number.parseInt(req.params.pollId) || -1;
        const idResult = validateId(pollId);
        if (!idResult.status) {
            return res.status(422).json({
                message: 'El identificador seleccionado no es válido',
            });
        }

        const results = await connection
            .createQueryBuilder()
            .select('o.text', 'option')
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender = :male THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'male',
            )
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender = :female THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'female',
            )
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender = :other THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'other',
            )
            .addSelect(
                'CAST(IFNULL(SUM(CASE WHEN u.gender IS NULL THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)',
                'unknown',
            )
            .from(Option, 'o')
            .leftJoin('votes', 'v', 'o.id = v.option_id')
            .leftJoin('users', 'u', 'v.user_id = u.id')
            .where('o.poll_id = :pollId', { pollId })
            .groupBy('o.id')
            .setParameters({
                male: 'masculino',
                female: 'femenino',
                other: 'otro',
            })
            .getRawMany();

        return res.json(results);
    }

    async findByAge(req: AuthRequest, res: Response): Promise<Response> {
        const pollId = Number.parseInt(req.params.pollId) || -1;
        const idResult = validateId(pollId);
        if (!idResult.status) {
            return res.status(422).json({
                message: 'El identificador seleccionado no es válido',
            });
        }

        const results = await connection
            .createQueryBuilder()
            .select('o.text', 'option')
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 18 AND 24 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '18-24',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 25 AND 34 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '25-34',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 35 AND 44 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '35-44',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 45 AND 54 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '45-54',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) BETWEEN 55 AND 64 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '55-64',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN TIMESTAMPDIFF(YEAR, u.birth_date, CURDATE()) >= 65 THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                '65+',
            )
            .addSelect(
                `CAST(IFNULL(SUM(CASE WHEN u.birth_date IS NULL THEN 1 ELSE 0 END) / COUNT(v.id) * 100, 0) AS FLOAT)`,
                'Unknown',
            )
            .from(Option, 'o')
            .leftJoin('votes', 'v', 'o.id = v.option_id')
            .leftJoin('users', 'u', 'v.user_id = u.id')
            .where('o.poll_id = :pollId', { pollId })
            .groupBy('o.id')
            .getRawMany();

        return res.json(results);
    }

    async findByCountry(req: AuthRequest, res: Response): Promise<Response> {
        const pollId = Number.parseInt(req.params.pollId) || -1;
        const idResult = validateId(pollId);
        if (!idResult.status) {
            return res.status(422).json({
                message: 'El identificador seleccionado no es válido',
            });
        }

        const result = await connection
            .getRepository('votes')
            .createQueryBuilder('votes')
            .select([
                "IFNULL(country.name, 'Desconocido') AS country",
                'IFNULL(CAST(100 * COUNT(users.id) / SUM(COUNT(users.id)) OVER(PARTITION BY votes.poll_id) AS FLOAT), 0) as percentage',
            ])
            .innerJoin('users', 'users', 'votes.user_id = users.id')
            .leftJoin('country', 'country', 'users.country_id = country.id')
            .where('votes.poll_id = :pollId', { pollId })
            .groupBy('country.name')
            .getRawMany();

        return res.json(result);
    }
}

export default new OptionController();
