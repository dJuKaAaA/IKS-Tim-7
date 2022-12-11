import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfileDetailsComponent } from './driver-profile-details.component';

describe('DriverProfileDetailsComponent', () => {
  let component: DriverProfileDetailsComponent;
  let fixture: ComponentFixture<DriverProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
