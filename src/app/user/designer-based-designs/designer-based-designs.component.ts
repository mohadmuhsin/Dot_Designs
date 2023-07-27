import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-designer-based-designs',
  templateUrl: './designer-based-designs.component.html',
  styleUrls: ['./designer-based-designs.component.css']
})
export class DesignerBasedDesignsComponent implements OnInit {
  catId!: string | null;
  designerId!: string | null;
  designs: any;

  constructor(
    private service: AuthServiceService,
    private activateRoute:ActivatedRoute
    
  )
{}
  ngOnInit(): void {
  
    this.activateRoute.paramMap.subscribe((params) => {
      this.catId = params.get('catId'),
        this.designerId = params.get('designerId')
      
   })
  this.getDesignData(this.catId,this.designerId)
}
  getDesignData(catId:any,designerId:any) {
    this.service.getDesignerDesign(catId, designerId).subscribe((design: any) => {
      Emitters.authEmitter.emit(true)
      this.designs = design
    }, (err: any) => {
      console.log(err);
      
    })
  }
}
