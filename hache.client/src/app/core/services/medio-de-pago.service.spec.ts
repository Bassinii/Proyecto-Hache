import { TestBed } from '@angular/core/testing';

import { MedioDePagoService } from './medio-de-pago.service';

describe('MedioDePagoService', () => {
  let service: MedioDePagoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedioDePagoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
