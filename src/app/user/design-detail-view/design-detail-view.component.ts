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
  designId:any;
  design:any
  selectedImage!: string;
  constructor(
    private activeRoute:ActivatedRoute,
    private toastr:ToastrService,
    private service:AuthServiceService
  ){}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((params) => {
      this.designId = params.get('id');
    });
    this.service.getDesignDetails(this.designId).subscribe((res)=>{
      this.design = res
      Emitters.authEmitter.emit(true)      
    },(err)=>
    {
      const errorMessage= err.error.message
      this.toastr.error(errorMessage,"Error!")
    }
    )

  }
  showImage(image: string): void {
    this.selectedImage = image;
  }
  connectToDesigner(){}

  
  
}
