import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NadbarModel } from '../model/nadbar_model';
import { Observable, of } from 'rxjs';

@Service()
export class NadbarService {
  private url = 'http://localhost:8080';

  //antes de angular 22
  //constructor(private http: HttpClient) {}
  //con angular 22
  // @ts-ignore
  private http = inject(HttpClient);

  nadvarEjemplo: NadbarModel[] = [
    {
      id: 1,
      title: 'Inicio',
      description: 'Va inicio publico que todo mundo puede ver',
      url: '/inicio',
    },
    {
      id: 2,
      title: 'Sobre Nosotros',
      description: 'Va inicio publico que todo mundo puede ver',
      url: '/nosotros',
    },
    {
      id: 3,
      title: 'Productos',
      description: 'Va inicio publico que todo mundo puede ver',
      url: '/catalogo',
    },
    {
      id: 4,
      title: 'Contacto',
      description: 'Va inicio publico que todo mundo puede ver',
      url: '/contacto',
    }
  ];

  // @ts-ignore
  //getNadbarByRole(role: string): Observable<NadbarModel[]>[] {
  getNadbarByRole(role: string): Observable<NadbarModel[]> {
    if (role === '' || role === null || role === undefined) {
      role = 'public';
    }
    //this.http.get<NadbarModel[]>(`${this.url}/${role}`)
    // @ts-ignore
    return of(this.nadvarEjemplo);
  }
}
