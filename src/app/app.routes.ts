import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductsListComponent } from './products/products-list/products-list.component';

export const routes: Routes = [
  {
    path: '', component: AppComponent,
    children: [
      { path: ':category', component: ProductsListComponent },
      { path: ':category/:id', component: ProductInfoComponent },
    ]
  },
];