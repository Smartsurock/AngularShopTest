import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../products-models/product.model';
import { take } from 'rxjs/operators';
import { BasketService } from 'src/app/basket/basket.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as fromAppReducer from 'src/app/store/app.reducer';

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
    private router: Router,
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
    this.basketService.onAddToBasket(this.product.id, this.product.price);
  }

  onProductNavigate() {
    this.router.navigate([`goods/${this.product.category}/${this.product.id}`]);
  }
}
