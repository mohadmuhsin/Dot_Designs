import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { connect } from 'rxjs';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
  constructor(private service: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,
  //  private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.service.getDesignersList().subscribe({
      next: (res) => {
        console.log(res);
        this.designers = res;
        this.designers.forEach((designer: any) => {
          designer.connectionRequest.forEach((connectionRequest: any) => {
            this.connected = connectionRequest.request
            console.log(this.connected, "ANO");
            
            Emitters.authEmitter.emit(true)
          });
        });
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
      
    
          
     
      
      


}













