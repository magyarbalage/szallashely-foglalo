import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccommodationListComponent } from './components/accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './components/accommodation-detail/accommodation-detail.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accommodations', component: AccommodationListComponent },
  { path: 'accommodations/:id', component: AccommodationDetailComponent },
  { path: 'bookings', component: BookingListComponent }
];
