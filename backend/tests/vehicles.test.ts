import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/config/db.js';

describe('Vehicles CRUD & Search Endpoints (TDD)', () => {
  let adminToken: string;
  let userToken: string;

  beforeEach(async () => {
    db.resetTestDb();

    // Get Admin Token
    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@auramotors.com', password: 'admin123' });
    adminToken = adminRes.body.token;

    // Get User Token
    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@auramotors.com', password: 'user123' });
    userToken = userRes.body.token;
  });

  it('should deny unauthorized access without token', async () => {
    const res = await request(app).get('/api/vehicles');
    expect(res.status).toBe(401);
  });

  it('should return list of vehicles for authenticated user', async () => {
    const res = await request(app)
      .get('/api/vehicles')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should search vehicles by category and keyword', async () => {
    const res = await request(app)
      .get('/api/vehicles/search?category=Hypercar')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.status).toBe(200);
    expect(res.body.every((v: any) => v.category === 'Hypercar')).toBe(true);
  });

  it('should allow admin to add a new luxury vehicle', async () => {
    const newCar = {
      make: 'Bugatti',
      model: 'Chiron Gold Standard',
      category: 'Hypercar',
      price: 3800000,
      quantity: 2,
      year: 2026
    };

    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newCar);

    expect(res.status).toBe(201);
    expect(res.body.make).toBe('Bugatti');
    expect(res.body).toHaveProperty('id');
  });

  it('should forbid non-admin from creating a vehicle', async () => {
    const res = await request(app)
      .post('/api/vehicles')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ make: 'Ferrari', model: 'SF90', category: 'Supercar', price: 600000, quantity: 1 });

    expect(res.status).toBe(403);
  });

  it('should allow admin to update a vehicle details', async () => {
    const res = await request(app)
      .put('/api/vehicles/veh-001')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ price: 3500000, quantity: 5 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe(3500000);
    expect(res.body.quantity).toBe(5);
  });

  it('should allow admin to delete a vehicle', async () => {
    const res = await request(app)
      .delete('/api/vehicles/veh-005')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toContain('deleted');
  });
});
