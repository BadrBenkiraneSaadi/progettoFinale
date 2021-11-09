import { TestBed } from '@angular/core/testing';

import { SUtenteService } from './sutente.service';

describe('SUtenteService', () => {
  let service: SUtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SUtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
