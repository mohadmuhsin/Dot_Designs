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

  constructor(private service: AuthServiceService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    const id= localStorage.getItem("designerId")
    this.service.getConnectionRequests(id).subscribe((reqests: any) => {
      this.connectionRequests = reqests.connectionRequest
      this.users = this.connectionRequests.map((connectionRequest: any) => connectionRequest.userId);
      this.createdAt = this.connectionRequests.map((connectionRequest: any) => connectionRequest.createdAt) 
    }, (err) => {
      const errorMessage = err.error.message
      console.log(errorMessage);
    })
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


  acceptRequest(id: any) {
    this.service.acceptConnectionRequest(id,this.designer).subscribe((res) => {
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
