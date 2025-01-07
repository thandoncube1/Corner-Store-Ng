import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct, IProductById } from '../model/interface/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http: HttpClient = inject(HttpClient);

  getProducts(api_url: string, productList: IProduct[]): Promise<IProduct[]> {
    return new Promise((resolve, reject) => {
      this.http.get(api_url + 'GetAllProducts').subscribe({
        next: (res: any) => {
          productList = res.data;
          console.log('Products:', productList);
          resolve(productList);
        },
        error: (error: string) => {
          console.error('Error fetching the product list:', error);
          reject(error);
        },
      });
    });
  }

  getProductById(api_url: string, productId: number) {
    return new Promise((resolve, reject) => {
      this.http.get<IProductById>(api_url + 'GetProductById', { params: { id: productId }}).subscribe({
        next: (res: IProductById) => {
          resolve(res.data);
        },
        error: error => {
          console.error('Error fetching the product by Id: ', error);
          reject(error);
        }
      });
    });
  }
}
