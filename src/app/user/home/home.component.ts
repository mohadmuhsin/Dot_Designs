import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { data } from 'autoprefixer';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from '../../model/category_model';
// import { loadCategories } from '../../state/action';
// import { selectCategories } from '../..//state/selector';
// import { CategoryState } from '../../state/state';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Loader:boolean = false
  
  
  username!: string;
  boo!: boolean;
  filteredCategories: Category[] = [];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    // private store: Store<CategoryState>,
    private service: AuthServiceService
  ) {}
  categories$: Observable<Category[]> | undefined;

  ngOnInit(): void {
  
    this.service.user().subscribe(
      (res: any) => {
        this.username = res.data.username;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        Emitters.authEmitter.emit(false);
      }
    );

    // retriving  
    // this.store.dispatch(loadCategories());
    // this.categories$ = this.store.pipe(select(selectCategories));
    // this.categories$.subscribe((categories) => {
    //   console.log(categories,"cat");
    //   this.filteredCategories = categories;
    // });
      // for spinner
      // setTimeout(() => {
      //   this.Loader = false
      // }, 2000);
      // // 
  }
}
