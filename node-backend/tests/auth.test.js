const request = require('supertest');
const app = require('../../app');
const User = require('../models/user');
const bcrypt = require('../../utils/bcrypt');

describe('Authentication API', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/register').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User  created successfully');
  });

  it('should login a user', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'password123'
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should not login a user with invalid credentials', async () => {
    const user = new User({
      email: 'test@example.com',
      password: 'password123'
    });
    await user.save();
    const response = await request(app).post('/login').send({
      email: 'test@example.com',
      password: 'wrongpassword'
    });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid email or password');
  });
});