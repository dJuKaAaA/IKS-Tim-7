import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRideHistoryDetailsComponent } from './driver-ride-history-details.component';

describe('DriverRideHistoryDetailsComponent', () => {
  let component: DriverRideHistoryDetailsComponent;
  let fixture: ComponentFixture<DriverRideHistoryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRideHistoryDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRideHistoryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
