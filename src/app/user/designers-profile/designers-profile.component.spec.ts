import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignersProfileComponent } from './designers-profile.component';

describe('DesignersProfileComponent', () => {
  let component: DesignersProfileComponent;
  let fixture: ComponentFixture<DesignersProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesignersProfileComponent]
    });
    fixture = TestBed.createComponent(DesignersProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
