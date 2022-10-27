import { Action, createReducer, on } from "@ngrx/store";
import * as RecipesActions from '../store/recipe.actions';
import { Recipe } from "../recipe.model";
import { state } from "@angular/animations";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: []
}

const _recipeReducer = createReducer (
  initialState,

  on(
    RecipesActions.setRecipes,
    (state, action) => ({
      ...state,
      recipes: [ ...action.recipes ]
    }),
  ),

  on(
    RecipesActions.addRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.concat({ ...action.recipe })
    }),
  ),

  on(
    RecipesActions.updateRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.map(
        (recipe, index) => index === action.index ? { ...action.recipe } : recipe
      )
    })
  ),

  on(
    RecipesActions.deleteRecipe,
    (state, action) => ({
      ...state,
      recipes: state.recipes.filter(
        (recipe, index) => index !== action.index
      )
    })
  ),
);


export function recipeReducer(state: State, action: Action) {
  return _recipeReducer(state, action);
}