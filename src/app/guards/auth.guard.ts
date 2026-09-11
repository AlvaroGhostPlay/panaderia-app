import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';
import { AuthstateService } from '../services/authstate.service';
import { User } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authState = inject(AuthstateService);

  if (authState.auth === true) {
    return true;
  }

  // Ya sabemos que NO está autenticado
  if (authState.auth === false) {
    return router.createUrlTree(['/login'], { queryParams: { action: 'login' } });
  }

  // auth === null
  // Todavía no sabemos → consultar backend
  return authService.me().pipe(
    map((response) => {
      if (!response.authenticated) {
        authState.clearUser();
        return router.createUrlTree(['/login'], { queryParams: { action: 'login' } });
      }

      const user: User = {
        username: response.name,
        name: response.name,
        roles: response.roles ?? [],
      };

      authState.setUser(user, true);
      return true;
    }),
    catchError(() => {
      authState.clearUser();
      return of(router.createUrlTree(['/login'], { queryParams: { action: 'login' } }));
    }),
  );
};
