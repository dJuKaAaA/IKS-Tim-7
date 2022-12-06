import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMainSectionComponent } from './navbar-main-section.component';

describe('NavbarMainSectionComponent', () => {
  let component: NavbarMainSectionComponent;
  let fixture: ComponentFixture<NavbarMainSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarMainSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMainSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
