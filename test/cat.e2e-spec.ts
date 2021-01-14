import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CatDTO } from 'src/modules/cats/cat.dto';

describe('E2E Tests for NOTE Endpoints', () => {
  let app: INestApplication;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a cat', () => {
    const cat: CatDTO = {
      name: 'peluza',
      age: 5,
      breed: 'other',
    };
    return request(app.getHttpServer())
      .post('/cats')
      .set('Accept', 'application/json')
      .send(cat)
      .expect(HttpStatus.CREATED);
  });

  it('should get all cats', () => {
    return request(app.getHttpServer())
      .get('/cats')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK);
  });
});
