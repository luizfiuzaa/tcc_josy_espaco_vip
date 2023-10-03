import { TestBed } from '@angular/core/testing';

import { MsgDefinidasService } from './msg-definidas.service';

describe('MsgDefinidasService', () => {
  let service: MsgDefinidasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsgDefinidasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
