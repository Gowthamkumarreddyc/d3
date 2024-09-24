import { TestBed } from '@angular/core/testing';

import { GaugemeterService } from './gaugemeter.service';

describe('GaugemeterService', () => {
  let service: GaugemeterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GaugemeterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
