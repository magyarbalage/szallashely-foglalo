import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Booking } from '../../models/booking.model';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AccommodationService } from '../../services/accommodation.service';
import { from, switchMap, map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    TimestampToDatePipe,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userEmail: string | null = null;
  userId: string | null = null;
  userBookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private accommodationService: AccommodationService
  ) {}
 

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.userEmail = user?.email || null;
      this.userId = user?.uid || null;
      if (this.userId) {
        this.loadBookings();
      }
    });
  }

loadBookings(): void {
  if (!this.userEmail) return;

  this.bookingService.getBookingsByUserEmail(this.userEmail).subscribe(bookings => {
    this.userBookings = bookings;
    
    console.log('✅ Betöltött foglalások:', this.userBookings);
  });
}

  deleteBooking(id?: string): void {
    if (!id) return;
    this.bookingService.deleteBooking(id)
      .then(() => {
        this.snackBar.open('Foglalás törölve ✅', 'OK', { duration: 3000 });
        this.loadBookings();
      })
      .catch(() => {
        this.snackBar.open('Hiba a törlés során ❌', 'Bezár', { duration: 3000 });
      });
  }
}