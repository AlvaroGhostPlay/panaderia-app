import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Cart } from '../model/Cart';

@Service()
export class PaymmentService {
  private url = 'http://panaderia.test:8080';
  private path = '/api/v1/paymment';

  private http = inject(HttpClient);

  getCart(userid:string){
    const params = new HttpParams()
      .set('userId', userid);

    return this.http.get<Cart>(`${this.url}${this.path}/cart`, {
      params,
      withCredentials: true,
    });
  }
}
