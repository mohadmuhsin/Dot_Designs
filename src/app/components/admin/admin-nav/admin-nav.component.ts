import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';
import { Emitters } from '../emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent  implements OnInit{
  
  isNavbarDropdownOpen = false;
  isDropdownNavbarOpen = false;
 emitter:string = ''
  admin_authenticated: boolean = false;
  token!:any
  constructor(
    private sharedDataService : SharedDataServiceService,
    private service: AuthServiceService,
    private router: Router ){
    }

    ngOnInit(): void {
      Emitters.authEmitter.subscribe((auth: boolean)=>{
        this.admin_authenticated = auth;
        console.log(this.admin_authenticated,"admin");
        
      })
      this.sharedDataService.setSharedData(this.admin_authenticated)
    }
  toggleNavbarDropdown() {
    this.isNavbarDropdownOpen = !this.isNavbarDropdownOpen;
  }


  logout() {
    this.token = localStorage.getItem('admin_token')
    console.log(this.token,"token");
    if(this.token){
    this.service.admin_logout(this.token).subscribe(()=>{
      this.router.navigate(['/admin_login'])
      localStorage.removeItem('admin_token')
      Emitters.authEmitter.emit(false)
    })
    }
  }
}
