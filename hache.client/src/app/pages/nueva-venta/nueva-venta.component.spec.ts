import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaVentaComponent } from './nueva-venta.component';

describe('NuevaVentaComponent', () => {
  let component: NuevaVentaComponent;
  let fixture: ComponentFixture<NuevaVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevaVentaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
