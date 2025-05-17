import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AccommodationListComponent } from './components/accommodation-list/accommodation-list.component';
import { AccommodationDetailComponent } from './components/accommodation-detail/accommodation-detail.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard, GuestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accommodations', component: AccommodationListComponent },
  { path: 'accommodations/:id', component: AccommodationDetailComponent },
  { path: 'bookings', component: BookingListComponent },
  {
    path: 'login',
    loadComponent: () => import('./components/login.component').then(m => m.LoginComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register.component').then(m => m.RegisterComponent),
    canActivate: [GuestGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard]
  }
];


