import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesAddCategoryComponent } from './des-add-category.component';

describe('DesAddCategoryComponent', () => {
  let component: DesAddCategoryComponent;
  let fixture: ComponentFixture<DesAddCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesAddCategoryComponent]
    });
    fixture = TestBed.createComponent(DesAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
