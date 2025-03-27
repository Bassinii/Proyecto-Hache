import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosListaComponent } from './productos-lista.component';

describe('ProductosListaComponent', () => {
  let component: ProductosListaComponent;
  let fixture: ComponentFixture<ProductosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
