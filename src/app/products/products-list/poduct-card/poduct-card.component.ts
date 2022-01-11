import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../products-models/product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from '../../products-store/products.actions';
import { take } from 'rxjs/operators';
import * as AuthActions from 'src/app/auth/auth-store/auth.actions';
import { BasketService } from 'src/app/basket/basket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poduct-card',
  templateUrl: './poduct-card.component.html',
  styleUrls: ['./poduct-card.component.scss']
})
export class PoductCardComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private renderer: Renderer2,
    private basketService: BasketService,
  ) { }

  @ViewChild('starsActive') starsActive: ElementRef;

  @Input() product: Product;
  @Input() userMail: string;
  productGrade: number;
  index: number;
  alreadyInBasket: number = null;
  basketServiceSub: Subscription;

  ngOnInit() {
    this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;

    this.store.select('products').pipe(take(1)).subscribe(state => {
      this.index = state.products.findIndex(product => {
        return product.id === this.product.id;
      });
    });

    this.basketServiceSub = this.basketService.basketCheck.subscribe(alreadyInBasket => {
      this.alreadyInBasket = alreadyInBasket;
    });
  }

  ngAfterViewInit() {
    this.setStarsValue();
  }

  ngOnDestroy(): void {
    if (this.basketServiceSub) {
      this.basketServiceSub.unsubscribe();
    }
  }

  setStarsValue() {
    this.renderer.setStyle(this.starsActive.nativeElement, 'width', `${this.productGrade / 0.05}%`);
  }

  onAddToBasket() {
    this.basketService.onAddToBasket(this.product.id);
    // let user: boolean = false;
    // this.store.select('auth').pipe(take(1)).subscribe(state => {
    //   if (state.user) {
    //     user = true;
    //   }
    // });

    // if (user) {
    //   let alreadyInBasket: boolean = false;
    //   this.store.select('products').pipe(take(1)).subscribe(state => {
    //     state.basket.filter(product => {
    //       if (product.productId === this.product.id) {
    //         alreadyInBasket = true;
    //         return;
    //       }
    //     });
    //   });
    //   if (alreadyInBasket) return;

    //   this.store.dispatch(new ProductsActions.AddToBasket({
    //     productId: this.product.id, count: 1, userMail: this.userMail
    //   }));
    // } else {
    //   this.store.dispatch(new AuthActions.TryToLogin(true));
    // }
  }
}
