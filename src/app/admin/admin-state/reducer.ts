import { createReducer, on, Action } from '@ngrx/store';
import { Category } from '../../model/category_model';
import * as CategoryActions from './action';

export interface CategoryState {
  categories: Category[];
}
export const initialState: CategoryState = {
  categories: [],
};
const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.categoriesLoaded, (state, { categories }) => ({
    ...state,
    categories,
  }))
);
export function reducer(state: CategoryState | undefined, action: Action) {
  return categoryReducer(state, action);
}
