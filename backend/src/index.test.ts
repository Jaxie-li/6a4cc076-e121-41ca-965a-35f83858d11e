import request from 'supertest';
import app from './index';

describe('Express Server', () => {
  it('responds with health check on /api/health', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toEqual({
      status: 'OK',
      message: 'Server is running'
    });
  });

  it('handles CORS properly', async () => {
    const response = await request(app)
      .get('/api/health')
      .expect(200);

    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });

  it('returns 404 for unknown routes', async () => {
    await request(app)
      .get('/api/unknown')
      .expect(404);
  });
});