import { TestBed } from '@angular/core/testing';

import { SFattureService } from './sfatture.service';

describe('SFattureService', () => {
  let service: SFattureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SFattureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
