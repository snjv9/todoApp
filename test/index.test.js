const appServer = require('../server')
const request = require('supertest')



let userId;

describe('Auth Routes', () => {
    let token;
    test('should login successfully with correct credentials', async () => {
        const res = await request(appServer)
            .get('/api/v1/login')
            .send({
                email: 'testUser@gmail.com',
                password: 'password',
            });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        token = res.body.token;
    });


    describe('Test user CRUD operations', () => {

        test('It should create a new user', async () => {
            const response = await request(appServer)
                .post('/api/v1/users')
                .send({
                    name: 'Test User',
                    email: `testuser${Math.floor(Math.random() * 1000)}@gmail.com`,
                    phoneNumber: '1234567890',
                    password: "password"
                });
            expect(response.statusCode).toBe(201);
            userId = response.body.data._id; // Save the user ID for later tests

        });

        test('It should retrieve all users', async () => {
            const response = await request(appServer).get('/api/v1/users');
            expect(response.statusCode).toBe(200);
        });

        test('It should retrieve a specific user', async () => {
            const response = await request(appServer).get(`/api/v1/users/${userId}`);
            expect(response.statusCode).toBe(200);
        });

        test('It should update a specific user', async () => {
            const response = await request(appServer)
                .patch(`/api/v1/users`)
                .send({
                    name: 'Updated Test User'
                }).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        });

        test('It should delete a specific user', async () => {
            const response = await request(appServer).delete(`/api/v1/users`).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(204);
        });
    });





    let todoId;
    describe('Test Todo CRUD operations', () => {

        test('It should create a new todo', async () => {
            const response = await request(appServer)
                .post('/api/v1/todos')
                .send({
                    text: 'New Task ',
                    completed: false,
                    user: userId,
                    userId: userId
                }).set('Authorization', `Bearer ${token}`);
            expect(response.statusCode).toBe(201);
            todoId = response.body.data._id; // Save the user ID for later tests

        });

        test('It should retrieve all todos', async () => {
            const response = await request(appServer).get('/api/v1/todos').set('Authorization', `Bearer ${token}`);;
            expect(response.statusCode).toBe(200);
        });

        test('It should retrieve a specific todo', async () => {
            const response = await request(appServer).get(`/api/v1/todos/${todoId}`).set('Authorization', `Bearer ${token}`);;
            expect(response.statusCode).toBe(200);
        });

        test('It should update a specific todo', async () => {
            const response = await request(appServer)
                .patch(`/api/v1/todos/${todoId}`)
                .send({
                    completed: true
                }).set('Authorization', `Bearer ${token}`);;
            expect(response.statusCode).toBe(200);
        });

        test('It should delete a specific user', async () => {
            const response = await request(appServer).delete(`/api/v1/todos/${todoId}`).set('Authorization', `Bearer ${token}`);;
            expect(response.statusCode).toBe(204);
        });


    });





});




afterAll(async () => {
    await appServer.close();
})