import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[starsDirective]'
})
export class StarsDirective {
  constructor(private element: ElementRef, private renderer: Renderer2) { }

  @HostListener("mouseover", ['$event'])
  onMouseOver(event: any) {
    this.renderStarsValue(+event.target.value);
  }

  @HostListener("mouseleave", ['$event'])
  onMouseLeave() {
    const inputs: any[] = Array.from(this.element.nativeElement.children[1].children);
    let checked = 0;
    inputs.filter(input => {
      if (input.checked) {
        checked = input.value;
      }
    });
    if (checked) {
      this.renderStarsValue(checked);
    } else {
      this.renderStarsValue(0);
    }
  }

  @HostListener("click", ["$event"])
  onMouseClick(event: any) {
    console.log(event.target);

    this.renderStarsValue(+event.target.value);
  }

  private renderStarsValue(value: number) {
    this.renderer.setStyle(this.element.nativeElement.children[0], "width", `${value * 20}%`);
  }
}