import path from 'path';
import type { DataSourceOptions } from 'typeorm';
import { createDatabase } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default async (): Promise<void> => {
    const options: DataSourceOptions = {
        type: 'mysql',
        database: 'cens_mock',
        username: 'root',
        password: '',
        host: 'localhost',
        port: 3306,
        synchronize: true,
        entities: [
            path.resolve(__dirname, '..', 'src', 'models', '**', '*.model.ts'),
        ],
        namingStrategy: new SnakeNamingStrategy(),
    };

    // Create the database with specification of the DataSource options
    await createDatabase({
        options,
    });
};
