import { TestBed } from '@angular/core/testing';

import { HistorialCajaService } from './historial-caja.service';

describe('HistorialCajaService', () => {
  let service: HistorialCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
