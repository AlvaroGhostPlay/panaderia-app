import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContentService } from '../../../services/content.service';
import { ContentModel } from '../../../model/content';
import { ContentItmes } from '../../../model/content.itmes';
import { NadbarService } from '../../../services/nadbar.service';
import { ImageService } from '../../../services/image.service';
import { it } from 'vitest';

@Component({
  imports: [RouterLink],
  selector: 'dashboard-public',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private contentItems: ContentItmes[] = [];
  private contenMap = new Map<string, string>();
  private imagesMap = new Map<string, string>();

  constructor(
    private contentService: NadbarService,
    private cdr: ChangeDetectorRef,
    private imageService: ImageService,
  ) {}

  ngOnInit() {
    // @ts-ignore
    this.contentService.getContenteByContentType('PUBLIC_HOME').subscribe({
      next: (data) => {
        const imagesAndKey: Map<string, string> = new Map<string, string>();
        this.contentItems = data.contents;
        this.contenMap = new Map(
          this.contentItems.map((item) => {
            if (item.type === 'IMG') {
              imagesAndKey.set(item.identifier, item.content);
            }
            return [item.identifier, item.content];
          }),
        );

        if (imagesAndKey.size > 0) {
          this.imageService.getImnagesByImageNames(imagesAndKey).subscribe({
            next: (nuevasImagenes: Record<string, string>) => {
              console.log(nuevasImagenes);

              // 1. Guardamos en imagesMap los base64 que vienen del backend
              Object.entries(nuevasImagenes).forEach(([identifier, base64Content]) => {
                this.imagesMap.set(identifier, base64Content);

                // 2. Actualizamos el contenMap AQUÍ ADENTRO (cuando ya llegaron los datos)
                // Opcional: si quieres que el contenido se convierta en la imagen base64
                this.contenMap.set(identifier, base64Content);
              });

              console.log(this.imagesMap);
              console.log(this.contenMap);

              // 3. Forzamos la detección de cambios al terminar de procesar todo
              this.cdr.detectChanges();
            },
          });
        } else {
          // Si no hay imágenes que cargar, detecta cambios de inmediato
          this.cdr.detectChanges();
        }
      },
      error: (error) => {
        console.error('Error cargando navbar:', error);
      },
    });
  }

  getContent(id: string): string {
    return this.contenMap.get(id) ?? '';
  }
}
