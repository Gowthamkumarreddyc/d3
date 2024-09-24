import { TestBed } from '@angular/core/testing';

import { StackedhorizontalService } from './stackedhorizontal.service';

describe('StackedhorizontalService', () => {
  let service: StackedhorizontalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StackedhorizontalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
