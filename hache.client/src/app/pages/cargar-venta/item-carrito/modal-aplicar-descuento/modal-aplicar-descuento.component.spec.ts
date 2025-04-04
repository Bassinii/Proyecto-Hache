import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAplicarDescuentoComponent } from './modal-aplicar-descuento.component';

describe('ModalAplicarDescuentoComponent', () => {
  let component: ModalAplicarDescuentoComponent;
  let fixture: ComponentFixture<ModalAplicarDescuentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalAplicarDescuentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalAplicarDescuentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
