import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracionMarcasComponent } from './admin-configuracion-marcas.component';

describe('AdminConfiguracionMarcasComponent', () => {
  let component: AdminConfiguracionMarcasComponent;
  let fixture: ComponentFixture<AdminConfiguracionMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConfiguracionMarcasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfiguracionMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
