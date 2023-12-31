import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { data } from 'autoprefixer';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Category } from '../../../model/category_model';
import { loadCategories } from '../../admin/admin-state/action';
import { selectCategories } from '../../admin/admin-state/selector';
import { CategoryState } from '../../admin/admin-state/state';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  Loader: boolean = false;

  username!: string;
  boo!: boolean;
  filteredCategories: Category[] = [];
  category$: Observable<Category[]> | undefined;
  showAllItems: boolean = false;
  categories$: Observable<Category[]> | undefined;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router,
    private store: Store<CategoryState>,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.category$ = this.store.pipe(select(selectCategories));
    this.category$?.subscribe((res: any) => {
      console.log(res,'hloooooooooooo');
      
      this.filteredCategories = res;
    }, (err) => {
      console.log(err.error.message,err);
      
    }
    );

    this.service.user().subscribe(
      (res: any) => {
        this.username = res.data.username;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        console.log(err.error.message,"error",err);
        
        Emitters.authEmitter.emit(false);
      }
    );
  }

  toggleShowAllItems() {
    this.showAllItems = !this.showAllItems;
  }
}
