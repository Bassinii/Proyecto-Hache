import { TestBed } from '@angular/core/testing';

import { ArticuloServiceService } from './articulo-service.service';

describe('ArticuloServiceService', () => {
  let service: ArticuloServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticuloServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
