import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverProfilePageComponent } from './driver-profile-page.component';

describe('DriverProfilePageComponent', () => {
  let component: DriverProfilePageComponent;
  let fixture: ComponentFixture<DriverProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverProfilePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
