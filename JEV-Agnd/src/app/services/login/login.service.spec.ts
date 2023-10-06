import { TestBed } from '@angular/core/testing';

import { AgendamentosService } from './login.service';

describe('AgendamentosService', () => {
  let service: AgendamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgendamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
