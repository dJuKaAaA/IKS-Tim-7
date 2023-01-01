import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicReviewComponent } from './panic-review.component';

describe('PanicReviewComponent', () => {
  let component: PanicReviewComponent;
  let fixture: ComponentFixture<PanicReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicReviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
