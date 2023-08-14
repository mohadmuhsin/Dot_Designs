import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { string } from 'yargs';

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
  // search
  searchQuery: string = ''
  noResultsFound:boolean = false
  
  // pagination
  page: number = 1
  count: number = 0
  tableSize: number = 5
  tableSizes: any = [5, 10, 15, 20]
  status: string[] =["Pending","Waiting for Payment","waiting for consultation","Consultation Done","Work in Progress", "Completed"]
  filtered:boolean = false
  constructor(
    private service: AuthServiceService,
    private toastr:ToastrService,
    private router:Router,
    private route:ActivatedRoute
  ){}



  ngOnInit(): void {
    this.token = localStorage.getItem('designer')
    this.getRequests(this.token)
    this.filtered = false
  }

  getRequests(token: string) {
    this.service.getRequests(token).subscribe((res:any)=>{
      this.requests = res
      this.pednings = this.requests.length
    })
  }

  search() {
    if (this.searchQuery.trim() !== '') {
      this.filtered = true
      this.requests = this.requests.filter((request: any) =>
        request.userId.username.toLowerCase().includes(this.searchQuery.toLocaleLowerCase()) ||
        request.designId.name.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase()) ||
        request.status.toLocaleLowerCase().includes(this.searchQuery.toLocaleLowerCase())
      )
      this.noResultsFound = this.requests.length === 0
    } else {
      this.getRequests(this.token)
      this.noResultsFound = false
      this.filtered = false
    }
  }


  filter(status: string) {
    this.requests = this.requests.filter((item: any) => item.status === status)
     this.filtered = true
  }

  showall() {
    this.getRequests(this.token)
     this.filtered = false
  }
  
  onTableDataChange(event: any) {
    this.page = event
    this.getRequests(this.token)
  }

  // onTableSizeChange(event: any) {
  //   this.tableSize = event.target.value
  //   this.page = 1
  //   this.getRequests(this.token)
  // }


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
