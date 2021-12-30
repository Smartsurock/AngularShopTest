import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../products/product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  products: Product[];
  authSub: Subscription;

  ngOnInit(): void {
    this.store.select('products').pipe(take(1)).subscribe(state => {
      this.products = state.basket;
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      if (!state.user) {
        this.router.navigate(['goods']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
