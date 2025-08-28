import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-recipes',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './recipes.html',
  styles: ``
})
export class Recipes {
  private api = inject(Api);
  items: any[] = [];
  q = '';
  ingredient = '';

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.listRecipes({ q: this.q || undefined, ingredient: this.ingredient || undefined }).subscribe((res) => (this.items = res || []));
  }

  search() {
    this.load();
  }
}
