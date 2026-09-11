import { inject, Service } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, ProductCategory } from '../model/product.model';

@Service()
export class ProductService {
  private url = 'http://panaderia.test:8080';
  private path = '/api/v1/products';

  private http = inject(HttpClient);

  getProductsStore(page: string, cantidad:string, categoria: string): Observable<any> {
    const params = new HttpParams()
      .set('page', page)
      .set('cantidad', cantidad)
      .set('categoria', categoria);
    return this.http.get<any>(`${this.url}${this.path}/product/private/getProductStore`, {
      params,
      withCredentials: true,
    });
  }

  getAllProductCategories(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(
      `${this.url}${this.path}/category/private`,
      {
        withCredentials: true,
      },
    );
  }
}
