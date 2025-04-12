export interface Booking {
  id?: string;
  userId: number;
  userName: string; // új
  userEmail: string;
  accommodationId: string;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}