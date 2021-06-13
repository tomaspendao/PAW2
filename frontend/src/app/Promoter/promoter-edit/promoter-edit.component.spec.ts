import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterEditComponent } from './promoter-edit.component';

describe('PromoterEditComponent', () => {
  let component: PromoterEditComponent;
  let fixture: ComponentFixture<PromoterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
