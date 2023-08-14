import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
// import { selectCategories } from '../../state/selector';
import { Category } from '../../../model/category_model';
// import { loadCategories } from '../../state/action';
import { Observable } from 'rxjs';
import { loadCategories } from 'src/app/components/admin/admin-state/action';
import { CategoryState } from 'src/app/components/admin/admin-state/state';
import { selectCategories } from 'src/app/components/admin/admin-state/selector';
// import { CategoryState } from '../../state/state';

@Component({
  selector: 'app-design-category',
  templateUrl: './design-category.component.html',
  styleUrls: ['./design-category.component.css'],
})
export class DesignCategoryComponent {
  filteredCategories: Category[] = [];

  constructor(  
    private store: Store<CategoryState>
  ) {}

  categories$: Observable<Category[]> | undefined;

  ngOnInit(): void {
    this.store.dispatch(loadCategories());
    this.categories$ = this.store.pipe(select(selectCategories));

    this.categories$.subscribe((categories) => {
      console.log(categories);
      this.filteredCategories = categories;
    });
  }
  
}
