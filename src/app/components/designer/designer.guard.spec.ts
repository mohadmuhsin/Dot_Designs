import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { designerGuard } from './designer.guard';

describe('designerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => designerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
