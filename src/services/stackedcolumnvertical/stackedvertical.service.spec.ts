import { TestBed } from '@angular/core/testing';

import { StackedverticalService } from './stackedvertical.service';

describe('StackedverticalService', () => {
  let service: StackedverticalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackedverticalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
