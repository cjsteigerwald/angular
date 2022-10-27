import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params
    .pipe(map(params => {
      return +params['id'];
      }), 
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes');
      }), // switchMap
      map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        }); // find
      }) // map
    ) // pipe    
    .subscribe(recipe => {
    this.recipe = recipe;
    }); // subscribe
  }
  
  onAddToShoppingList() {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
    // this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(RecipeActions.deleteRecipe({index: this.id}));
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
