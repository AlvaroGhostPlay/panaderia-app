import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NadbarModel } from '../model/nadbar_model';
import { Observable } from 'rxjs';
import { ContentModel } from '../model/content';

@Injectable({
  providedIn: 'root',
})
export class NadbarService {
  private url = 'http://panaderia.test:8080';
  private path = '/api/v1/contents';

  //antes de angular 22
  //constructor(private http: HttpClient) {}
  //con angular 22
  private http = inject(HttpClient);

  // @ts-ignore
  //getNadbarByRole(role: string): Observable<NadbarModel[]>[] {
  getNadbarByUsername(nadbarType: string): Observable<NadbarModel[]> {
    //this.http.get<NadbarModel[]>(`${this.url}/${role}`)
    // @ts-ignore
    const params = new HttpParams().set('typeNadbar', nadbarType);
    console.log(this.url + this.path + params);
    return this.http.get<NadbarModel[]>(this.url + this.path + '/nadbar/getNadbars', {
      params,
    });
  }

  // @ts-ignore
  getContenteByContentType(contentType:string): Observable<ContentModel> {
    const params = new HttpParams().set('contentType', contentType);
    console.log(this.url + this.path + '/content/getByContentType' + contentType);
    return this.http.get<ContentModel>(this.url + this.path + '/content/getByContentType', {
      params,
    });
  }
}
