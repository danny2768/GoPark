import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../../shared/interfaces';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent implements OnDestroy {
  public showDialog: boolean = false;
  public dialogMessage = {
    title: 'Error',
    description: 'An error has occurred.',
  };

  private subscription?: Subscription;

  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
  });

  private timeoutId?: number;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDialogClose(): void {
    // If the dialog is closed manually, clear the timeout and navigate immediately
    this.showDialog = false;
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
      this.router.navigate(['./auth/login']);
    }
  }

  onSubmit(): boolean {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const user = this.registerForm.value as User;

    this.subscription = this.authService
      .registerUser(user)
      .subscribe((wasRegistred) => {
        if (!wasRegistred) {
          this.dialogMessage.title = 'Error';
          this.dialogMessage.description =
            'An error has occurred while registering the user.';
          this.showDialog = true;
          return false;
        }

        this.dialogMessage.title = 'Success';
        this.dialogMessage.description = 'User registered successfully.';
        this.showDialog = true;

        // Wait for 5 seconds before navigating and closing the dialog
        this.timeoutId = window.setTimeout(() => {
          this.showDialog = false; // Close the dialog
          this.router.navigate(['./auth/login']); // Navigate to login
        }, 5000);

        return true;
      });

    return false;
  }

  // # Validaciones de campos
  isFieldInvalid(field: string): boolean | null {
    return (
      this.registerForm.controls[field].errors &&
      this.registerForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};

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
