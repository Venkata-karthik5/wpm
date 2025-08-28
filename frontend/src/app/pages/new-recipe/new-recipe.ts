import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule],
  templateUrl: './new-recipe.html',
  styles: ``
})
export class NewRecipe {
  private api = inject(Api);
  private router = inject(Router);
  title = '';
  description = '';
  ingredientsRaw = '';
  stepsRaw = '';

  submit() {
    const ingredients = this.ingredientsRaw.split(',').map(s => s.trim()).filter(Boolean);
    const steps = this.stepsRaw.split('\n').map(s => s.trim()).filter(Boolean);
    this.api.createRecipe({ title: this.title, description: this.description, ingredients, steps }).subscribe((r: any) => {
      this.router.navigate(['/recipes', r._id]);
    });
  }
}
