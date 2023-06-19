import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPrComponent } from './details-pr.component';

describe('DetailsPrComponent', () => {
  let component: DetailsPrComponent;
  let fixture: ComponentFixture<DetailsPrComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPrComponent]
    });
    fixture = TestBed.createComponent(DetailsPrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
