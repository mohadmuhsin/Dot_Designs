import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedDataServiceService } from '../shared-data-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { map } from 'rxjs';

@Component({
  selector: 'app-designer-navbar',
  templateUrl: './designer-navbar.component.html',
  styleUrls: ['./designer-navbar.component.css'],
})
export class DesignerNavbarComponent implements OnInit {
  isNavbarDropdownOpen = false;
  isDropdownNavbarOpen = false;

  authenticated$ : any
  sharedData$!:any;
  authenticate!:boolean
  constructor(
    private active_route: ActivatedRoute,
    private sharedDataService: SharedDataServiceService,
    private service: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {  
    this.authenticated$ = this.sharedDataService.getSharedData();
    this.authenticated$.pipe(
      map(user => user ? true : false)
    ).subscribe((isAuthenticated:boolean) => {
      this.authenticate = isAuthenticated
      console.log(this.authenticate,"true");
    });
  }

  toggleNavbarDropdown() {
    this.isNavbarDropdownOpen = !this.isNavbarDropdownOpen;
  }

  

  logout() {
    this.service.designer_logout().subscribe(() => {
      //  for guard
      
      this.router.navigate(['/designer_login']);
      localStorage.removeItem('designer');
      this.setSharedData();
      Emitters.authEmitter.emit(false);
    });
  }
  setSharedData(): void {
    this.sharedDataService.setSharedData(false);
  }
}
