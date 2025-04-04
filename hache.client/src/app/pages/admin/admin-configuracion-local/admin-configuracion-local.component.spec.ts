import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfiguracionLocalComponent } from './admin-configuracion-local.component';

describe('AdminConfiguracionLocalComponent', () => {
  let component: AdminConfiguracionLocalComponent;
  let fixture: ComponentFixture<AdminConfiguracionLocalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminConfiguracionLocalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfiguracionLocalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
