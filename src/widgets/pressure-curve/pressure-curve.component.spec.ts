import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressureCurveComponent } from './pressure-curve.component';

describe('PressureCurveComponent', () => {
  let component: PressureCurveComponent;
  let fixture: ComponentFixture<PressureCurveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressureCurveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PressureCurveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
