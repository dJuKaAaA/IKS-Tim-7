import { TestBed } from '@angular/core/testing';

import { ImageParserService } from './image-parser.service';

describe('ImageParserService', () => {
  let service: ImageParserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageParserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
