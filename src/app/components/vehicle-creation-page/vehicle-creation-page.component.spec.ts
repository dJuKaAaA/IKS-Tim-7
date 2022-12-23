import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreationPageComponent } from './vehicle-creation-page.component';

describe('VehicleCreationPageComponent', () => {
  let component: VehicleCreationPageComponent;
  let fixture: ComponentFixture<VehicleCreationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCreationPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCreationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
