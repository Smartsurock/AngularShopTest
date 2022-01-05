import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from '../products-store/products.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>,
  ) { }

  products: Product[];
  routeSub: Subscription;
  userMail: string;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      const category = params['category'];
      this.store.select('products').pipe(take(1)).subscribe(state => {
        this.products = state.products.filter(product => {
          return product.category === category;
        });
      });
    });

    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        this.userMail = state.user.email;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.routeSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
