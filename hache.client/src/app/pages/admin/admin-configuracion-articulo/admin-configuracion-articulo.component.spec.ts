import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracionArticuloComponent } from './admin-configuracion-articulo.component';

describe('AdminConfiguracionArticuloComponent', () => {
  let component: AdminConfiguracionArticuloComponent;
  let fixture: ComponentFixture<AdminConfiguracionArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConfiguracionArticuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfiguracionArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
