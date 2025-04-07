import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReportesVentaComponent } from './admin-reportes-venta.component';

describe('AdminReportesVentaComponent', () => {
  let component: AdminReportesVentaComponent;
  let fixture: ComponentFixture<AdminReportesVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminReportesVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReportesVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
