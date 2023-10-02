import { TestBed } from '@angular/core/testing';

import { MensagensService } from './mensagens.service';

describe('MensagensService', () => {
  let service: MensagensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensagensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
