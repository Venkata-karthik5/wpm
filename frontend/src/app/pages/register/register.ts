import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styles: ``
})
export class Register {
  private api = inject(Api);
  private router = inject(Router);
  username = '';
  email = '';
  password = '';

  submit() {
    this.api.register({ username: this.username, email: this.email, password: this.password }).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
