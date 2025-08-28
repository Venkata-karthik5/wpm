import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Api {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBase;

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    const headers: HttpHeaders = new HttpHeaders(token ? { Authorization: `Bearer ${token}` } : {});
    return { headers };
  }

  // Auth
  register(data: { username: string; email: string; password: string }) {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  async login(data: { email: string; password: string }) {
    const res = await firstValueFrom(this.http.post<any>(`${this.baseUrl}/auth/login`, data));
    if (res?.token) localStorage.setItem('token', res.token);
    return res;
  }

  // Recipes
  listRecipes(params: { q?: string; ingredient?: string } = {}) {
    return this.http.get<any[]>(`${this.baseUrl}/recipes`, { params });
  }

  getRecipe(id: string) {
    return this.http.get<any>(`${this.baseUrl}/recipes/${id}`);
  }

  createRecipe(data: { title: string; description?: string; ingredients: string[]; steps: string[] }) {
    return this.http.post(`${this.baseUrl}/recipes`, data, this.getAuthHeaders());
  }

  likeRecipe(id: string) {
    return this.http.post(`${this.baseUrl}/recipes/${id}/like`, {}, this.getAuthHeaders());
  }

  listComments(id: string) {
    return this.http.get<any[]>(`${this.baseUrl}/recipes/${id}/comments`);
  }

  addComment(id: string, text: string) {
    return this.http.post(`${this.baseUrl}/recipes/${id}/comments`, { text }, this.getAuthHeaders());
  }
}
