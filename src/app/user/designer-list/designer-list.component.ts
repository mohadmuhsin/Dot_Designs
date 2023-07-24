import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { connect } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-designer-list',
  templateUrl: './designer-list.component.html',
  styleUrls: ['./designer-list.component.css']
})
export class DesignerListComponent implements OnInit{
  designers: any;
  connected :boolean =false

  constructor(private service: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
      this.service.getDesignersList().subscribe((res: any) => {
        console.log(res);
        this.designers = res;
this.designers.forEach((designer: any) => {
  console.log(designer.profile.profilePhoto);

  // Access the connectionRequest array for each designer and log its request property
  designer.connectionRequest.forEach((connectionRequest: any) => {
    
    this.connected = connectionRequest.request
    console.log(this.connected);
    
  });
});
          
               //  this.connected = designer.connectionRequest[0].request
        //  console.log(this.connected);
         
     ;
      
      
    }, (err: { error: { message: any; }; }) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage,"Warning",{
        positionClass: 'toast-top-center'
      })
    })
  }


  connectWithDesigner(id: any) {
    console.log("lkfsf");
    
    this.service.connectDesigner(id).subscribe((res: any) => {
      const Message = res.message
      this.toastr.success(Message,"Success")
      
    }, (err: { error: { message: any; }; }) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage, "Warning", {
        positionClass:'toast-top-center'
      })
    })
  }
}













