import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverCreationComponent } from './driver-creation.component';

describe('DriverCreationComponent', () => {
  let component: DriverCreationComponent;
  let fixture: ComponentFixture<DriverCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
