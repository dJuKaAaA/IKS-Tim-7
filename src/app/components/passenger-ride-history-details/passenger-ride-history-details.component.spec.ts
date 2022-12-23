import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerRideHistoryDetailsComponent } from './passenger-ride-history-details.component';

describe('PassengerRideHistoryDetailsComponent', () => {
  let component: PassengerRideHistoryDetailsComponent;
  let fixture: ComponentFixture<PassengerRideHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerRideHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerRideHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
