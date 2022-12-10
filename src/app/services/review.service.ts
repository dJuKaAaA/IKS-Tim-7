import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../model/review.model';
import { RideReview } from '../model/ride-review.model';

const API_URL: string = 'http://localhost:8081/';
@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  public getReviews(rideId: number): Observable<RideReview> {
    return this.http.get<RideReview>(API_URL + `api/review/${rideId}`);
  }
}
