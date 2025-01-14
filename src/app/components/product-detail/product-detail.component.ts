import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct, IProductById } from '../../model/interface/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  product: IProduct | null = null;
  loading: boolean = true;
  api_url: string = 'api/v1/';

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    })
  }

  loadProduct(productId: number) {
    this.loading = true;
    this.productService.getProductById(this.api_url, productId)
    .then((product: IProductById | unknown) => {
      this.product = product as IProduct | null;
      this.loading = false;
    })
    .catch(error => {
      console.error('Error loading product', error.message);
      this.loading = false;
    });
  }
}
