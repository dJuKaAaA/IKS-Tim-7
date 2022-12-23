import { Review } from './review.model';

export interface RideReview {
  vehicleReviews: Review[];
  driverReviews: Review[];
}
