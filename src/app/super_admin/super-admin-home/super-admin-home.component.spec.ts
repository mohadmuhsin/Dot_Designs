import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminHomeComponent } from './super-admin-home.component';

describe('SuperAdminHomeComponent', () => {
  let component: SuperAdminHomeComponent;
  let fixture: ComponentFixture<SuperAdminHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuperAdminHomeComponent]
    });
    fixture = TestBed.createComponent(SuperAdminHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
