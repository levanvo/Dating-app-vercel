import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingFriendComponent } from './waiting-friend.component';

describe('WaitingFriendComponent', () => {
  let component: WaitingFriendComponent;
  let fixture: ComponentFixture<WaitingFriendComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaitingFriendComponent]
    });
    fixture = TestBed.createComponent(WaitingFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
