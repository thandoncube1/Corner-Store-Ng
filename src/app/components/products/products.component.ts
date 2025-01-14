import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../model/interface/product';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  // Constructor
  constructor(private router: Router, private productService: ProductService) {}

  productList: IProduct[] = [];
  api_url: string = '/api/v1/';
  loading: boolean = true;

  // Life cycle method for the NG
  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getProducts(this.api_url, this.productList).then((data) => {
      this.productList = data;
      this.loading = false;
    }).catch((err) => {
      console.log(err);
    });
    this.loading = false;
  }

  // Get Product By Id
  navigateToProduct(product: IProduct) {
    console.log("Product: ", product);
    //Programmatic navigation with the query
    this.router.navigate(['/products', product.productId]);
  }
}
