import { Subscription } from 'rxjs';
import { Ingredient } from './../../shared/ingredient.model';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as ShoppinListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;
  constructor(private slService: ShoppingListService, private store: Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new ShoppinListActions.UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient }));
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient)
    } else {
      // this.slService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppinListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppinListActions.DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }


}
