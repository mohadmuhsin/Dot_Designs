import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerProfileComponent } from './designer-profile.component';

describe('DesignerProfileComponent', () => {
  let component: DesignerProfileComponent;
  let fixture: ComponentFixture<DesignerProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerProfileComponent]
    });
    fixture = TestBed.createComponent(DesignerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
