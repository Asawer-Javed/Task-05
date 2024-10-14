const request = require('supertest');
const app = require('../../app');
const Task = require('../models/task');
const Category = require('../models/category');

describe('Task API', () => {
  beforeEach(async () => {
    await Task.deleteMany({});
    await Category.deleteMany({});
  });

  it('should create a new task', async () => {
    const category = new Category({
      name: 'Test Category'
    });
    await category.save();
    const response = await request(app).post('/tasks').send({
      title: 'Test Task',
      description: 'Test description',
      category: category._id
    });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
  });

  it('should get all tasks', async () => {
    const category = new Category({
      name: 'Test Category'
    });
    await category.save();
    const task1 = new Task({
      title: 'Test Task 1',
      description: 'Test description 1',
      category: category._id
    });
    await task1.save();
    const task2 = new Task({
      title: 'Test Task 2',
      description: 'Test description 2',
      category: category._id
    });
    await task2.save();
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it('should get a task by id', async () => {
    const category = new Category({
      name: 'Test Category'
    });
    await category.save();
    const task = new Task({
      title: 'Test Task',
      description: 'Test description',
      category: category._id
    });
    await task.save();
    const response = await request(app).get(`/tasks/${task._id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Test Task');
  });

  it('should update a task', async () => {
    const category = new Category({
      name: 'Test Category'
    });
    await category.save();
    const task = new Task({
      title: 'Test Task',
      description: 'Test description',
      category: category._id
    });
    await task.save();
    const response = await request(app).put(`/tasks/${task._id}`).send({
      title: 'Updated Task',
      description: 'Updated description'
    });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Task');
  });

  it('should delete a task', async () => {
    const category = new Category({
      name: 'Test Category'
    });
    await category.save();
    const task = new Task({
      title: 'Test Task',
      description: 'Test description',
      category: category._id
    });
    await task.save();
    const response = await request(app).delete(`/tasks/${task._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Task deleted successfully');
  });
});