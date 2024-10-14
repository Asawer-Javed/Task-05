const supertest = require('supertest');
const app = require('../app');

describe('Category API', () => {
  it('should get all categories', async () => {
    const response = await supertest(app)
      .get('/categories');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should create a new category', async () => {
    const response = await supertest(app)
      .post('/categories')
      .send({ name: 'New Category' });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'New Category');
  });

  it('should update a category', async () => {
    const response = await supertest(app)
      .put('/categories/1')
      .send({ name: 'Updated Category' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Category');
  });

  it('should delete a category', async () => {
    const response = await supertest(app)
      .delete('/categories/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Category deleted successfully');
  });
});