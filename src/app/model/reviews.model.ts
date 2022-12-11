import { Review } from './review.model';

export interface Reviews {
  totalCount: number;
  results: Review[];
}
