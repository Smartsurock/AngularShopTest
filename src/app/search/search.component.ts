import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../products/products-models/product.model';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>,
  ) { }

  routeSub: Subscription;
  products: Product[] = [];
  searchRequest: string;

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      this.products = [];
      if (params.title) {
        this.searchRequest = params.title;
        this.store.select('products').pipe(take(1)).subscribe(state => {
          state.products.forEach(product => {
            if (product.category.toLowerCase().search(
              this.searchRequest.toLowerCase()) !== -1
              || product.name.toLowerCase().search(
                this.searchRequest.toLowerCase()) !== -1) {
              this.products.push(product);
            }
          });
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber(this.routeSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) subscription.unsubscribe();
  }
}
