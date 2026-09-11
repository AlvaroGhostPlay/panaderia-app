import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentModel } from '../model/content';
import { NadbarModel } from '../model/nadbar_model';

@Service()
export class ContentService {
  private url = 'http://panaderia.test:8080';
  private path = '/api/v1/contents/content/getByContentType';

  private http = inject(HttpClient);

  getContent(nadbarType: string): Observable<ContentModel> {
    return this.http.get<ContentModel>(this.url + this.path);
  }
}
