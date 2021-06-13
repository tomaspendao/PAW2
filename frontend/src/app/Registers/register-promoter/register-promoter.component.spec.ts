import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPromoterComponent } from './register-promoter.component';

describe('RegisterPromoterComponent', () => {
  let component: RegisterPromoterComponent;
  let fixture: ComponentFixture<RegisterPromoterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPromoterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPromoterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
