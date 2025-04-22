import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosVerPedidosComponent } from './pedidos-ver-pedidos.component';

describe('PedidosVerPedidosComponent', () => {
  let component: PedidosVerPedidosComponent;
  let fixture: ComponentFixture<PedidosVerPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PedidosVerPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PedidosVerPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
