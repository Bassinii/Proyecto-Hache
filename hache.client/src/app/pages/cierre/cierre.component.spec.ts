import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreComponent } from './cierre.component';

describe('CierreComponent', () => {
  let component: CierreComponent;
  let fixture: ComponentFixture<CierreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CierreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
