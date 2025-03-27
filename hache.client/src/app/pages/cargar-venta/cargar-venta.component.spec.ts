import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarVentaComponent } from './cargar-venta.component';

describe('CargarVentaComponent', () => {
  let component: CargarVentaComponent;
  let fixture: ComponentFixture<CargarVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CargarVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargarVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
