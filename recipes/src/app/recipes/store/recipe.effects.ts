import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from '@ngrx/store';
import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';
import { Injectable } from '@angular/core';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';


@Injectable()
export class RecipeEffects {
  fireBaseUrl = 'https://ng-course-recipe-book-bfa9e-default-rtdb.firebaseio.com/recipes.json';

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>){}

  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.fetchRecipes),
      switchMap(() => {
        return this.http.get<Recipe[]>(this.fireBaseUrl);
      }), // switchMap
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
        });
      }), // map
      map(recipes => {
        return RecipesActions.setRecipes({recipes});
      }) // map
    ) // pipe
  ); // fetchRecipes

  storeRecipes$ =  createEffect(() => 
    this.actions$.pipe(
      ofType(RecipesActions.storeRecipes),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState]) => {
        return this.http.put(this.fireBaseUrl, recipesState.recipes);
      }), // switchmap
    ), // pipe
    { dispatch: false}
  ) // storeRecipes$

}