import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Comment } from '../../products-models/comment.model';
import { StarsService } from '../stars.service';

@Component({
  selector: 'app-product-info-comment',
  templateUrl: './product-info-comment.component.html',
  styleUrls: ['./product-info-comment.component.scss']
})
export class ProductInfoCommentComponent implements OnInit, AfterViewInit {
  constructor(private starsService: StarsService) { }

  @Input() comment: Comment;
  @ViewChild('starsActive') starsActive: ElementRef;

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.starsService.setStarsValue(this.starsActive, this.comment.rating);
  }
}
