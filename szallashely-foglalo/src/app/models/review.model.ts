export interface Review {
  id?: string;
  accommodationId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  userName?: string; 
  userEmail?: string;
}