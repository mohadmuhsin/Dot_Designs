import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from '../emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  constructor(private route:Router,
    private service :AuthServiceService,
    private toastr: ToastrService,
    ){}

    ngOnInit(): void {
        this.service.loadAdmin().subscribe((res)=>{
          Emitters.authEmitter.emit(true)
        },(err)=>{
          Emitters.authEmitter.emit(false)
        })

        const isLoggedIn = localStorage.getItem("admin_token")
        if(!isLoggedIn){
          this.route.navigate(['/admin_login'])
        }
    }
}
