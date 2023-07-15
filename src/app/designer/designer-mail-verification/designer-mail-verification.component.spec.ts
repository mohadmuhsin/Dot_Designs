import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerMailVerificationComponent } from './designer-mail-verification.component';

describe('DesignerMailVerificationComponent', () => {
  let component: DesignerMailVerificationComponent;
  let fixture: ComponentFixture<DesignerMailVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerMailVerificationComponent]
    });
    fixture = TestBed.createComponent(DesignerMailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
