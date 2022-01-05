import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromAppReducer from 'src/app/store/app.reducer';
import { Comment } from '../../comment.model';
import * as ProductsActions from '../../products-store/products.actions';

@Component({
  selector: 'app-product-info-form',
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
  ) { }

  commentForm: FormGroup;
  @Output() cancel = new EventEmitter();

  ngOnInit() {
    this.commentForm = new FormGroup({
      rating: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  onCancel() {
    this.cancel.emit();
    this.commentForm.reset();
  }

  onSubmit() {
    if (this.commentForm.invalid) return;
    const newComment: Comment = this.commentForm.value;
    newComment.rating = +newComment.rating;
    this.cancel.emit(newComment);
    this.commentForm.reset();
  }
}
