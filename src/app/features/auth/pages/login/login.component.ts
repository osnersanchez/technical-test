import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { UserData } from '../../../../shared/declaraciones/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  errorMessage: string = '';
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private readonly authService: AuthService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.controls['email'].value;
      if (email) {
        this.authService.getUserByEmail(email).subscribe((res: UserData) => {
          localStorage.setItem('session', JSON.stringify(res));
          this.snackBar.open('Inicio de sesión exitoso!', '', {
            duration: 2000,
          });
          const baseUrl = res.id.includes('admin')
            ? '/admin/list-product'
            : '/list-product';
          this.router.navigate([baseUrl]);
        });
      }
    }
  }
}
