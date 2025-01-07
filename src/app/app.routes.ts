import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductResolverService } from './services/product-resolver.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },

    {
        path: 'products',
        component: ProductsComponent,
        children: [
            {
                path: ':id',
                component: ProductDetailComponent,
                resolve: {
                    product: ProductResolverService
                }
            }
        ]
    }
];
