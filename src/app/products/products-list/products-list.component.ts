import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Product } from '../products-models/product.model';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private store: Store<fromAppReducer.AppState>,
  ) { }

  products: Product[];
  fromCategory: Product[];
  paramsSub: Subscription;
  queryParamsSub: Subscription;
  category: string;

  fabricators = [];
  sorts = [];
  select: string = 'default';

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      this.category = params['category'];
      this.updateProductsList();
    });

    this.queryParamsSub = this.route.queryParams.subscribe((params: Params) => {
      const fabricator = params['fabricator'];
      const sort = params['sort'];

      if (fabricator || sort) {
        this.filterProductsList(fabricator, sort);
      } else {
        this.updateProductsList();
      }

      const sorting = params['sorting'];

      if (sorting) {
        this.select = sorting;
        this.sortingProducts(sorting);
      } else {
        this.select = 'default';
      }
    });
  }

  filterProductsList(fabricator?, sort?) {
    if (fabricator) {
      this.products = this.fromCategory.filter(product => {
        let temp = false;
        fabricator.split(',').forEach(el => {
          if (product.filters['fabricator'] === el) {
            let index = this.fabricators.findIndex(item => {
              return item.fabricator === el;
            });
            this.fabricators[index].checked = true;
            temp = true;
          }
        });
        return temp;
      });
    }
    if (sort) {
      this.products = this.fromCategory.filter(product => {
        let temp = false;
        sort.split(',').forEach(el => {
          if (product.filters['sort'] === el) {
            let index = this.sorts.findIndex(item => {
              return item.sort === el;
            });
            this.sorts[index].checked = true;
            temp = true;
          }
        });
        return temp;
      });
    }
    if (fabricator && sort) {
      this.products = this.fromCategory.filter(product => {
        let temp = false;
        fabricator.split(',').forEach(el => {
          if (product.filters['fabricator'] === el) {
            let index = this.fabricators.findIndex(item => {
              return item.fabricator === el;
            });
            this.fabricators[index].checked = true;
            temp = true;
          }
        });
        return temp;
      });

      this.products = this.products.filter(product => {
        let temp = false;
        sort.split(',').forEach(el => {
          if (product.filters['sort'] === el) {
            let index = this.sorts.findIndex(item => {
              return item.sort === el;
            });
            this.sorts[index].checked = true;
            temp = true;
          }
        });
        return temp;
      });
    }
  }

  updateProductsList() {
    this.store.select('products').pipe(take(1)).subscribe(state => {
      this.products = state.products.filter(product => {
        return product.category === this.category;
      });
      this.fromCategory = this.products;
    });

    this.fillFilters();
  }

  fillFilters() {
    this.fabricators = [];
    this.sorts = [];
    this.products.forEach(product => {
      if (product.filters.fabricator) {
        if (!this.fabricators.includes(JSON.stringify({
          checked: false,
          fabricator: product.filters.fabricator,
        }))) {
          this.fabricators.push(JSON.stringify({
            checked: false,
            fabricator: product.filters.fabricator,
          }));
        }
      }
      if (product.filters.sort) {
        if (!this.sorts.includes(JSON.stringify({
          checked: false,
          sort: product.filters.sort,
        }))) {
          this.sorts.push(JSON.stringify({
            checked: false,
            sort: product.filters.sort,
          }));
        }
      }
    });

    this.fabricators = this.fabricators.map(el => {
      return JSON.parse(el);
    });
    this.sorts = this.sorts.map(el => {
      return JSON.parse(el);
    });
  }

  sortingProducts(value: string) {
    switch (value) {
      case 'lowPrice':
        this.products.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case 'highPrice':
        this.products.sort((a, b) => {
          return b.price - a.price;
        });
        break;
      case 'rating':
        this.products.sort((a, b) => {
          return b.stars.reduce(((a, b) => a + b), 0) / b.stars.length - a.stars.reduce(((a, b) => a + b), 0) / a.stars.length;
        });
        break;

      default: return;
    }
  }

  ngOnDestroy() {
    this.unsubscriber(this.paramsSub);
    this.unsubscriber(this.queryParamsSub);
  }

  unsubscriber(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
