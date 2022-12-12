import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomBtn1Component } from './custom-btn1.component';

describe('CustomBtn1Component', () => {
  let component: CustomBtn1Component;
  let fixture: ComponentFixture<CustomBtn1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomBtn1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomBtn1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
