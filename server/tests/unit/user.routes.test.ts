import app from '@config/app';
import { databaseConnection } from '@/connection';
import type { Server } from 'http';
import supertest from 'supertest';
import type { DataSource } from 'typeorm';

const api = supertest(app);
let dataSource: DataSource | null;
let server: Server;
let token: string = '';

describe('User Routes', () => {
    test('Get all users', async () => {
        await api
            .get('/api/v1/users')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('User creation success', async () => {
        await api
            .post('/api/v1/users')
            .send({
                username: 'john_doe',
                password: '12345678',
                confirmPassword: '12345678',
                email: 'john_doe@correo.com',
            })
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('User creation failed for missing required fields', async () => {
        await api
            .post('/api/v1/users')
            .send({})
            .expect(422)
            .expect('Content-Type', /application\/json/);
    });

    test('Login success', async () => {
        const res = await api
            .post('/api/v1/users/login')
            .send({ email: 'john_doe@correo.com', password: '12345678' })
            .expect(200)
            .expect('Content-Type', /application\/json/);
        token = res.body.token;
    });

    test('Login failed for not correct credentials', async () => {
        await api
            .post('/api/v1/users/login')
            .send({ email: 'john_doe@correo.com', password: '98765432' })
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });

    test('Login failed for missing required fields', async () => {
        await api
            .post('/api/v1/users/login')
            .send({})
            .expect(422)
            .expect('Content-Type', /application\/json/);
    });

    test('Poll creation success', async () => {
        await api
            .post('/api/v1/polls')
            .send({
                title: 'Example',
                description: 'This is an example poll',
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    });

    test('Poll creation failed for missing required fields', async () => {
        await api
            .post('/api/v1/polls')
            .send({})
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .expect('Content-Type', /application\/json/);
    });

    test('Poll creation failed for empty required fields', async () => {
        await api
            .post('/api/v1/polls')
            .send({
                title: '',
                description: '',
            })
            .set('Authorization', `Bearer ${token}`)
            .expect(422)
            .expect('Content-Type', /application\/json/);
    });
});

beforeAll(async () => {
    dataSource = await databaseConnection();
    server = app.listen(app.get('port'));
});

afterAll(async () => {
    server.close();
    await dataSource?.destroy();
});
