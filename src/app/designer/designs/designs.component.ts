import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
// import { selectDataById, selectDataByid, selectDesigns } from '../../state/selector';
import { Design } from '../../model/design_model';
// import { loadDesigns } from '../../state/action';
import { Observable } from 'rxjs';
// import { DesignState } from '../../state/state';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ActivatedRoute } from '@angular/router';

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
  constructor(
    // private store: Store<DesignState>,
    private router: Router,
    private service: AuthServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.designs$ = this.store.pipe(select(selectDesigns));
    // this.store.dispatch(loadDesigns())
    
    // this.designs$.subscribe((designs) => {
    //   console.log(designs, 'designs');
    //   this.filteredDesigns = designs;
    // });

    this.route.paramMap.subscribe((params) => {
      this.categoryId = params.get('id');
    });
    this.service.retrive_Designs(this.categoryId).subscribe(
      (res: any) => {
        console.log(res, 'data');
        this.design = res;
      },
      (err) => {
        console.log(err);
      }
    );
   
  }

  
}
