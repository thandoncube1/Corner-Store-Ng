import { HttpClient } from '@angular/common/http';
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


  // Life cycle method for the NG
  ngOnInit(): void {
    this.getAllProducts();
    console.log(environment.API_URL + "GetAllProducts", { "Access-Control-Allow-Origin": "*" });
  }

  getAllProducts() {
    this.http.get(environment.API_URL + "GetAllProducts").subscribe((res: any) => {
       this.productList = res.data;
    });
  }

}
