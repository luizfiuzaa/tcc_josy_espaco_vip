import { TestBed } from '@angular/core/testing';

import { FaturamentosService } from './faturamentos.service';

describe('FaturamentosService', () => {
  let service: FaturamentosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaturamentosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
