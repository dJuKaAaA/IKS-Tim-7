import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEditProfileComponent } from './driver-edit-profile.component';

describe('DriverEditProfileComponent', () => {
  let component: DriverEditProfileComponent;
  let fixture: ComponentFixture<DriverEditProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEditProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
