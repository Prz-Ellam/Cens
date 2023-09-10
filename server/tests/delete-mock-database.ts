import { dropDatabase } from 'typeorm-extension';

export default async (): Promise<void> => {
    // Perform cleanup or finalization tasks here
    await dropDatabase({
        options: {
            type: 'mysql',
            database: 'cens_mock',
            username: 'root',
            password: '',
            host: 'localhost',
            port: 3306,
        },
    });
};
