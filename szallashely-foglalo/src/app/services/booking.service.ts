import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,query,where,doc,deleteDoc } from '@angular/fire/firestore';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private firestore = inject(Firestore);

  addBooking(booking: Booking) {
    const bookingsRef = collection(this.firestore, 'bookings');
    return addDoc(bookingsRef, booking);
  }
  getAllBookings(): Observable<Booking[]> {
    const bookingsRef = collection(this.firestore, 'bookings');
    return collectionData(bookingsRef, { idField: 'id' }) as Observable<Booking[]>;
  }
  getBookingsByUserEmail(email: string): Observable<Booking[]> {
    const ref = collection(this.firestore, 'bookings');
    const q = query(ref, where('userEmail', '==', email));
    return collectionData(q, { idField: 'id' }) as Observable<Booking[]>;
  }
    deleteBooking(bookingId: string) {
    const bookingDocRef = doc(this.firestore, 'bookings', bookingId);
    return deleteDoc(bookingDocRef);
  }
  getBookingsByUserId(uid: string): Observable<Booking[]> {
    const ref = collection(this.firestore, 'bookings');
    const q = query(ref, where('userId', '==', uid));
    return collectionData(q, { idField: 'id' }) as Observable<Booking[]>;
  }
getBookingsForAccommodation(accommodationId: string): Observable<Booking[]> {
  const ref = collection(this.firestore, 'bookings');
  const q = query(ref, where('accommodationId', '==', accommodationId));
  return collectionData(q, { idField: 'id' }) as Observable<Booking[]>;
}
  
}