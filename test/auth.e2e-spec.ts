// test/auth.e2e-spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth E2E', () => {
  let app: INestApplication;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should register user', async () => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'test@mail.com',
        password: '1234567890',
      })
      .expect(201);
  });

  it('should login and return JWT token', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@mail.com',
        password: '1234567890',
      })
      .expect(201);

    console.log(response.body);
    expect(response.body.access_token).toBeDefined();

    accessToken = response.body.access_token;
  });

  it('should fail accessing protected route without token', async () => {
    await request(app.getHttpServer()).get('/task').expect(401);
  });

  it('should access protected route with JWT', async () => {
    await request(app.getHttpServer())
      .get('/task')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
