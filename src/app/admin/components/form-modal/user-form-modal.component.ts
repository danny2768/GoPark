import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { User } from '../../../shared/interfaces';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'admin-form-modal',
  templateUrl: './user-form-modal.component.html',
  styleUrl: './user-form-modal.component.css',
})
export class UserFormModalComponent implements OnInit, OnDestroy{

  @Input({ required: true })
  title!: string;

  @Input({ required: true })
  action!: 'create' | 'update';

  @Input()
  userId?: string;

  @Output()
  closeEvent = new EventEmitter<void>();

  public showForm: boolean = true;

  public dialogMessage = {
    title: 'Error',
    description: 'An error has occurred.',
  };

  onClose( ) {
    this.closeEvent.emit();
  }

  public user?: User;

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    documentNumber: ['', [Validators.required]],
    role: [1, [Validators.required]],
  });

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.action === 'update') {
      if (!this.userId) throw new Error('UserId is required');
      this.subscription = this.adminService.getUserById(this.userId).subscribe({
        next: (user) => {
          this.user = user;
          this.myForm.patchValue(user);
        },
        error: (error) => {
          console.error('Error al obtener el usuario');
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription ) this.subscription.unsubscribe();
  }

  onSubmit(): boolean {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    let user = this.myForm.value as User;

    if (this.action === 'create'){
      this.subscription = this.adminService.createUser(user).subscribe({
        next: (resp) => {
          this.dialogMessage.title = 'Success';
          this.dialogMessage.description = 'User created successfully';
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error al crear el usuario');
        }
      });
    }

    if (this.action === 'update'){
    if (this.user && this.user.id) {
      user = { ...user, id: this.user.id }; // Add the id to the user object
      this.subscription = this.adminService.updateUser(user).subscribe({
        next: (resp) => {
          this.dialogMessage.title = 'Success';
          this.dialogMessage.description = 'User updated successfully';
          this.showForm = false;
        },
        error: (error) => {
          console.error('Error al actualizar el usuario');
        }
      });
    }
  }


    return false;
  }

  getFirstWord(title: string): string {
    return title.split(' ')[0];
  }

  // # Validaciones de campos
  isFieldInvalid(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

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
