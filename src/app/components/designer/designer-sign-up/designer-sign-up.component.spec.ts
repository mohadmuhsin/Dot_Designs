import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerSignUpComponent } from './designer-sign-up.component';

describe('DesignerSignUpComponent', () => {
  let component: DesignerSignUpComponent;
  let fixture: ComponentFixture<DesignerSignUpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerSignUpComponent]
    });
    fixture = TestBed.createComponent(DesignerSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
