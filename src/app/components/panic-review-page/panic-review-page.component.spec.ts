import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicReviewPageComponent } from './panic-review-page.component';

describe('PanicReviewPageComponent', () => {
  let component: PanicReviewPageComponent;
  let fixture: ComponentFixture<PanicReviewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicReviewPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
