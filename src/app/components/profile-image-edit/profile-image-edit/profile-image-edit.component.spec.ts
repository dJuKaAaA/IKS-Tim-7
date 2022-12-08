import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileImageEditComponent } from './profile-image-edit.component';

describe('ProfileImageEditComponent', () => {
  let component: ProfileImageEditComponent;
  let fixture: ComponentFixture<ProfileImageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileImageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
