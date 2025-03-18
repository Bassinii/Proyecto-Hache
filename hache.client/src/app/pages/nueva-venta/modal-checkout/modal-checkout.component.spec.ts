import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCheckoutComponent } from './modal-checkout.component';

describe('ModalCheckoutComponent', () => {
  let component: ModalCheckoutComponent;
  let fixture: ComponentFixture<ModalCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
