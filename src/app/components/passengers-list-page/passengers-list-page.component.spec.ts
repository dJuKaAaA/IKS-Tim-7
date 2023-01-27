import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersListPageComponent } from './passengers-list-page.component';

describe('PassengersListPageComponent', () => {
  let component: PassengersListPageComponent;
  let fixture: ComponentFixture<PassengersListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
