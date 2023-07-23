import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultation-requests',
  templateUrl: './consultation-requests.component.html',
  styleUrls: ['./consultation-requests.component.css']
})
export class ConsultationRequestsComponent implements OnInit {
  requests:any
  token: any
  pednings!:number
  Pending:string="Pending"
  waiting: string = "Waiting for Payment"
  consultation: string = "waiting for consultation"
  consDone:string = "Consultation Done"
  progress:string = "Work in Progress"
  completed: string = "Completed"

  
  constructor(private service:AuthServiceService,
  private toastr:ToastrService,
  private router:Router,
  private route:ActivatedRoute
  ){}



  ngOnInit(): void {
    this.token = localStorage.getItem('designer')
    this.service.getRequests(this.token).subscribe((res)=>{
      this.requests = res
      this.pednings = this.requests.length
      
      console.log(this.requests);

    })
  }

  acceptRequest(id:any){
    const _id:any = id
    this.service.acceptRequest(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Confirmaiton Successful")
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
    });
    })
  }


  rejectRequest(id:any){
    const _id:any = id
    this.service.rejectRequest(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.error("Rejected Successfully")
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }

  consultationDone(id:any) {
     const _id:any = id
    this.service.consultationDone(_id).subscribe((res)=>{
      console.log(res);
      // this.toastr.error("Rejected Successfully")
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }

  StartProject(id:any) {
     const _id:any = id
    this.service.StartProject(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.error("Project started Successfully")
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }

  projectCompleted(id:any){
    const _id:any = id
    this.service.projectCompleted(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("prject Completed")
        const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }
}
