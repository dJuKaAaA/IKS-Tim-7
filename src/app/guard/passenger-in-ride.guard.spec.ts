import { TestBed } from '@angular/core/testing';

import { PassengerInRideGuard } from './passenger-in-ride.guard';

describe('PassengerInRideGuard', () => {
  let guard: PassengerInRideGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PassengerInRideGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
