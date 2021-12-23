import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  constructor(private productsService: ProductsService) { }

  categories: string[] = [];
  @Output() catalog = new EventEmitter<boolean>();

  ngOnInit() {
    this.categories = this.productsService.getCategories();
  }

  onCategory() {
    setTimeout(() => this.catalog.emit(), 50);
  }
}
