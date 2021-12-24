import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent implements OnInit, AfterViewInit {
  constructor(private route: ActivatedRoute,
    private productsService: ProductsService) { }

  product: Product;
  @ViewChild('starsActive') starsActive: ElementRef;
  @ViewChild('starsValue') starsValue: ElementRef;

  productGrade: number;

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      const id = +params['id'];
      this.product = this.productsService.getProduct(id)[0];
    });

    this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;
  }

  ngAfterViewInit() {
    this.setStarsValue(this.starsValue, this.starsActive);
  }

  setStarsValue(value, active) {
    const starsValue = value.nativeElement.innerHTML;
    active.nativeElement.style.width = `${starsValue / 0.05}%`;
  }
}
