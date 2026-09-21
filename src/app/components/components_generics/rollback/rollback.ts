import { Component } from '@angular/core';
import { AuthService, MeResponse, User } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthstateService } from '../../../services/authstate.service';

@Component({
  imports: [],
  selector: 'app-rollback',
  templateUrl: './rollback.html',
})
export class Rollback {
  constructor(
    private authService: AuthService,
    private router: Router,
    private authState: AuthstateService,
  ) {}

  ngOnInit(): void {
    this.authService.me().subscribe({
      next: (response: MeResponse) => {
        console.log('Respuesta /bff/me:', response);

        if (!response.authenticated) {
          this.router.navigate(['/login']);
          return;
        }

        const user: User = {
          username: response.name,
          name: response.name,
          roles: response.roles ?? [],
        };

        this.authState.setUser(user, response.authenticated);

        this.authService.csrf().subscribe({
          next: () => {
            console.log('CSRF generado:', document.cookie);

            if (user.roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/admin/dashboard']);
            } else if (user.roles.includes('ROLE_USER')) {
              this.router.navigate(['/app']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error: (error) => {
            console.error('Error generando CSRF:', error);
          },
        });
      },

      error: (error) => {
        console.error('Error obteniendo /bff/me:', error);

        this.authState.clearUser();
        this.router.navigate(['/login']);
      },
    });
  }
}
