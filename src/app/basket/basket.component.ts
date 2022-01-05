import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Buyer } from '../products/buyer.model';
import * as ProductsActions from '../products/products-store/products.actions';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router
  ) { }

  buyers: Buyer[] = [];
  authSub: Subscription;
  productsSub: Subscription;
  userMail: string;

  ngOnInit(): void {
    this.authSub = this.store.select('auth').subscribe(state => {
      if (!state.user) {
        this.router.navigate(['goods']);
      } else {
        this.userMail = state.user.email;
      }
    });

    this.productsSub = this.store.select('products').subscribe(state => {
      this.buyers = state.basket.filter(buyer => {
        return buyer.userMail === this.userMail;
      });
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.productsSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
