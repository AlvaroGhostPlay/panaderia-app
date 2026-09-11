import { Component, OnInit, ChangeDetectorRef, input, effect } from '@angular/core';
import { NadbarModel } from '../../../model/nadbar_model';
import { NadbarService } from '../../../services/nadbar.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ImageService } from '../../../services/image.service';
import { AuthstateService } from '../../../services/authstate.service';

@Component({
  imports: [RouterLink],
  selector: 'nadbar-generic',
  templateUrl: './nadbar.html',
})
export class Nadbar implements OnInit {
  nadbars: NadbarModel[] = [];
  logo!: string;
  tipo = input<string>('PUBLIC_HOME');
  tipoNavbar = 'PUBLIC_HOME';

  constructor(
    private nadbarService: NadbarService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private imageService: ImageService,
    private authState: AuthstateService,
  ) {
    effect(() => {
      const tipoActual = this.tipo();

      console.log('Navbar cambió:', tipoActual);

      this.nadbarService.getNadbarByUsername(tipoActual).subscribe({
        next: (data) => {
          this.nadbars = data;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error cargando navbar:', error);
        },
      });
    });
  }

  ngOnInit(): void {
    this.authState.auth$.subscribe((auth) => {
      if (auth === true) {
        this.tipoNavbar = 'USER_HOME';
      } else {
        this.tipoNavbar = 'PUBLIC_HOME';
      }

      console.log('Tipo navbar:', this.tipoNavbar);
    });

    this.imageService.getImnagesByNameImage('logo.png').subscribe({
      next: (data) => {
        this.logo = URL.createObjectURL(data);
        this.cdr.detectChanges();
      },
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // El navegador seguirá las redirecciones automáticamente.
        // Opcional: forzar recarga para limpiar el estado de la UI
        window.location.href = 'http://panaderia.test:8080/';
      },
      error: (err) => console.error('Error al cerrar sesión', err),
    });
  }
}
