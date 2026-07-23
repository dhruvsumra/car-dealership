import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { db } from '../src/config/db.js';

describe('Auth Endpoints (TDD)', () => {
  beforeEach(() => {
    db.resetTestDb();
  });

  it('should register a new user successfully', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test Buyer',
        email: 'newbuyer@example.com',
        password: 'password123',
        role: 'user'
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user).toMatchObject({
      name: 'Test Buyer',
      email: 'newbuyer@example.com',
      role: 'user'
    });
  });

  it('should reject registration with existing email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Duplicate User',
        email: 'user@auramotors.com',
        password: 'password123'
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain('already exists');
  });

  it('should login an existing user with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@auramotors.com',
        password: 'admin123'
      });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.role).toBe('admin');
  });

  it('should fail login with invalid password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@auramotors.com',
        password: 'wrongpassword'
      });

    expect(res.status).toBe(401);
    expect(res.body.error).toContain('Invalid credentials');
  });
});
