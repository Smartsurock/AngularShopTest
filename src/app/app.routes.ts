import { Routes } from '@angular/router';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductsResolver } from './products/products.resolver';

export const routes: Routes = [
  {
    path: '', component: ProductsComponent,
    resolve: [ProductsResolver],
    children: [
      { path: ':category', component: ProductsListComponent },
      { path: ':category/:id', component: ProductInfoComponent },
    ]
  },
];