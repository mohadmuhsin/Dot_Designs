import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerHomeComponent } from './designer-home.component';

describe('DesignerHomeComponent', () => {
  let component: DesignerHomeComponent;
  let fixture: ComponentFixture<DesignerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerHomeComponent]
    });
    fixture = TestBed.createComponent(DesignerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
