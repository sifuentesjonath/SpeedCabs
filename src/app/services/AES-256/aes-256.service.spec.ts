import { TestBed } from '@angular/core/testing';

import { Aes256Service } from './aes-256.service';

describe('Aes256Service', () => {
  let service: Aes256Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Aes256Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
