import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../model/interface/product';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productList: IProduct[] = [];
  api_url: string = environment.CORS_URL + environment.API_URL;
  loading: boolean = true;
  // Services
  productService = new ProductService();

  // Life cycle method for the NG
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts(this.api_url, this.productList, this.loading).then((data) => {
      this.productList = data;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
    this.loading = false;
  }
}
