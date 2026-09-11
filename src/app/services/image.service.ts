import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentModel } from '../model/content';

@Service()
export class ImageService {
  private url = 'http://panaderia.test:8080';
  private path = '/api/v1/images';

  private http = inject(HttpClient);

  getImnagesByNameImage(image: string): Observable<any> {
    const params = new HttpParams().set('filename', image);
    console.log(`${this.url}${this.path}/public/images${ params }`);
    return this.http.get(`${this.url}${this.path}/public/images`, {
      params,
      responseType: 'blob',
    });
  }

  getImnagesByImageNames(images: Map<string, string>): Observable<Record<string, string>> {
    const payload = Object.fromEntries(images);
    // Se envía 'payload' directamente sin envolverlo en otra llave
    return this.http.post<Record<string, string>>(
      `${this.url}${this.path}/public/images/map`,
      payload,
    );
  }
}
