import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoterListComponent } from './promoter-list.component';

describe('PromoterListComponent', () => {
  let component: PromoterListComponent;
  let fixture: ComponentFixture<PromoterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromoterListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
