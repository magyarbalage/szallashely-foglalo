import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take,tap} from 'rxjs/operators';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    tap(user => {
      if (!user) {
        router.navigate(['/']); // nincs belépve → főoldalra dob
      }
    }),
    map(user => !!user)
  );
};

export const GuestGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.user$.pipe(
    take(1),
    tap(user => {
      if (user) {
        router.navigate(['/']); // átirányítás főoldalra
      }
    }),
    map(user => !user) // csak akkor enged tovább, ha nincs bejelentkezve
  );
};