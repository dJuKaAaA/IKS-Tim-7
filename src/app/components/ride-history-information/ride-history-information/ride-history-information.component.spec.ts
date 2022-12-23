import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideHistoryInformationComponent } from './ride-history-information.component';

describe('RideHistoryInformationComponent', () => {
  let component: RideHistoryInformationComponent;
  let fixture: ComponentFixture<RideHistoryInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideHistoryInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideHistoryInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
