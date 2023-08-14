import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDesignsComponent } from './add-designs.component';

describe('AddDesignsComponent', () => {
  let component: AddDesignsComponent;
  let fixture: ComponentFixture<AddDesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDesignsComponent]
    });
    fixture = TestBed.createComponent(AddDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
