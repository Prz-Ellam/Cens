import User from '@/models/user.model';
import bcrypt from 'bcrypt';

interface ServiceStatus {
    status: boolean;
    code: number;
    message: string;
}

interface CreateUserResult extends ServiceStatus {
    user: User | undefined;
}

export default class UserService {
    static async createUser({
        email,
        username,
        password,
    }: {
        email: string;
        username: string;
        password: string;
    }): Promise<CreateUserResult> {
        const existingUserEmail = await User.findOneBy({ email });
        if (existingUserEmail) {
            return {
                status: false,
                code: 409,
                message:
                    'El correo electrónico está siendo utilizado por alguien más',
                user: undefined,
            };
        }

        const existingUserUsername = await User.findOneBy({ username });
        if (existingUserUsername) {
            return {
                status: false,
                code: 409,
                message:
                    'El nombre de usuario está siendo utilizado por alguien más',
                user: undefined,
            };
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = hashedPassword;

        await user.save();

        return {
            status: true,
            code: 200,
            message: '',
            user,
        };
    }
}
