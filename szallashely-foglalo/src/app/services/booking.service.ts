import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private firestore: Firestore) {}

  addBooking(booking: Booking) {
    const bookingsRef = collection(this.firestore, 'bookings');
    return addDoc(bookingsRef, booking);
  }
  getAllBookings(): Observable<Booking[]> {
    const bookingsRef = collection(this.firestore, 'bookings');
    return collectionData(bookingsRef, { idField: 'id' }) as Observable<Booking[]>;
  }
}