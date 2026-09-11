import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Inicializamos el estado en false
  private loginActiveSource = new BehaviorSubject<boolean>(false);

  // Esta es la variable que el FooterService va a "escuchar"
  public loginActive$ = this.loginActiveSource.asObservable();

  // Función para actualizar el estado desde el Login
  setLoginActive(isActive: boolean) {
    this.loginActiveSource.next(isActive);
  }
}
