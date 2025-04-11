import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-accommodation-dialog',
  standalone: true,
  templateUrl: './add-accommodation-dialog.component.html',
  styleUrls: ['./add-accommodation-dialog.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,    
    MatSnackBarModule
  ]
})
export class AddAccommodationDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddAccommodationDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      price: [null, [Validators.required, Validators.min(0)]],
      imageUrl: ['']
    });
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
      this.snackBar.open('Szállás sikeresen hozzáadva ✅', 'OK', { duration: 3000 });
    } else {
      this.snackBar.open('Hiba: Kérlek, tölts ki minden kötelező mezőt ❌', 'Bezárás', { duration: 3000 });
    }
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
