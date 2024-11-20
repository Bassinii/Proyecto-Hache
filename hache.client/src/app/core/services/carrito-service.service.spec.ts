import { TestBed } from '@angular/core/testing';

import { CarritoServiceService } from './carrito-service.service';

describe('CarritoServiceService', () => {
  let service: CarritoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarritoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
