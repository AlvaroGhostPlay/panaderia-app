import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NadbarModel } from '../model/nadbar_model';
import { Observable, } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private url = 'http://panaderia.test:8080';
  private path = '/api/v1/nadbars/getNadbar?typeNadbar=';

  //antes de angular 22
  //constructor(private http: HttpClient) {}
  //con angular 22
  private http = inject(HttpClient);

  // @ts-ignore
  //getNadbarByRole(role: string): Observable<NadbarModel[]>[] {
  getNadbarByRole(role: string): Observable<NadbarModel[]> {
    //this.http.get<NadbarModel[]>(`${this.url}/${role}`)
    // @ts-ignore
    console.log(`${this.url}${this.path}${role}`);
    return this.http.get<NadbarModel[]>(`${this.url}${this.path}${role}`);
  }
}
