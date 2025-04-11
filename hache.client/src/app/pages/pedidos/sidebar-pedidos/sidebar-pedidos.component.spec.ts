import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPedidosComponent } from './sidebar-pedidos.component';

describe('SidebarPedidosComponent', () => {
  let component: SidebarPedidosComponent;
  let fixture: ComponentFixture<SidebarPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
