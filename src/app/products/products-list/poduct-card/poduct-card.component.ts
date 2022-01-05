import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from '../../products-store/products.actions';
import { take } from 'rxjs/operators';
import * as AuthActions from 'src/app/auth/auth-store/auth.actions';

@Component({
  selector: 'app-poduct-card',
  templateUrl: './poduct-card.component.html',
  styleUrls: ['./poduct-card.component.scss']
})
export class PoductCardComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private renderer: Renderer2,
  ) { }

  @ViewChild('starsActive') starsActive: ElementRef;

  @Input() product: Product;
  @Input() userMail: string;
  productGrade: number;
  index: number;

  ngOnInit() {
    this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;

    this.store.select('products').pipe(take(1)).subscribe(state => {
      this.index = state.products.findIndex(product => {
        return product.id === this.product.id;
      });
    });
  }

  ngAfterViewInit() {
    this.setStarsValue();
  }

  setStarsValue() {
    this.renderer.setStyle(this.starsActive.nativeElement, 'width', `${this.productGrade / 0.05}%`);
  }

  onAddToBasket() {
    let email: string;
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        email = state.user.email;
      }
    });
    if (email) {
      this.store.dispatch(new ProductsActions.AddToBasket({
        productId: this.product.id, count: 1, userMail: this.userMail
      }));
    } else {
      this.store.dispatch(new AuthActions.TryToLogin(true));
    }
  }
}
