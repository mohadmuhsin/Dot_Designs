import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerLoginComponent } from './designer-login.component';

describe('DesignerLoginComponent', () => {
  let component: DesignerLoginComponent;
  let fixture: ComponentFixture<DesignerLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerLoginComponent]
    });
    fixture = TestBed.createComponent(DesignerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
