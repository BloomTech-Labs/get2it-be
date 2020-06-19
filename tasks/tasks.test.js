const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../server');

describe('Tasks routes', () => {
    let token;
    
    beforeAll((done) => {
        request(server)
            .post('/api/auth/login')
            .send({email: 'bob1@gmail.com', password: '1234test'})
            .end((err, res) => {
                token = res.body.token;
                done()
            })
    })

    describe('Post tasks', () => {
        beforeAll(async (done) => {
            await db('tasks').truncate();
            done()
        })

        it('Should return 201', (done) => {            
            request(server)
                .post('/api/users/1/tasks')
                .send({name: "Task 1"})
                .set('Authorization', token)
                .expect(201, done)
        })
        it('Should have 1 task', async () => {
            const tasksDB = await db('tasks');
            expect(tasksDB).toHaveLength(1);
        })  
    })

    describe('Get tasks', () => {
        it('Should return 200 and Task 1', (done) => {
            request(server)
                .get('/api/users/1/tasks')
                .set('Authorization', token)
                .expect((res) => {
                    res.body.name = 'Task 1'
                })
                .expect(200, done)
        })
    })

    describe('Put tasks', () => {
        it('Should return 200', (done) => {
            request(server)
                .put('/api/users/tasks/1')
                .send({name:"Task 2", user_id:"2"})
                .set('Authorization', token)
                .expect(200, done)
        })
        it('Should return Task 2', (done) => {
            request(server)
                .get('/api/users/1/tasks')
                .set('Authorization', token)
                .expect((res) => {
                    res.body.name = 'Task 2'
                }, done())
        })
    })
})