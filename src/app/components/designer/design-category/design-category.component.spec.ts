import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCategoryComponent } from './design-category.component';

describe('DesignCategoryComponent', () => {
  let component: DesignCategoryComponent;
  let fixture: ComponentFixture<DesignCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignCategoryComponent]
    });
    fixture = TestBed.createComponent(DesignCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
