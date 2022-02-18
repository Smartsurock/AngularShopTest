import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({ selector: '[searchDirective]' })
export class SearchDirective {
  constructor(private element: ElementRef) { }

  toggleOpen() {
    this.element.nativeElement.parentElement.classList.toggle('open');
    setTimeout(() => {
      this.element.nativeElement.nextSibling.children[0].focus();
    }, 300);
  }

  @HostListener('document:click', ['$event'])
  dropdownOpen(event: Event) {
    if (this.element.nativeElement.nextSibling.children[0].contains(event.target)) return;

    this.element.nativeElement.contains(event.target)
      ? this.toggleOpen()
      : this.element.nativeElement.parentElement.classList.remove('open');
  }
}