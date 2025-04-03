import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracionCategoriasComponent } from './admin-configuracion-categorias.component';

describe('AdminConfiguracionCategoriasComponent', () => {
  let component: AdminConfiguracionCategoriasComponent;
  let fixture: ComponentFixture<AdminConfiguracionCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConfiguracionCategoriasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfiguracionCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
