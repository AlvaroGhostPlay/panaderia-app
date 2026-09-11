import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

// @ts-ignore
export const roleGuard: CanActivateFn = (rolesPermitidos: string[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.me().pipe(
      map((response) => {
        if (!response.authenticated) {
          return router.createUrlTree(['/login']);
        }

        const userRoles = response.roles ?? [];

        const tienePermiso = rolesPermitidos.some((role) => userRoles.includes(role));

        if (tienePermiso) {
          return true;
        }

        return router.createUrlTree(['/forbidden']);
      }),

      catchError(() => {
        return of(router.createUrlTree(['/login']));
      }),
    );
  };
};
