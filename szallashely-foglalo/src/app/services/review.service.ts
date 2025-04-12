// 📁 review.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, where } from '@angular/fire/firestore';
import { Review } from '../models/review.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private firestore: Firestore) {}

  addReview(review: Review): Promise<any> {
    const reviewCollection = collection(this.firestore, 'reviews');
    return addDoc(reviewCollection, review);
  }

  getReviewsByAccommodation(accommodationId: string): Observable<Review[]> {
    const reviewCollection = collection(this.firestore, 'reviews');
    const q = query(reviewCollection, where('accommodationId', '==', accommodationId));
    return collectionData(q, { idField: 'id' }) as Observable<Review[]>;
  }
}
