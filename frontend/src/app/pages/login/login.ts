import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  private api = inject(Api);
  private router = inject(Router);
  email = '';
  password = '';

  submit() {
    this.api.login({ email: this.email, password: this.password }).then(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
