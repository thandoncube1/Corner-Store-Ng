import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../model/interface/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  http = inject(HttpClient);
  productList: IProduct[] = [];
  api_url: string = environment.CORS_URL + environment.API_URL;

  // Life cycle method for the NG
  ngOnInit(): void {
    this.getAllProducts();
    console.log(environment.API_URL + "GetAllProducts");
  }

  getAllProducts() {
    this.http.get(this.api_url + "GetAllProducts").subscribe({
      next: async (res: any) => {
       this.productList = await res.data;
       console.log("Products:", this.productList);
      },
      error: (error: string) => {
        console.error("Error fetching the product list:", error);
      }
    });
  }

}
