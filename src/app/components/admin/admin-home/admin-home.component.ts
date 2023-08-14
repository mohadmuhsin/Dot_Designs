import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from '../emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { getJSDocAugmentsTag } from 'typescript';
import { Observable } from 'rxjs';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  designers!: number;
  designs!: number;
  categories!: number;
  users!: number;
  adminName!: string;

  constructor(private route:Router,
    private service :AuthServiceService,
    private toastr: ToastrService,
    private sharedService:SharedDataServiceService
    ){}

  ngOnInit(): void {
    const token = localStorage.getItem('admin_token')
    this.service.loadAdmin(token).subscribe((res:any) => {
      this.adminName = res.userName
      this.sharedService.setAdminName(this.adminName);
      
      
      Emitters.authEmitter.emit(true)
    },(err)=>{
      Emitters.authEmitter.emit(false)
    })

    // const isLoggedIn = localStorage.getItem("admin_token")
    // if(!isLoggedIn){
    //   this.route.navigate(['/admin_login'])
    // }

    this.service.getCounts().subscribe({
      next: (res: any) => {
        console.log(res);
        this.designers = res.designerCount,
        this.designs = res.designCount
        this.categories = res.categoryCount
        this.users = res.userCount
      },
      error: (err: any) => {
        console.log(err);
        
      }
    })


  }
}
