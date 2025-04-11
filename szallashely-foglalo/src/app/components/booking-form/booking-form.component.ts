import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent {
  @Input() accommodationId!: number;
  bookingForm: FormGroup;
  @Output() bookingSaved = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userId: [1] // fejlesztés közben fix/mock ID
    });
  }

  submit() {
    if (this.bookingForm.valid) {
      const formValue = this.bookingForm.value;

      const booking: Booking = {
        userId: formValue.userId,
        userEmail: formValue.userEmail,
        accommodationId: this.accommodationId,
        startDate: formValue.startDate,
        endDate: formValue.endDate,
        status: 'pending',
        createdAt: new Date(),
        userName: formValue.userName // 👈 új mező
      };

      this.bookingService.addBooking(booking)
      .then(() => {
        alert('Foglalás sikeresen elmentve!');
        this.bookingForm.reset();
        this.bookingSaved.emit(); // ✅ szólunk a szülő komponensnek
      })
      .catch(err => {
        console.error('Hiba a foglalás mentésekor:', err);
      });
    }
  }
}