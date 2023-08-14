import { createAction, props } from '@ngrx/store';
import { Category } from '../../../model/category_model';

// category
export const loadCategories = createAction('[Category] Load Categories');
export const categoriesLoaded = createAction(
  '[Category] Categories Loaded',
  props<{ categories: Category[] }>()
);
