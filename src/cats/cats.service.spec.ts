import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { Cat } from './cat.model'

const testCat = { name: 'peluza', age: 5, breed: 'angora'};

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat),
          useValue: {
            findAll: jest.fn(() => [testCat]),
            create: jest.fn(() => testCat),
          }
        }
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should get the cats', async () => {
    expect(await service.getCats()).toEqual([testCat]);
  });

  it('should add a cat', async () => {
    expect(await service.addCat({
      name: 'peluza',
      age: 5,
      breed: 'angora'
    })).toEqual(testCat);
  })
});
