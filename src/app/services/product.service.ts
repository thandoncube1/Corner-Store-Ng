import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProduct } from '../model/interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: IProduct [] = [];
  private http: HttpClient = inject(HttpClient);

  getProducts(api_url: string, loading: boolean): Promise<IProduct[] | Error> {
    return new Promise((resolve, reject) => {
      this.http.get(api_url + "GetAllProducts").subscribe({
      next: (res: any) => {
        this.productList = res.data;
        console.log("Products:", this.productList);
        loading = false;
        resolve(this.productList);
      },
      error: (error: string) => {
        console.error("Error fetching the product list:", error);
        loading = false;
        reject(error);
      }
    });
  })
  }
}
