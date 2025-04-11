// src/app/models/review.model.ts
export interface Review {
    id: number;
    accommodationId: number;
    userId: number;
    rating: number;
    comment: string;
  }