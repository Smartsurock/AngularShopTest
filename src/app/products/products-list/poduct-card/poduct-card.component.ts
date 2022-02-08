import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../products-models/product.model';
import { take } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { StarsService } from '../../product-info/stars.service';

@Component({
  selector: 'app-poduct-card',
  templateUrl: './poduct-card.component.html',
  styleUrls: ['./poduct-card.component.scss']
})
export class PoductCardComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private basketService: BasketService,
    private router: Router,
    private starsService: StarsService,
  ) { }

  @ViewChild('starsActive') starsActive: ElementRef;

  @Input() product: Product;
  productGrade: number;
  index: number;
  alreadyInBasket: number = null;
  basketServiceSub: Subscription;

  ngOnInit() {
    this.productGrade = this.product.stars.reduce(((a, b) => a + b), 0) / this.product.stars.length;

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
    this.starsService.setStarsValue(this.starsActive, this.productGrade);
  }

  ngOnDestroy(): void {
    if (this.basketServiceSub) {
      this.basketServiceSub.unsubscribe();
    }
  }

  onAddToBasket() {
    this.basketService.onAddToBasket(this.product.id, this.product.price);
  }

  onProductNavigate() {
    this.router.navigate([`goods/${this.product.category}/${this.product.id}`]);
  }
}
