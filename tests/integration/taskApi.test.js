import request from 'supertest';
import { app } from '../../src/index.js';

describe('Task API Integration Tests', () => {
  test('GET /graphql should return tasks', async () => {
    const response = await request(app)
      .post('/graphql')
      .send({ query: '{ getTasks { id title } }' });
    expect(response.status).toBe(200);
  });
});