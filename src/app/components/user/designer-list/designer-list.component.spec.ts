import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerListComponent } from './designer-list.component';

describe('DesignerListComponent', () => {
  let component: DesignerListComponent;
  let fixture: ComponentFixture<DesignerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerListComponent]
    });
    fixture = TestBed.createComponent(DesignerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
