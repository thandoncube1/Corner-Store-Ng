import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  api_url: string = environment.CORS_URL + environment.API_URL;
  loading: boolean = true;
  // Services
  productService = new ProductService();

  // Life cycle method for the NG
  ngOnInit(): void {
    this.getAllProducts();
    console.log(environment.API_URL + "GetAllProducts");
  }

  getAllProducts() {
    this.productService.getProducts(this.api_url, this.loading);
  }

}
