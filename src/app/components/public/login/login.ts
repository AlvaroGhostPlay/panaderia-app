import { Component, OnInit, OnDestroy } from '@angular/core';
import { UiService } from '../../../services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, CsrfToken, LoginRequest } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'login',
  templateUrl: './login.html',
})
export class Login implements OnInit, OnDestroy {
  // Controla qué panel estamos viendo
  loginActive: boolean = false;

  loginRequest: LoginRequest = {
    username: '',
    password: '',
  };

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {
    this.route.queryParams.subscribe((params) => {
      const panelDestino = params['action'];
      console.log(panelDestino);
      if (panelDestino === 'login') {
        this.loginActive = true; // Muestra el lado de login
      } else if (panelDestino === 'register') {
        this.loginActive = false; // Muestra el lado de registro
      }
    });
  }

  login(): void {
    this.authService.login(this.loginRequest).subscribe({
      next: () => {
        window.location.href = 'http://panaderia.test:8080/oauth2/authorization/bff';
      },
      error: (error) => {
        console.error('Error en login:', error);
      },
    });
  }

  // Cambia el estado de la clase
  togglePanel() {
    this.loginActive = !this.loginActive;
  }

  ngOnInit() {
    this.uiService.setLoginActive(true);
  }

  ngOnDestroy() {
    this.uiService.setLoginActive(false);
  }
}
