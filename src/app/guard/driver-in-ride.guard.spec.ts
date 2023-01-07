import { TestBed } from '@angular/core/testing';

import { DriverInRideGuard } from './driver-in-ride.guard';

describe('DriverInRideGuard', () => {
  let guard: DriverInRideGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DriverInRideGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
