import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review.model';
import { Reviews } from '../model/reviews.model';
import { RideReview } from '../model/ride-review.model';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  public getReviews(rideId: number): Observable<RideReview[]> {
    return this.http.get<RideReview[]>(
      environment.localhostApi + `review/${rideId}`
    );
  }

  public getDriverReviews(driverId: number): Observable<Reviews> {
    return this.http.get<Reviews>(
      environment.localhostApi + `review/driver/${driverId}`
    );
  }

  public getVehicleReviews(vehicleId: number): Observable<Reviews> {
    return this.http.get<Reviews>(
      environment.localhostApi + `review/vehicle/${vehicleId}`
    );
  }

  public saveDriverReview(review: Review, rideId: number): Observable<Review>{
    return this.http.post<Review>(environment.localhostApi + `review/${rideId}/driver`, review);
  }

  public saveVehicleReview(review: Review, rideId: number): Observable<Review>{
    return this.http.post<Review>(environment.localhostApi + `review/${rideId}/vehicle`, review);
  }
}
