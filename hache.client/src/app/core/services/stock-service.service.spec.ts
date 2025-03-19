import { TestBed } from '@angular/core/testing';

import { StockServiceService } from './stock-service.service';

describe('StockServiceService', () => {
  let service: StockServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
