import { ShoppingListService } from './shopping-list.service';
import * as fromShoppingList from './store/shopping-list.reducer';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  // private subscription: Subscription
  constructor(
    private slService: ShoppingListService, 
    // private loggingService: LoggingService, 
    private store: Store<fromShoppingList.AppState>
  ) {} // constructor

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged.subscribe(
    //   (ingredients: Ingredient[]) => {
    //     this.ingredients = ingredients;
    //   }
    // );
    // this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();    
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

}
