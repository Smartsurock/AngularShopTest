import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HeaderComponent } from './header/header.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoductCardComponent } from './products/products-list/poduct-card/poduct-card.component';
import { AuthComponent } from './auth/auth.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import * as fromAppReducer from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/auth-store/auth.effects';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { StarsDirective } from './products/product-info/stars.directive';
import { ProductInfoCommentComponent } from './products/product-info/product-info-comment/product-info-comment.component';
import { ProductInfoFormComponent } from './products/product-info/product-info-form/product-info-form.component';
import { ProductsEffects } from './products/products-store/products.effects';
import { BasketComponent } from './basket/basket.component';
import { CommonModule } from '@angular/common';
import { GoodsComponent } from './main/goods.component';
import { BasketItemComponent } from './basket/basket-item/basket-item.component';
import { DropdownDirective } from './basket/dropdown.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthErrorComponent } from './auth/auth-error/auth-error.component';
import { SpinnerComponent } from './auth/spinner/spinner.component';
import { BasketInfoComponent } from './basket/basket-info/basket-info.component';
import { SliderComponent } from './slider/slider.component';
import { SearchComponent } from './search/search.component';
import { SearchEmptyComponent } from './search/search-empty/search-empty.component';
import { ProductsFilterComponent } from './products/products-list/products-filter/products-filter.component';
import { SearchDirective } from './header/search.directive';
import { AuthInterceptor } from './auth/auth.interceptor';
import { SearchFormComponent } from './header/search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CatalogComponent,
    PoductCardComponent,
    AuthComponent,
    ProductsComponent,
    ProductInfoComponent,
    ProductsListComponent,
    StarsDirective,
    ProductInfoCommentComponent,
    ProductInfoFormComponent,
    BasketComponent,
    GoodsComponent,
    BasketItemComponent,
    DropdownDirective,
    SearchDirective,
    ErrorPageComponent,
    AuthErrorComponent,
    SpinnerComponent,
    BasketInfoComponent,
    SliderComponent,
    SearchComponent,
    SearchEmptyComponent,
    ProductsFilterComponent,
    SearchFormComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot(fromAppReducer.appReducer),
    EffectsModule.forRoot([AuthEffects, ProductsEffects]),
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
