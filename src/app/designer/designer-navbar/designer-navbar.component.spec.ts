import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerNavbarComponent } from './designer-navbar.component';

describe('DesignerNavbarComponent', () => {
  let component: DesignerNavbarComponent;
  let fixture: ComponentFixture<DesignerNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignerNavbarComponent]
    });
    fixture = TestBed.createComponent(DesignerNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
