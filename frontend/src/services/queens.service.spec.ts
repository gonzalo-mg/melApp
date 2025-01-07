import { TestBed } from '@angular/core/testing';

import { QueensService } from './queens.service';

describe('QueensService', () => {
  let service: QueensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
