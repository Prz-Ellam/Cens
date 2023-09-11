// import app from '@/app';
// import logger from '@/config/logger';
// import supertest from 'supertest';

// const api = supertest(app);

// let token = '';
// describe('Poll Routes', () => {
//     test('Poll creation success', async () => {
//         await api
//             .post('/api/v1/polls')
//             .send({
//                 title: 'Example',
//                 description: 'This is an example poll',
//             })
//             .set('Authorization', `Bearer ${token}`)
//             .expect(201)
//             .expect('Content-Type', /application\/json/);
//     }, 50000);
// });

// beforeAll(async () => {
//     const res = await api.post('/api/v1/users/login').send({
//         email: 'john_doe@correo.com',
//         password: '12345678',
//     });
//     token = res.body.token;
//     logger.warn(token);
// });
