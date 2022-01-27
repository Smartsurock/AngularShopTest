import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Product } from '../products-models/product.model';
import { Comment } from '../products-models/comment.model';
import { Subscription } from 'rxjs';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from '../products-store/products.actions';
import * as AuthActions from 'src/app/auth/auth-store/auth.actions';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private store: Store<fromAppReducer.AppState>,
    private basketService: BasketService,
  ) { }

  product: Product;
  @ViewChild('starsActive') starsActive: ElementRef;
  productsSub: Subscription;
  authSub: Subscription;
  basketServiceSub: Subscription;
  productGrade: number;
  commentForm: boolean = false;
  index: number;
  userMail: string;
  alreadyInBasket: number = null;
  needAuthorization: boolean = false;
  basketClick: boolean = false;

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      const id = +params['id'];

      this.productsSub = this.store.select('products').subscribe(state => {
        this.index = state.products.findIndex(product => {
          return product.id === id;
        });
        this.product = state.products[this.index];
        this.productGrade = this.product.stars.reduce(((a, b) => a + b), 0) / this.product.stars.length;
      });
    });

    this.authSub = this.store.select('auth').subscribe(state => {
      if (state.user) {
        this.userMail = state.user.email;
      } else {
        this.userMail = null;
        this.commentForm = false;
      }
    });

    this.basketServiceSub = this.basketService.basketCheck.subscribe(alreadyInBasket => {
      this.alreadyInBasket = alreadyInBasket;
    });
  }

  ngAfterViewInit() {
    this.setStarsValue(this.starsActive, this.productGrade);
  }

  ngOnDestroy(): void {
    this.unsubscriber(this.productsSub);
    this.unsubscriber(this.authSub);
    this.unsubscriber(this.basketServiceSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  setStarsValue(active: ElementRef, grade: number) {
    this.renderer.setStyle(active.nativeElement, 'width', `${grade / 0.05}%`);
  }

  onAddComment(comment?: Comment) {
    if (!this.userMail) {
      if (this.needAuthorization) return;
      this.needAuthorization = true;
      setTimeout(() => {
        this.needAuthorization = false;
      }, 2000);
      return;
    } else {
      this.commentForm = !this.commentForm;

      if (comment) {
        const newProduct: Product = JSON.parse(JSON.stringify(this.product));
        newProduct.comments.unshift(comment);
        newProduct.stars.push(+comment.rating);
        this.store.dispatch(new ProductsActions.EditProduct({
          newProduct, index: this.index
        }));

        this.setStarsValue(this.starsActive, this.productGrade);
      }
    }
  }

  onAddToBasket() {
    if (this.basketClick) return;
    this.basketClick = true;
    setTimeout(() => {
      this.basketClick = false;
    }, 2000);
    this.basketService.onAddToBasket(this.product.id, this.product.price);
  }
}
