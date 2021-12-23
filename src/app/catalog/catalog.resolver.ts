import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ProductsService } from "../products/products.service";

@Injectable({ providedIn: 'root' })
export class CatalogResolver implements Resolve<any> {
  constructor(private productsService: ProductsService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let cat = route.params
    let st = state.url.slice(1);
    return console.log(st);


    // return this.productsService.filterProducts(st)
  }
}