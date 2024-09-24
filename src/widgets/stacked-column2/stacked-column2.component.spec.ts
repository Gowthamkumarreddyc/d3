import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedColumn2Component } from './stacked-column2.component';

describe('StackedColumn2Component', () => {
  let component: StackedColumn2Component;
  let fixture: ComponentFixture<StackedColumn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedColumn2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedColumn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
