import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverChangeRequestReviewComponent } from './driver-change-request-review.component';

describe('DriverChangeRequestReviewComponent', () => {
  let component: DriverChangeRequestReviewComponent;
  let fixture: ComponentFixture<DriverChangeRequestReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverChangeRequestReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverChangeRequestReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
