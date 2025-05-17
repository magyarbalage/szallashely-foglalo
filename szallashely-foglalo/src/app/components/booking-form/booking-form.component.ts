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
import { AuthService } from '../../services/auth.service';
import { User } from '@angular/fire/auth';
import { OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';

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
    MatButtonModule,
    TimestampToDatePipe
  ],
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss']
})
export class BookingFormComponent implements OnInit{
  existingBookings: Booking[] = [];

  @Input() accommodationId!: string;
  bookingForm: FormGroup;
  @Output() bookingSaved = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.bookingForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userId: [''] 
    });
    this.authService.user$.subscribe((user: User | null) => {
    if (user) {
      this.bookingForm.patchValue({
        userId: user.uid,
        userEmail: user.email ?? ''
      });
    }
  });
  }
  ngOnInit(): void {
  this.bookingService.getBookingsForAccommodation(this.accommodationId).subscribe(data => {
    this.existingBookings = data;
  });
}
submit() {
  if (this.bookingForm.valid) {
    const formValue = this.bookingForm.value;
    const now = new Date();
    const newBooking: Booking = {
      userId: formValue.userId,
      userEmail: formValue.userEmail,
      accommodationId: this.accommodationId,
      startDate: formValue.startDate,
      endDate: formValue.endDate,
      status: 'pending',
      createdAt: new Date(),
      userName: formValue.userName
    };

    this.bookingService.getBookingsForAccommodation(this.accommodationId).pipe(take(1)).subscribe(existingBookings => {
      const newStart = newBooking.startDate instanceof Date ? newBooking.startDate : (newBooking.startDate as any).toDate();
      const newEnd = newBooking.endDate instanceof Date ? newBooking.endDate : (newBooking.endDate as any).toDate();

      const overlap = existingBookings.some(b => {
        const existingStart = b.startDate instanceof Date ? b.startDate : (b.startDate as any).toDate();
        const existingEnd = b.endDate instanceof Date ? b.endDate : (b.endDate as any).toDate();
        return newStart < existingEnd && newEnd > existingStart;
      });

      if (overlap) {
        alert('❌ Ez az időszak már foglalt! Kérlek válassz másik időpontot.');
        return;
      }
      
      if (formValue.startDate < now || formValue.endDate < now) {
        alert('Nem lehet múltbeli időpontot megadni!');
        return;
      }
      if (formValue.startDate > formValue.endDate ) {
        alert('❌A távozás dátuma nem lehet kisebb mint az érkezés dátuma!');
        return;
      }
      if (formValue.startDate == formValue.endDate ) {
        alert('❌Ugyanazon a napon nem távozhatsz mint mikor érkezel!');
        return;
      }

      // ✅ Nincs átfedés → mentés
      this.bookingService.addBooking(newBooking)
        .then(() => {
          alert('✅ Foglalás sikeresen elmentve!');
          this.bookingForm.reset();
          this.bookingSaved.emit();
        })
        .catch(err => {
          console.error('Hiba a foglalás mentésekor:', err);
        });
    });
  }
}
}
