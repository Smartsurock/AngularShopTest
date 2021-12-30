import { Injectable } from "@angular/core";
import { Comment } from "./comment.model";
import { Product } from "./product.model";
import * as fromAppReducer from 'src/app/store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor() { }

  products: Product[] = [];
  categories: string[] = [];

  getCategories() {

  }

  getFilteredProducts(category: string) {
    return this.products.filter(product => {
      return product.category === category;
    });
  }

  getProduct(id: number) {
    return this.products.filter(product => {
      return product.id === id;
    });
  }
}