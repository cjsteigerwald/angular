import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_32/1759222/ratatouille-mc-main-210809-v2.jpeg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_32/1759222/ratatouille-mc-main-210809-v2.jpeg')
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
