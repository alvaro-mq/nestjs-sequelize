import { Cat } from './cat.model';
import { CATS_REPOSITORY } from '../../core/constants';
export const catsProviders = [
  {
    provide: CATS_REPOSITORY,
    useValue: Cat,
  },
];
