import { Routes } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { BasketResolver } from './basket/basket.resolver';
import { ErrorPageComponent } from './error-page/error-page.component';
import { GoodsComponent } from './main/goods.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsComponent } from './products/products.component';
import { ProductsResolver } from './products/products.resolver';
import { SearchComponent } from './search/search.component';
import { SliderComponent } from './slider/slider.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/goods', pathMatch: 'full', },
  {
    path: 'goods', component: ProductsComponent,
    resolve: [ProductsResolver, BasketResolver],
    children: [
      { path: '', component: GoodsComponent, pathMatch: 'full', },
      { path: ':category', component: ProductsListComponent, },
      { path: ':category/:id', component: ProductInfoComponent, },
    ]
  },
  {
    path: 'basket', component: BasketComponent,
    resolve: [ProductsResolver, BasketResolver],
  },
  {
    path: 'search', component: SearchComponent,
    resolve: [ProductsResolver],
  },
  {
    path: 'error', component: ErrorPageComponent,
    data: { message: 'Такая страница не существует или ещё не создана...' }
  },
  { path: '**', redirectTo: '/error', pathMatch: 'full' },
];