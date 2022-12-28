import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerProfileDetailsComponent } from './passenger-profile-details.component';

describe('PassengerProfileDetailsComponent', () => {
  let component: PassengerProfileDetailsComponent;
  let fixture: ComponentFixture<PassengerProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerProfileDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
