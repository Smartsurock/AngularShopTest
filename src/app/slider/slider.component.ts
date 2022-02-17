import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor() { }

  @Input() slides: string[];
  active: number = 0;
  sliderFullScreen: boolean = false;

  ngOnInit(): void {
  }

  get navigationNeeded(): boolean {
    return this.slides.length > 1;
  }

  onNavClick(active: number) {
    this.active = active;
  }

  onLeft() {
    if (this.active === 0) {
      this.active = this.slides.length - 1;
    } else {
      this.active -= 1;
    }
  }

  onRight() {
    if (this.active === this.slides.length - 1) {
      this.active = 0;
    } else {
      this.active += 1;
    }
  }

  openSlider() {
    if (!this.sliderFullScreen) {
      this.sliderFullScreen = true;
    } else {
      this.onRight();
    }
  }

  closeSlider() {
    this.sliderFullScreen = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeSlider();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: any) {
    if (!event.target.closest('.slider__container.open')) {
      this.closeSlider();
    }
  }
}
