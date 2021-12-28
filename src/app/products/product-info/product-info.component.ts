import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
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
    private productsService: ProductsService,
    private renderer: Renderer2) { }

  product: Product;
  @ViewChild('starsActive') starsActive: ElementRef;
  @ViewChild('starsValue') starsValue: ElementRef;
  @ViewChild('rating') rating: ElementRef;

  productGrade: number;
  commentForm: boolean = false;

  ngOnInit() {
    this.route.params.pipe(take(1)).subscribe((params: Params) => {
      const id = +params['id'];
      this.product = this.productsService.getProduct(id)[0];
    });

    this.productGrade = this.product.stars.reduce((a, b) => a + b) / this.product.stars.length;
  }

  ngAfterViewInit() {
    this.setStarsValue(this.starsActive, this.productGrade);
  }

  setStarsValue(active, grade) {
    this.renderer.setStyle(active.nativeElement, 'width', `${grade / 0.05}%`);
  }

  onAddComment() {
    this.commentForm = !this.commentForm;
  }
}
