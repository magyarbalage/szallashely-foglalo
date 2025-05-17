import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData,addDoc,query,where, orderBy,limit } from '@angular/fire/firestore';
import { Accommodation } from '../models/accommodation.model';
import { Observable } from 'rxjs';
import { serverTimestamp } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  private firestore = inject(Firestore);

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
  return addDoc(accommodationsRef, {
    ...accommodation,
    createdAt: serverTimestamp()
  });
}
  // 🔍 1. Szűrés kategória alapján
  getByCategory(category: string): Observable<Accommodation[]> {
    const q = query(
      collection(this.firestore, 'accommodations'),
      where('category', '==', category)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Accommodation[]>;
  }

  // 🔍 2. Szűrés ár alapján
  getAffordable(maxPrice: number): Observable<Accommodation[]> {
    const q = query(
      collection(this.firestore, 'accommodations'),
      where('price', '<=', maxPrice)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Accommodation[]>;
  }

  // 🔍 3. Rendezés ár szerint növekvő sorrendben
  getSortedByPrice(): Observable<Accommodation[]> {
    const q = query(
      collection(this.firestore, 'accommodations'),
      orderBy('price', 'asc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Accommodation[]>;
  }

  // 🔍 4. Legutóbbi szállások lekérése (limit)
  getRecent(limitCount: number): Observable<Accommodation[]> {
    const q = query(
      collection(this.firestore, 'accommodations'),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Accommodation[]>;
  }
  getAccommodationNameById(id: string): Promise<string> {
  const accommodationDoc = doc(this.firestore, `accommodations/${id}`);
  return docData(accommodationDoc)
    .toPromise()
    .then((data: any) => data?.name ?? 'Ismeretlen szállás')
    .catch(() => 'Ismeretlen szállás');
}
}