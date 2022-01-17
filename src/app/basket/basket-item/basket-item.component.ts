import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Buyer } from 'src/app/products/products-models/buyer.model';
import { Product } from 'src/app/products/products-models/product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from 'src/app/products/products-store/products.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  @Input() buyer: Buyer;
  product: Product;
  productsSub: Subscription;
  buyerIndex: number;

  ngOnInit(): void {
    this.productsSub = this.store.select('products').subscribe(state => {
      const productIndex = state.products.findIndex(product => {
        return product.id === this.buyer.productId;
      });
      this.product = state.products[productIndex];
      this.buyerIndex = state.basket.findIndex(buyer => {
        return buyer.productId === this.buyer.productId && buyer.userMail === this.buyer.userMail;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.productsSub) {
      this.productsSub.unsubscribe();
    }
  }

  routerLink() {
    this.router.navigate([`goods/${this.product.category}/${this.product.id}`]);
  }

  onPlus() {
    const newBuyer = new Buyer(this.buyer.productId, this.buyer.count + 1, this.buyer.userMail);
    this.editCount(newBuyer);
  }

  onMinus() {
    if (this.buyer.count === 1) return;
    const newBuyer = new Buyer(this.buyer.productId, this.buyer.count - 1, this.buyer.userMail);
    this.editCount(newBuyer);
  }

  editCount(newBuyer: Buyer) {
    this.store.dispatch(new ProductsActions.EditBasket({
      newBuyer, index: this.buyerIndex,
    }));
  }

  onDelete() {
    this.store.dispatch(new ProductsActions.RemoveFromBasket(this.buyerIndex));
    this.store.dispatch(new ProductsActions.SaveBasketState());
  }
}
