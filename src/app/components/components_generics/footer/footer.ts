import { ChangeDetectorRef, Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UiService } from '../../../services/ui.service';
import { AsyncPipe } from '@angular/common';
import { FooterService } from '../../../services/footer.service';
import { NadbarModel } from '../../../model/nadbar_model';
import { NadbarService } from '../../../services/nadbar.service';

@Component({
  imports: [RouterLink, AsyncPipe],
  selector: 'footer-generic',
  templateUrl: './footer.html',
})
export class Footer {

  nadbars: NadbarModel[] = [];
  private nadbarService = inject(NadbarService);
  tipo = input<string>('PUBLIC_FOOTER');

  constructor(
    public uiService: UiService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      const tipoActual = this.tipo();
      console.log(this.tipo)

      console.log('footer cambió:', tipoActual);

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
}
