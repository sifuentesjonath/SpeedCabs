import { TestBed } from '@angular/core/testing';

import { IonBottomDrawerService } from './ion-bottom-drawer.service';

describe('IonBottomDrawerService', () => {
  let service: IonBottomDrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonBottomDrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
