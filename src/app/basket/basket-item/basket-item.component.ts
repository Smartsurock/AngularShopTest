import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/products/product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';

@Component({
  selector: 'app-basket-item',
  templateUrl: './basket-item.component.html',
  styleUrls: ['./basket-item.component.scss']
})
export class BasketItemComponent implements OnInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private router: Router,
  ) { }

  count: number = 1;
  @Input() product: Product;
  category: string;
  id: number;

  ngOnInit(): void {
  }

  routerLink() {
    this.router.navigate([`goods/${this.product.category}/${this.product.id}`])
  }

  onPlus() {
    this.count += 1;
  }

  onMinus() {
    if (this.count === 1) return;
    this.count -= 1;
  }
}
