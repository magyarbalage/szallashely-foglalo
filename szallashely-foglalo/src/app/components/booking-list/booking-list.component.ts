import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { MatTableModule } from '@angular/material/table';
import { TimestampToDatePipe } from '../../pipes/timestamp-to-date.pipe';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule, MatTableModule,TimestampToDatePipe],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  bookings: Booking[] = [];
  displayedColumns = ['name', 'email', 'start', 'end', 'status'];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe(data => {
      console.log('Bejövő foglalások:', data); // 👈 teszteléshez hasznos
      this.bookings = data;
    });
  }
}