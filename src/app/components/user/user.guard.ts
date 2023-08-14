import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class userGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');
    const loginRoute = '/login';
    const signupRoute = '/signup';

    if ((state.url !== loginRoute && state.url !== signupRoute) && token === null) {
      this.router.navigate(['/login']);
      return false;
    } else if ((state.url === loginRoute || state.url === signupRoute) && token !== null) {
      this.router.navigate([''])
      return false
    }
    
    return true;
  }
}

