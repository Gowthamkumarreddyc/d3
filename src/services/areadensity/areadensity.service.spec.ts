import { TestBed } from '@angular/core/testing';

import { AreadensityService } from './areadensity.service';

describe('AreadensityService', () => {
  let service: AreadensityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreadensityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
