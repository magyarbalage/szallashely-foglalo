import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData,addDoc } from '@angular/fire/firestore';
import { Accommodation } from '../models/accommodation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  constructor(private firestore: Firestore) {}

  getAccommodations(): Observable<Accommodation[]> {
    const accommodationsRef = collection(this.firestore, 'accommodations');
    return collectionData(accommodationsRef, { idField: 'id' }) as Observable<Accommodation[]>;
  }

  getAccommodationById(id: string): Observable<Accommodation> {
    const accommodationDoc = doc(this.firestore, `accommodations/${id}`);
    return docData(accommodationDoc, { idField: 'id' }) as Observable<Accommodation>;
  }
  addAccommodation(accommodation: Accommodation) {
    const accommodationsRef = collection(this.firestore, 'accommodations');
    return addDoc(accommodationsRef, accommodation);
  }
}