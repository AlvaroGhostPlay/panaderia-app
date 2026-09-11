import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthstateService } from '../services/authstate.service';
import { AuthService, User } from '../services/auth.service';
import { map, catchError, of } from 'rxjs';

export const guestGuard: CanActivateFn = () => {
  const authState = inject(AuthstateService);
  const authService = inject(AuthService);
  const router = inject(Router);

  // 1. Si ya sabemos que ESTÁ autenticado (navegación interna)
  if (authState.auth === true) {
    return router.createUrlTree(['/app']);
  }

  // 2. Si ya sabemos que NO está autenticado
  if (authState.auth === false) {
    return true;
  }

  // 3. Si auth === null (el usuario escribió la URL y recargó la página)
  // Consultamos al backend antes de decidir
  return authService.me().pipe(
    map((response) => {
      if (response.authenticated) {
        // Hay sesión activa, guardamos los datos y lo mandamos al home de usuario
        const user: User = {
          username: response.name,
          name: response.name,
          roles: response.roles ?? [],
        };
        authState.setUser(user, true);

        return router.createUrlTree(['/app']);
      }

      // No está autenticado, lo dejamos entrar a la ruta pública
      authState.clearUser();
      return true;
    }),
    catchError(() => {
      // Si el backend da error (ej. token expirado), lo dejamos en la ruta pública
      authState.clearUser();
      return of(true);
    }),
  );
};
