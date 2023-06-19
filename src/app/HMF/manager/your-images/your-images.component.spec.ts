import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourImagesComponent } from './your-images.component';

describe('YourImagesComponent', () => {
  let component: YourImagesComponent;
  let fixture: ComponentFixture<YourImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourImagesComponent]
    });
    fixture = TestBed.createComponent(YourImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
