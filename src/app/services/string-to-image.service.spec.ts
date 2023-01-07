import { TestBed } from '@angular/core/testing';

import { StringToImageService } from './string-to-image.service';

describe('StringToImageService', () => {
  let service: StringToImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringToImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
