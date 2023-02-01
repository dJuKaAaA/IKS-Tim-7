import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedRideDialogComponent } from './finished-ride-dialog.component';

describe('FinishedRideDialogComponent', () => {
  let component: FinishedRideDialogComponent;
  let fixture: ComponentFixture<FinishedRideDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedRideDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedRideDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
