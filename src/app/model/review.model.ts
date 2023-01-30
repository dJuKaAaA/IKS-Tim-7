import { SimpleUser } from './simple-user.model';

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  passenger?: SimpleUser;
}
