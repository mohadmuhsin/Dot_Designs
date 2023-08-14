import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate{

   constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
   const token = localStorage.getItem('admin_token');
    console.log(token);
    
    const loginRoute = '/admin_login';

    if (state.url !== loginRoute && token === null) {
      this.router.navigate(['/admin_login']);
      return false;
    } else if (state.url === loginRoute && token !== null) {
      this.router.navigate(['/admin'])
      return false
    }
    
    return true;
  }
 
};

 
