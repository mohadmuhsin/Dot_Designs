import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { StateService } from './state.service';
import { loadCategories, categoriesLoaded} from './action';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private Service: StateService) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCategories),
      mergeMap(() =>
        this.Service.getCategories().pipe(
          map((categories) => categoriesLoaded({ categories }))
        )
      )
    )
  );
        }