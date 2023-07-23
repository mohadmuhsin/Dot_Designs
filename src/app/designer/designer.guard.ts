import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class DesignerGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   const token = localStorage.getItem('designer');
    console.log(token);
    
    const loginRoute = '/designer_login';
    const signupRoute = '/designer_signup';

    if ((state.url !== loginRoute && state.url !== signupRoute) && token === null) {
      this.router.navigate(['/designer_login']);
      return false;
    } else if ((state.url === loginRoute || state.url === signupRoute) && token !== null) {
      this.router.navigate(['/designer'])
      return false
    }
    
    return true;
  }
};
