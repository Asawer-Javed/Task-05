const request = require('supertest');
const app = require('../../app');

describe('Integration Tests', () => {
  it('should create a new user and login', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.status).toBe(201);
    const loginResponse = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  });

  it('should create a new task and retrieve it', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    const token = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    const taskResponse = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'Test description',
      category: 'Test Category'
    });
    expect(taskResponse.status).toBe(201);
    const taskId = taskResponse.body._id;
    const getTaskResponse = await request(app).get(`/tasks/${taskId}`);
    expect(getTaskResponse.status).toBe(200);
    expect(getTaskResponse.body.title).toBe('Test Task');
  });
});