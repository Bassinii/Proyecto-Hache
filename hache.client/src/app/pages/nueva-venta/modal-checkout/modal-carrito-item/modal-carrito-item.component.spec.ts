import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarritoItemComponent } from './modal-carrito-item.component';

describe('ModalCarritoItemComponent', () => {
  let component: ModalCarritoItemComponent;
  let fixture: ComponentFixture<ModalCarritoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCarritoItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCarritoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
