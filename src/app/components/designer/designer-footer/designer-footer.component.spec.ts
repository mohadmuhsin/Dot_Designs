import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerFooterComponent } from './designer-footer.component';

describe('DesignerFooterComponent', () => {
  let component: DesignerFooterComponent;
  let fixture: ComponentFixture<DesignerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerFooterComponent]
    });
    fixture = TestBed.createComponent(DesignerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
