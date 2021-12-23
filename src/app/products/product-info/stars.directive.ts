import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[rating]'
})
export class StarsDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  starsValue: number;

  @HostListener("mouseover", ['$event'])
  onMouseOver(event) {
    this.setStarsValue(+event.target.value);
  }

  @HostListener("mouseleave", ['$event'])
  onMouseLeave() {
    if (!this.element.nativeElement.classList.contains('user-selected')) {
      this.setStarsValue(0);
    } else {
      this.setStarsValue(this.starsValue);
    }
  }

  @HostListener("click", ["$event"])
  onMouseClick(event) {
    this.element.nativeElement.classList.add('user-selected');
    this.starsValue = +event.target.value;
    this.setStarsValue(this.starsValue);
  }

  private setStarsValue(value: number) {
    this.renderer.setStyle(this.element.nativeElement.children[0], "width", `${value * 20}%`);
  }
}