import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterDetailsComponent } from './promoter-details.component';

describe('PromoterDetailsComponent', () => {
  let component: PromoterDetailsComponent;
  let fixture: ComponentFixture<PromoterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
