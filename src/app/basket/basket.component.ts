import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Buyer } from '../products/products-models/buyer.model';
import * as ProductsActions from '../products/products-store/products.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Order } from '../products/products-models/order.model';
import { Delivery } from '../products/products-models/delivery.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  buyers: Buyer[];
  authSub: Subscription;
  productsSub: Subscription;
  userMail: string;
  orderForm: FormGroup;
  orderAccepted: boolean = false;
  totalPrice: number = 0;

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

      this.totalPrice = 0;
      this.buyers.forEach(buyer => {
        this.totalPrice += buyer.count * buyer.price;
      });
    });

    this.initForm();
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

  initForm() {
    this.orderForm = new FormGroup({
      mailService: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      receiver: new FormControl(null, [Validators.required]),
      telephone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{12}")]),
      payment: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit() {
    if (!this.buyers.length) return;
    this.orderAccepted = true;

    const delivery = new Delivery(
      this.orderForm.value.mailService,
      this.orderForm.value.address,
      this.orderForm.value.receiver,
      this.orderForm.value.telephone,
      this.orderForm.value.payment,
      this.userMail,
    );
    const order = new Order(this.buyers, delivery, this.totalPrice);

    this.store.dispatch(new ProductsActions.SaveOrder(order));

    this.buyers.forEach(el => {
      let index: number;
      this.store.select('products').pipe(take(1)).subscribe(state => {
        index = state.basket.findIndex(item => {
          return item.productId === el.productId
            && item.userMail === el.userMail;
        });
        this.store.dispatch(new ProductsActions.RemoveFromBasket(index));
      });
    });

    this.store.dispatch(new ProductsActions.SaveBasketState());
  }

  onAccept() {
    this.orderAccepted = false;
  }
}
