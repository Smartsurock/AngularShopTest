import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';
import * as fromAppReducer from '../store/app.reducer';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsService,
    private store: Store<fromAppReducer.AppState>,
  ) { }

  categories: string[] = [];
  @Output() catalog = new EventEmitter<boolean>();
  productsSub: Subscription;

  async ngOnInit() {
    this.productsSub = this.store.select('products').subscribe(state => {
      state.products.forEach(product => {
        if (!this.categories.includes(product.category)) {
          this.categories.push(product.category);
        }
      });
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.productsSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }

  onCategory() {
    setTimeout(() => this.catalog.emit(), 50);
  }
}
