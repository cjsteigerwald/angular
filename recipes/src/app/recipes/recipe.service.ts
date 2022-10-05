import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Shrimp Recipe', 
      'Delicious Shrimp Dish', 
      'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_32/1759222/ratatouille-mc-main-210809-v2.jpeg', 
      [
        new Ingredient('Zuccinni', 1),
        new Ingredient('Shrimp', 5)
      ]),
    new Recipe('Yummy Burger', 
      'Best Burger Ever', 
      'https://media-cdn.tripadvisor.com/media/photo-s/17/90/52/45/2-lb-2-slice-cheese-caramelize.jpg',
       [
        new Ingredient('Meat', 1),
        new Ingredient('Buns', 1)
       ])
  ];

  constructor(private slService: ShoppingListService) {}


  getRecipes() {
    // returns new array that is copy
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());

  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}