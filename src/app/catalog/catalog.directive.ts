import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: '[catalogDirective]'
})
export class CatalogDirective {
  constructor(private element: ElementRef) { }

  @HostListener("click", ['$event'])
  onClick(event) {
    console.log(event.target);

  }
}