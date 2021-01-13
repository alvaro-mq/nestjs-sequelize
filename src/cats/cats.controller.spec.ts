import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Response } from 'express';

const testCat = { id: 1, name: 'peluza', age: 5, breed: 'angora' };

const mockResponseObject = () => { 
  return createMock<Response>({
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  })
};

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            getCats: jest.fn(() => [testCat]),
            addCat: jest.fn(() => testCat),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should get new cats', async () => {
    const response = mockResponseObject();
    await controller.getCats(response);
    expect(response.json).toHaveBeenCalledTimes(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ status: 200, message: 'List cats succesfull.', data: [testCat] });
  });

  it('should make a new cat', async () => {
    const response = mockResponseObject();
    await controller.newCat(response, {
      name: 'peluza',
      age: 5,
      breed: 'angora',
    }),
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({ status: 201, message: 'Cat created succesfull.', data: testCat });
  });
});
