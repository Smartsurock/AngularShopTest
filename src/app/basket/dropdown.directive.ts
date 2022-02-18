import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({ selector: '[dropdownDirective]' })
export class DropdownDirective {
  constructor(private element: ElementRef) { }

  @HostBinding('class.open') open = false;

  @HostListener('document:click', ['$event'])
  dropdownOpen(event: Event) {
    this.open = this.element.nativeElement.contains(event.target) ? !this.open : false;
  }
}