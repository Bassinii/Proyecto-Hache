import { TestBed } from '@angular/core/testing';

import { TurnoCajaService } from './turno-caja.service';

describe('TurnoCajaService', () => {
  let service: TurnoCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TurnoCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
