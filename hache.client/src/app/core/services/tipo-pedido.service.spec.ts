import { TestBed } from '@angular/core/testing';

import { TipoPedidoService } from './tipo-pedido.service';

describe('TipoPedidoService', () => {
  let service: TipoPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
