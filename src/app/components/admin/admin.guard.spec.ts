import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminGuard } from './admin.guard';

describe('AdminGuard', () => {
  let adminGuard: AdminGuard;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGuard, Router]
    });
    adminGuard = TestBed.inject(AdminGuard);
  });
  it('should be created', () => {
    expect(adminGuard).toBeTruthy();
  });
  it('should allow access when user is an admin', () => {
    const canActivate = adminGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivate).toBe(true);
  });
  it('should prevent access when user is not an admin', () => {
    const canActivate = adminGuard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot);
    expect(canActivate).toBe(false);
  });
});
