import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Review } from '../../models/review.model';
import { ReviewService } from '../../services/review.service';
import { MatCheckboxModule } from '@angular/material/checkbox'

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss']
})
export class ReviewFormComponent {
  @Input() accommodationId!: string;
  @Output() reviewAdded = new EventEmitter<void>();

  reviewForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private snackBar: MatSnackBar
  ) {
    this.reviewForm = this.fb.group({
      rating: [null, Validators.required],
      comment: [''],
      userName: [''],
      anonymous: [false]
    });
  }

  submit() {
    if (this.reviewForm.valid) {
      const form = this.reviewForm.value;
      const review: Review = {
        accommodationId: this.accommodationId,
        rating: form.rating,
        comment: form.comment,
        userName: form.anonymous ? 'Anonym' : form.userName,
        createdAt: new Date()
      };

      this.reviewService.addReview(review)
        .then(() => {
          this.snackBar.open('Értékelés mentve!', 'OK', { duration: 3000 });
          this.reviewForm.reset();
          this.reviewAdded.emit();
        })
        .catch(err => {
          console.error('Hiba az értékelés mentésekor:', err);
        });
    }
  }
}