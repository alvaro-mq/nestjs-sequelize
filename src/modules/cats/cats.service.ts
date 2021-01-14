import { Injectable, Inject } from '@nestjs/common';
import { CatDTO } from './cat.dto';
import { Cat } from './cat.model';
import { CATS_REPOSITORY } from '../../core/constants';

@Injectable()
export class CatsService {
  constructor(@Inject(CATS_REPOSITORY) private readonly catsRepo: typeof Cat) {}

  async getCats(): Promise<Cat[]> {
    return this.catsRepo.findAll();
  }

  async addCat(cat: CatDTO) {
    return this.catsRepo.create(cat);
  }
}
