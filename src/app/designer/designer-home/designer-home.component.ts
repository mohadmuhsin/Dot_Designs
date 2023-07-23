import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Emitters } from '../emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedDataServiceService } from '../shared-data-service.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-designer-home',
  templateUrl: './designer-home.component.html',
  styleUrls: ['./designer-home.component.css'],
})
export class DesignerHomeComponent implements OnInit {
  Data: string = '';
  authenticated$: any
  authenticate: any
  isSidebarHidden!: Observable<boolean>;
  constructor(
    private service: AuthServiceService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private shareData: SharedDataServiceService
  ) {}

  ngOnInit(): void {
    
    

    
    this.service.designer().subscribe(
      (res: any) => {
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );



    const isLoggedIn = localStorage.getItem('designer');
    if (!isLoggedIn) {
      this.router.navigate(['/designer_login']);
    }


  
  }

    // setSharedData(auth:boolean): void {
    // this.shareData.setSharedData(auth);
  // }
}
  
