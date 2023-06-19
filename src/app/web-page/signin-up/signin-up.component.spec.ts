import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninUpComponent } from './signin-up.component';

describe('SigninUpComponent', () => {
  let component: SigninUpComponent;
  let fixture: ComponentFixture<SigninUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SigninUpComponent]
    });
    fixture = TestBed.createComponent(SigninUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
