import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../../shared/interfaces';

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  public loginError: boolean = false;
  private subscription?: Subscription;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  onSubmit(): boolean {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }
    const user = this.loginForm.value as User;

    this.subscription = this.authService
      .loginUser(user)
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.loginError = true;
          return false;
        }

        this.router.navigate(['/admin']);
        return true;
      });
    return false;
  }

  // # Validaciones de campos
  isFieldInvalid(field: string): boolean | null {
    return (
      this.loginForm.controls[field].errors &&
      this.loginForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return `Este campo es requerido`;
        case 'email':
          return `Debe ingresar un email para continuar`;
      }
    }
    return null;
  }
}
