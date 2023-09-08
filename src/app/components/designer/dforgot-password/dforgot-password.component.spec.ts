import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DforgotPasswordComponent } from './dforgot-password.component';

describe('DforgotPasswordComponent', () => {
  let component: DforgotPasswordComponent;
  let fixture: ComponentFixture<DforgotPasswordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DforgotPasswordComponent]
    });
    fixture = TestBed.createComponent(DforgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
