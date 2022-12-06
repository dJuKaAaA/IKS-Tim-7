import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLoginRegistrationSectionComponent } from './navbar-login-registration-section.component';

describe('NavbarLoginRegistrationSectionComponent', () => {
  let component: NavbarLoginRegistrationSectionComponent;
  let fixture: ComponentFixture<NavbarLoginRegistrationSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarLoginRegistrationSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarLoginRegistrationSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
