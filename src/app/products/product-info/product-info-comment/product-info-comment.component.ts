import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Comment } from '../../products-models/comment.model';

@Component({
  selector: 'app-product-info-comment',
  templateUrl: './product-info-comment.component.html',
  styleUrls: ['./product-info-comment.component.scss']
})
export class ProductInfoCommentComponent implements OnInit, AfterViewInit {
  constructor(private renderer: Renderer2) { }

  @Input() comment: Comment;
  @ViewChild('starsActive') starsActive: ElementRef;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.setStarsValue();
  }

  setStarsValue() {
    this.renderer.setStyle(this.starsActive.nativeElement, 'width', `${this.comment.rating * 20}%`);
  }
}
