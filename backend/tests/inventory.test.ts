import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/config/db.js';

describe('Inventory Endpoints - Purchase & Restock (TDD)', () => {
  let adminToken: string;
  let userToken: string;

  beforeEach(async () => {
    db.resetTestDb();

    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@auramotors.com', password: 'admin123' });
    adminToken = adminRes.body.token;

    const userRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@auramotors.com', password: 'user123' });
    userToken = userRes.body.token;
  });

  it('should allow user to purchase a vehicle and decrease stock', async () => {
    // veh-001 initially has quantity 3
    const res = await request(app)
      .post('/api/vehicles/veh-001/purchase')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ quantity: 1 });

    expect(res.status).toBe(200);
    expect(res.body.vehicle.quantity).toBe(2);
  });

  it('should reject purchase when requested quantity exceeds available stock', async () => {
    const res = await request(app)
      .post('/api/vehicles/veh-001/purchase')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ quantity: 99 });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('out of stock');
  });

  it('should allow admin to restock inventory', async () => {
    // veh-005 initially has quantity 1
    const res = await request(app)
      .post('/api/vehicles/veh-005/restock')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ quantity: 10 });

    expect(res.status).toBe(200);
    expect(res.body.vehicle.quantity).toBe(11);
  });

  it('should forbid non-admin user from restocking', async () => {
    const res = await request(app)
      .post('/api/vehicles/veh-005/restock')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ quantity: 5 });

    expect(res.status).toBe(403);
  });
});
