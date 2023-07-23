import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultationRequestsComponent } from './consultation-requests.component';

describe('ConsultationRequestsComponent', () => {
  let component: ConsultationRequestsComponent;
  let fixture: ComponentFixture<ConsultationRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultationRequestsComponent]
    });
    fixture = TestBed.createComponent(ConsultationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
