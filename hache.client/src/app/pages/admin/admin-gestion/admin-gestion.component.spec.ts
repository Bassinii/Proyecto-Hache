import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGestionComponent } from './admin-gestion.component';

describe('AdminGestionComponent', () => {
  let component: AdminGestionComponent;
  let fixture: ComponentFixture<AdminGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminGestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
