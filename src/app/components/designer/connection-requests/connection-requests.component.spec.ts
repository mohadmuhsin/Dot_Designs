import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionRequestsComponent } from './connection-requests.component';

describe('ConnectionRequestsComponent', () => {
  let component: ConnectionRequestsComponent;
  let fixture: ComponentFixture<ConnectionRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectionRequestsComponent]
    });
    fixture = TestBed.createComponent(ConnectionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
