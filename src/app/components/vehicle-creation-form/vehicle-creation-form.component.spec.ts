import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleCreationFormComponent } from './vehicle-creation-form.component';

describe('VehicleCreationFormComponent', () => {
  let component: VehicleCreationFormComponent;
  let fixture: ComponentFixture<VehicleCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleCreationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
