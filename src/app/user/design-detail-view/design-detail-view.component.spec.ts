import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignDetailViewComponent } from './design-detail-view.component';

describe('DesignDetailViewComponent', () => {
  let component: DesignDetailViewComponent;
  let fixture: ComponentFixture<DesignDetailViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignDetailViewComponent]
    });
    fixture = TestBed.createComponent(DesignDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
