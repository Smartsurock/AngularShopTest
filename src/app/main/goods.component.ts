import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  goods = {
    categories: [],
    items: [],
  };
  productsSub: Subscription;

  ngOnInit(): void {
    this.productsSub = this.store.select('products').subscribe(state => {
      state.products.forEach(product => {
        if (!this.goods.categories.includes(product.category)) {
          this.goods.categories.push(product.category);
          this.goods.items.push({
            category: product.category,
            image: product.images[0],
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.productsSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  onGoodClick(category) {
    this.router.navigate([`goods/${category}`]);
  }
}
