import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../product.model';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-poduct-card',
  templateUrl: './poduct-card.component.html',
  styleUrls: ['./poduct-card.component.scss']
})
export class PoductCardComponent implements OnInit, AfterViewInit {
  constructor() { }

  @ViewChild('starsActive') starsActive: ElementRef;
  @ViewChild('starsValue') starsValue: ElementRef;

  @Input() product: Product;
  @Input() id: number;
  productGrade: number;

  ngOnInit() {
    this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;
  }

  ngAfterViewInit() {
    this.setStarsValue();
  }

  setStarsValue() {
    const starsValue = this.starsValue.nativeElement.innerHTML;
    this.starsActive.nativeElement.style.width = `${starsValue / 0.05}%`;
  }

}
