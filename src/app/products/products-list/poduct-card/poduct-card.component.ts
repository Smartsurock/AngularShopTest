import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../../product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import * as ProductsActions from '../../products-store/products.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-poduct-card',
  templateUrl: './poduct-card.component.html',
  styleUrls: ['./poduct-card.component.scss']
})
export class PoductCardComponent implements OnInit, AfterViewInit {
  constructor(
    private store: Store<fromAppReducer.AppState>
  ) { }

  @ViewChild('starsActive') starsActive: ElementRef;
  @ViewChild('starsValue') starsValue: ElementRef;

  @Input() product: Product;
  @Input() id: number;
  productGrade: number;
  index: number;

  ngOnInit() {
    this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;

    this.store.select('products').pipe(take(1)).subscribe(state => {
      this.index = state.products.findIndex(product => {
        return product.id === this.id;
      });
    });
  }

  ngAfterViewInit() {
    this.setStarsValue();
  }

  setStarsValue() {
    const starsValue = this.starsValue.nativeElement.innerHTML;
    this.starsActive.nativeElement.style.width = `${starsValue / 0.05}%`;
  }

  onAddToBasket() {
    this.store.dispatch(new ProductsActions.AddToBasket(this.index));
  }
}
