import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { GoodsComponent } from './main/goods.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductsResolver } from './products/products.resolver';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/goods', pathMatch: 'full', },
  {
    path: 'basket', component: BasketComponent,
    resolve: [ProductsResolver],
  },
  {
    path: 'goods', component: ProductsComponent,
    resolve: [ProductsResolver],
    children: [
      { path: '', component: GoodsComponent, pathMatch: 'full', },
      { path: ':category', component: ProductsListComponent, },
      { path: ':category/:id', component: ProductInfoComponent, },
    ]
  },
];