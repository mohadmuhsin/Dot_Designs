import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-connection-requests',
  templateUrl: './connection-requests.component.html',
  styleUrls: ['./connection-requests.component.css']
})
export class ConnectionRequestsComponent implements OnInit {
  users: any;
  createdAt: any;
  connectionRequests: any;
 // pagination
  page: number = 1
  count: number = 0
  tableSize: number = 5
  tableSizes: any = [5, 10, 15, 20]
  id :any= localStorage.getItem("designerId")
  constructor(private service: AuthServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.getConnectionRequests(this.id)
  }

  getConnectionRequests(id:any) {
    this.service.getConnectionRequests(id).subscribe((reqests: any) => {
      this.connectionRequests = reqests.connectionRequest
      this.users = this.connectionRequests.map((connectionRequest: any) => connectionRequest.userId);
      this.createdAt = this.connectionRequests.map((connectionRequest: any) => connectionRequest.createdAt) 
    }, (err) => {
      const errorMessage = err.error.message
      console.log(errorMessage);
    })
  }

  onTableDataChange(event: any) {
    this.page = event
    this.getConnectionRequests(this.id)
  }

  designer:any = localStorage.getItem("designerId")
  RejectConnection(id: any) { 
    this.service.RejectConnection(id,this.designer).subscribe((res:any) => {
      console.log(res);
      
      const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
    })
  }


  acceptRequest(id: any,userId:any) {
    // const userId = localStorage.getItem("userId")
    console.log(userId);
    
    this.service.acceptConnectionRequest(id,this.designer,userId).subscribe((res) => {
      console.log(res);

      const currentRoute = this.route.snapshot.routeConfig?.path;
        this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => {
          this.router.navigate([currentRoute]);
        });
      
    })
  }
}
