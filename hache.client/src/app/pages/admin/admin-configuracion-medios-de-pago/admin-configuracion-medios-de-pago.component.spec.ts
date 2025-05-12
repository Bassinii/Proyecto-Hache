import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracionMediosDePagoComponent } from './admin-configuracion-medios-de-pago.component';

describe('AdminConfiguracionMediosDePagoComponent', () => {
  let component: AdminConfiguracionMediosDePagoComponent;
  let fixture: ComponentFixture<AdminConfiguracionMediosDePagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConfiguracionMediosDePagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfiguracionMediosDePagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
