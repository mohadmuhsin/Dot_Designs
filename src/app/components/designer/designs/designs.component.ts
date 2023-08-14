import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
// import { selectDataById, selectDataByid, selectDesigns } from '../../state/selector';
import { Design } from '../../../model/design_model';
// import { loadDesigns } from '../../state/action';
import { Observable } from 'rxjs';
// import { DesignState } from '../../state/state';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';
// import { Emitters } from '../emitter/emitter';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Emitters } from '../emitter/emitter';

@Component({
  selector: 'app-designs',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.css'],
})
export class DesignsComponent implements OnInit {
  filteredDesigns: Design[] = [];
  designs$: Observable<Design[]> | undefined;
  design: Design[] = [];
  categoryId!: any;
  token:any
  category: any;
  constructor(
    // private store: Store<DesignState>,
    private router: Router,
    private toastr:ToastrService,
    private service: AuthServiceService,
    private route: ActivatedRoute,
    private location :Location
  ) {}

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });
    this.token = localStorage.getItem("designer") 
    this.service.getCategory(this.categoryId).subscribe({
      next: (res: any) => {
        console.log(res.name, "category");
        this.category = res.name
        
      }
    })
    this.service.retrive_Designs(this.categoryId,this.token).subscribe(
      (res: any) => {
        
        console.log(res, 'data');
        this.design = res;
        Emitters.authEmitter.emit(true)
      },
      (err) => {
        console.log(err);
      }
    );
   
  }

  deleteDesign(id: any) {
    this.service.deleteDesign(id).subscribe((res) => {
      console.log(res);
      this.location.back()
      this.toastr.success("Design Deleted", "Success") 
    }, (err) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage,"Warning!")
    })
  }

  
}
