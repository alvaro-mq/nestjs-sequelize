import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

const testCat = { id: 1, name: 'peluza', age: 5, breed: 'angora' };

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
    expect(await controller.getCats()).toEqual([testCat]);
  });

  it('should make a new cat', async () => {
    expect(
      await controller.newCat({
        name: 'peluza',
        age: 5,
        breed: 'angora',
      }),
    ).toEqual(testCat);
  });
});
