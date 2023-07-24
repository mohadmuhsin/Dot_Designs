import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CategoryState } from '../state/reducer';
import { Observable } from 'rxjs';
import { Category } from 'src/app/model/category_model';
import { loadCategories } from '../state/action';
import { selectCategories } from '../state/selector';

@Component({
  selector: 'app-designers-profile',
  templateUrl: './designers-profile.component.html',
  styleUrls: ['./designers-profile.component.css']
})
export class DesignersProfileComponent implements OnInit {
  designerId: any
  datas:any
  designs: any;
  images: any;
  categroyList!: Category[];

  constructor(private service: AuthServiceService,
    private activeRoute: ActivatedRoute,
    private store:Store<CategoryState>
  ) { }
  categories$: Observable<Category[]> | undefined;


  ngOnInit(): void {
    this.store.dispatch(loadCategories())
    this.categories$ = this.store.pipe(select(selectCategories))

    this.categories$.subscribe((category) => {
      this.categroyList = category
    })

      this.activeRoute.paramMap.subscribe((params) => {
      this.designerId = params.get('id');
      });
    this.getDesignerData(this.designerId)
    
  }

  getDesignerData(id:any) {
    this.service.getDesignerData(id).subscribe((res:any) => {
      this.datas = res.designer
      this.designs = res.designs
      for (const design of this.designs) {
   this.images = design.images;
  console.log(this.images);
}
      console.log(res);
     
    
      
      
    }, (err) => {
      console.log(err.error.message);
      
    })
  }
}
