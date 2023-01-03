import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicListComponent } from './panic-list.component';

describe('PanicListComponent', () => {
  let component: PanicListComponent;
  let fixture: ComponentFixture<PanicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
