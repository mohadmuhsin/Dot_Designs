import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { chain } from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { connect } from 'rxjs';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-designer-list',
  templateUrl: './designer-list.component.html',
  styleUrls: ['./designer-list.component.css'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})
export class DesignerListComponent implements OnInit{
  designers: any;
  connected! :string

accepted:string = "accepted"
  user: []=[];
  constructor(private service: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,
    private chatService:SocketService
  //  private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.service.getDesignersList().subscribe({
      next: (res:any) => {
    
        this.designers = res.designers;
        this.user = res.user.connectedDesigners
        Emitters.authEmitter.emit(true)
        

        
        // this.designers.forEach((designer: any) => {
        //   designer.connectionRequest.forEach((connectionRequest: any) => {
        //     this.connected = connectionRequest.request
        //     console.log(this.connected, "ANO");
            
        //   });
        // });
      },
      error: (err) => {
        const errorMessage = err.error.message
        this.toastr.error(errorMessage, "Warning", {
          positionClass: 'toast-top-center'
        })
      }
    })
  }
        
    connectWithDesigner(id: any) {
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
      
  makeConnection(id: any) {
    console.log(id,"make connection");
    
    this.chatService.makeConnection(id).subscribe({
      next: (res: any) => {
        console.log(res);
        
      }
    })
  }
          
     
      
      


}













