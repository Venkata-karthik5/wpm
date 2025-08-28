import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Recipes } from './pages/recipes/recipes';
import { RecipeDetail } from './pages/recipe-detail/recipe-detail';
import { NewRecipe } from './pages/new-recipe/new-recipe';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'recipes', component: Recipes },
  { path: 'recipes/:id', component: RecipeDetail },
  { path: 'new', component: NewRecipe },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'about', component: About },
  { path: '**', redirectTo: '' }
];
