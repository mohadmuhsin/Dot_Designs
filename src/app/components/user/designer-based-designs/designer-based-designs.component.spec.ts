import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerBasedDesignsComponent } from './designer-based-designs.component';

describe('DesignerBasedDesignsComponent', () => {
  let component: DesignerBasedDesignsComponent;
  let fixture: ComponentFixture<DesignerBasedDesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerBasedDesignsComponent]
    });
    fixture = TestBed.createComponent(DesignerBasedDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
