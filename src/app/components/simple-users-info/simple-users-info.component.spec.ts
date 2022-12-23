import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleUsersInfoComponent } from './simple-users-info.component';

describe('SimpleUsersInfoComponent', () => {
  let component: SimpleUsersInfoComponent;
  let fixture: ComponentFixture<SimpleUsersInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleUsersInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleUsersInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
