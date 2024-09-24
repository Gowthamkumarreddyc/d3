import { TestBed } from '@angular/core/testing';

import { MultilineService } from './multiline.service';

describe('MultilineService', () => {
  let service: MultilineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultilineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
