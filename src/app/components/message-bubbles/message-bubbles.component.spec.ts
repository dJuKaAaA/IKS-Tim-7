import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageBubblesComponent } from './message-bubbles.component';

describe('MessageBubblesComponent', () => {
  let component: MessageBubblesComponent;
  let fixture: ComponentFixture<MessageBubblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageBubblesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageBubblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
