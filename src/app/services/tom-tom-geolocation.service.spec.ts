import { TestBed } from '@angular/core/testing';

import { TomTomGeolocationService } from './tom-tom-geolocation.service';

describe('TomTomGeolocationService', () => {
  let service: TomTomGeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TomTomGeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
