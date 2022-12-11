import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressRouteFormComponent } from './address-route-form.component';

describe('AddressRouteFormComponent', () => {
  let component: AddressRouteFormComponent;
  let fixture: ComponentFixture<AddressRouteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressRouteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressRouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
