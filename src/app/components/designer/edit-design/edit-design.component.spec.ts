import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDesignComponent } from './edit-design.component';

describe('EditDesignComponent', () => {
  let component: EditDesignComponent;
  let fixture: ComponentFixture<EditDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDesignComponent]
    });
    fixture = TestBed.createComponent(EditDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
