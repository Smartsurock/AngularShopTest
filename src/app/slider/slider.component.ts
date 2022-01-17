import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromAppReducer from '../store/app.reducer';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor(
    private store: Store<fromAppReducer.AppState>,
  ) { }

  @Input() slides: string[];
  active: number = 0;
  previos: number = null;
  next: number = 1;
  hideLeft: boolean = false;
  hideRight: boolean = false;

  ngOnInit(): void {
    this.previos = this.slides.length - 1;
  }

  onNavClick(active: number) {
    this.active = active;
  }

  onLeft() {
    if (this.hideLeft || this.hideRight) return;
    this.hideLeft = true;
    // if (this.active === 0) {
    //   this.next = this.slides.length - 1;
    // } else {
    //   this.next -= 1;
    // }
    // console.log(this.next);

    setTimeout(() => {
      this.hideLeft = false;
    }, 1000);

    if (this.active === 0) {
      this.active = this.slides.length - 1;
    } else {
      this.active -= 1;
    }
  }

  onRight() {
    if (this.hideLeft || this.hideRight) return;
    this.hideRight = true;
    setTimeout(() => {
      this.hideRight = false;
    }, 1000);

    if (this.active === this.slides.length - 1) {
      this.active = 0;
    } else {
      this.active += 1;
    }
  }
}
