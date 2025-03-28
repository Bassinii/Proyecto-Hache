import { TestBed } from '@angular/core/testing';

import { DetalleVentaServiceService } from './detalle-venta-service.service';

describe('DetalleVentaServiceService', () => {
  let service: DetalleVentaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
