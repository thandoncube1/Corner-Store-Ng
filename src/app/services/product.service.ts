import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../model/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);

  getProducts(api_url: string, productList: IProduct[], loading: boolean): Promise<IProduct[]> {
    return new Promise((resolve, reject) => {
      this.http.get(api_url + 'GetAllProducts').subscribe({
        next: (res: any) => {
          productList = res.data;
          console.log('Products:', productList);
          loading = false;
          resolve(productList);
        },
        error: (error: string) => {
          console.error('Error fetching the product list:', error);
          loading = false;
          reject(error);
        },
      });
    });
  }
}
