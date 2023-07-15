import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.is_Authenticated()) {
      this.router.navigate(['/designer']);
      return false;
    }
    //


    // if (!this.authService.is_Authenticated()) {
    //   this.router.navigate(['/designer_login']);
    //   return false;
    // }
   
    return true;
  }
}
