import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverScheduledRideCardComponent } from './driver-scheduled-ride-card.component';

describe('DriverScheduledRideCardComponent', () => {
  let component: DriverScheduledRideCardComponent;
  let fixture: ComponentFixture<DriverScheduledRideCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverScheduledRideCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverScheduledRideCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
