import { TestBed } from '@angular/core/testing';

import { VehicleTypeServiceService } from './vehicle-type-service.service';

describe('VehicleTypeServiceService', () => {
  let service: VehicleTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehicleTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
