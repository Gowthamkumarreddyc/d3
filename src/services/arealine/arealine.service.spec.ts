import { TestBed } from '@angular/core/testing';

import { ArealineService } from './arealine.service';

describe('ArealineService', () => {
  let service: ArealineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArealineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
