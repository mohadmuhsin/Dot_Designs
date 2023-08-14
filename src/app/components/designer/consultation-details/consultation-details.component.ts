import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.css']
})
export class ConsultationDetailsComponent implements OnInit {

Pending:string="Pending"
  waiting: string = "Waiting for Payment"
  consultation: string = "waiting for consultation"
  consDone:string = "Consultation Done"
  progress:string = "Work in Progress"
  completed: string = "Completed"
  booking_id: any;
  bookingDetails: any;
  designerId: any;

 constructor(private service:AuthServiceService,
  private toastr:ToastrService,
  private router:Router,
  private activeRoute:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.booking_id = params.get('id');
    })
    this.designerId = localStorage.getItem('designerId')

    this.service.getConsultationDeatails(this.booking_id,this.designerId).subscribe({
      next: (res: any) => {
        this.bookingDetails = res
        console.log(res);
        
      }, error: (err: any) => {
        console.log(err);
        
      }
    })
  }

  acceptRequest(id:any){
    const _id:any = id
    this.service.acceptRequest(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Confirmaiton Successful","Success",{progressBar:true})
      window.location.reload()
    //     const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
    //     this.router
    //     .navigateByUrl('/', { skipLocationChange: true })
    //     .then(() => {
    //       this.router.navigate([currentRoute]);
    // });
    })
  }


  rejectRequest(id:any){
    const _id:any = id
    this.service.rejectRequest(_id).subscribe((res)=>{
      console.log(res);
      window.location.reload()
      this.toastr.error("Rejected Successfully","Success",{progressBar:true})
//         const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
//         this.router
//         .navigateByUrl('/', { skipLocationChange: true })
//         .then(() => {
//           this.router.navigate([currentRoute]);
//         });
    })
  }

  consultationDone(id:any) {
     const _id:any = id
    this.service.consultationDone(_id).subscribe((res)=>{
      console.log(res);
      window.location.reload()
      // this.toastr.error("Rejected Successfully")
//         const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
//         this.router
//         .navigateByUrl('/', { skipLocationChange: true })
//         .then(() => {
//           this.router.navigate([currentRoute]);
//         });
    })
  }

  StartProject(id:any) {
     const _id:any = id
    this.service.StartProject(_id).subscribe((res)=>{
      console.log(res);
      this.toastr.success("Project started Successfully","Success",{progressBar:true})
      window.location.reload()
//         const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
//         this.router
//         .navigateByUrl('/', { skipLocationChange: true })
//         .then(() => {
//           this.router.navigate([currentRoute]);
//         });
    })
  }

  projectCompleted(id:any){
    const _id:any = id
    this.service.projectCompleted(_id).subscribe((res)=>{
      console.log(res);
      window.location.reload()
      this.toastr.success("prject Completed","Success",{progressBar:true})
    })
  }
}
