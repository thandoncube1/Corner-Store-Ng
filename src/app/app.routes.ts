import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },

    {
        path: 'products',
        component: ProductsComponent,
    },
    {
        path: 'products/:id',
        component: ProductDetailComponent
    },
    // Creating Login Routes
    {
        path: 'users/login',
        component: UserComponent
    }
];
