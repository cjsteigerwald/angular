import * as fromShoppingList from './store/shopping-list.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(
    private store: Store<fromShoppingList.AppState>
  ) {} // constructor

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

  }

  ngOnDestroy(): void {
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

}
