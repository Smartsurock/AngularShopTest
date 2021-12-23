import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(private productsService: ProductsService,
    private route: ActivatedRoute) { }

  products: Product[];
  routeSub: Subscription;

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params: Params) => {
      const category = params['category'];
      this.products = this.productsService.getFilteredProducts(category);
    });
  }

  ngOnDestroy() {
    this.unsubscriber(this.routeSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
