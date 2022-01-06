import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Product } from '../product.model';
import { Comment } from '../comment.model';
import { Subscription } from 'rxjs';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from '../products-store/products.actions';
import * as AuthActions from 'src/app/auth/auth-store/auth.actions';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private renderer: Renderer2,
    private store: Store<fromAppReducer.AppState>
  ) { }

  product: Product;
  @ViewChild('starsActive') starsActive: ElementRef;
  productsSub: Subscription;
  productGrade: number;
  commentForm: boolean = false;
  index: number;
  userMail: string;
  alreadyInBasket: boolean = false;
  needAuthorization: boolean = false;

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      const id = +params['id'];

      this.productsSub = this.store.select('products').subscribe(state => {
        this.index = state.products.findIndex(product => {
          return product.id === id;
        });
        this.product = state.products[this.index];
        this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;
      });
    });

    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        this.userMail = state.user.email;
      }
    });
  }

  ngAfterViewInit() {
    this.setStarsValue(this.starsActive, this.productGrade);
  }

  ngOnDestroy(): void {
    this.unsubscriber(this.productsSub);
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
    let user = this.checkUser();

    if (!user) {
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
    let user = this.checkUser();

    if (user) {
      let alreadyInBasket: boolean = false;
      this.store.select('products').pipe(take(1)).subscribe(state => {
        state.basket.find(product => {
          if (product.productId === this.product.id) {
            alreadyInBasket = true;
            return;
          }
        });
      });

      if (alreadyInBasket) {
        if (this.alreadyInBasket) return;
        this.alreadyInBasket = true;
        setTimeout(() => {
          this.alreadyInBasket = false;
        }, 2000);
        return;
      };

      this.store.dispatch(new ProductsActions.AddToBasket({
        productId: this.product.id, count: 1, userMail: this.userMail
      }));
    } else {
      this.store.dispatch(new AuthActions.TryToLogin(true));
    }
  }

  checkUser() {
    let user: boolean = false;
    this.store.select('auth').pipe(take(1)).subscribe(state => {
      if (state.user) {
        user = true;
      }
    });
    return user;
  }
}
