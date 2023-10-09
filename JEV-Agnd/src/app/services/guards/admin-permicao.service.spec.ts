import { TestBed } from '@angular/core/testing';

import { AdminPermicaoService } from './admin-permicao.service';

describe('AdminPermicaoService', () => {
  let service: AdminPermicaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPermicaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
