import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-info-form',
  templateUrl: './product-info-form.component.html',
  styleUrls: ['./product-info-form.component.scss']
})
export class ProductInfoFormComponent implements OnInit {
  constructor() { }

  commentForm: FormGroup;
  @Output() cancel = new EventEmitter<boolean>();

  ngOnInit() {
    this.commentForm = new FormGroup({
      name: new FormControl(null),
      mail: new FormControl(null),
      message: new FormControl(null),
    });
  }

  onCancel() {
    this.cancel.emit();
  }
}
