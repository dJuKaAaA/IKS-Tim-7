import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCreationFormComponent } from './driver-creation-form.component';

describe('DriverCreationFormComponent', () => {
  let component: DriverCreationFormComponent;
  let fixture: ComponentFixture<DriverCreationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCreationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCreationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
