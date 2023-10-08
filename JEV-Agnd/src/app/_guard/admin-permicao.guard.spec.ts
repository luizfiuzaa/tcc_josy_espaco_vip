import { TestBed } from '@angular/core/testing';

import { AdminPermicaoGuard } from './admin-permicao.guard';

describe('AdminPermicaoGuard', () => {
  let guard: AdminPermicaoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminPermicaoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
