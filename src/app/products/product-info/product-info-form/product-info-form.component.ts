import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Comment } from '../../products-models/comment.model';
import * as fromAppReducer from 'src/app/store/app.reducer';

@Component({
  selector: 'app-product-info-form',
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
    private renderer: Renderer2,
  ) { }

  commentForm: FormGroup;
  @Output() cancel = new EventEmitter();
  @Input() userMail: string;
  @ViewChild('starsActive') starsActive: ElementRef;

  ngOnInit() {
    this.commentForm = new FormGroup({
      rating: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  onCancel() {
    this.cancel.emit();
    this.resetCommentForm();
  }

  onSubmit() {
    if (this.commentForm.invalid) return;
    const newComment: Comment = this.commentForm.value;
    newComment.email = this.userMail;
    newComment.rating = +newComment.rating;
    this.cancel.emit(newComment);
    this.resetCommentForm();
  }

  resetCommentForm() {
    this.commentForm.reset();
    this.renderer.setStyle(this.starsActive.nativeElement, 'width', '0%');
  }
}
