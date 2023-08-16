import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-design-detail-view',
  templateUrl: './design-detail-view.component.html',
  styleUrls: ['./design-detail-view.component.css']
})
export class DesignDetailViewComponent implements OnInit {
  design:any
  designId:any;
  feedbacks: any;
  showAllItems = false;
  selectedImage!: string;
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  
  constructor(
    private activeRoute:ActivatedRoute,
    private toastr:ToastrService,
    private service:AuthServiceService
  ){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.designId = params.get('id');
    });

    this.service.getDesignDetails(this.designId).subscribe((res:any)=>{
      this.design = res
      this.feedbacks = res.feedback
      Emitters.authEmitter.emit(true)      
    },(err)=>
    {
      const errorMessage= err.error.message
      this.toastr.error(errorMessage,"Error!")
    })

    // this.getFeedbacks(this.designId)
  }
 
  toggleShowAllItems() {
    this.showAllItems = !this.showAllItems;
  }

  addTowhishlist(id: any) {
    this.service.addTowhishlist(id).subscribe((res: any) => {
      this.toastr.success("Added to whishlist","Success",{progressBar:true})
    }, (err) => {
      console.log(err.error.message);
      const errorMessage = err.error.message
      this.toastr.error(errorMessage,"Warning!",{progressBar:true})
    })
  }


  getFeedbacks(id: string) {
    this.service.getFeedbacks(id).subscribe({
      next: (res: any)=>{
        console.log(res, 'feedbacks');
        this.feedbacks = res
      },
      error: (err: any)=>{
        console.log(err);
      }
    })
  }
  
  
}
