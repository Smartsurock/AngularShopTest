import { ElementRef, Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class StarsService {
  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  private renderer: Renderer2;

  setStarsValue(active: ElementRef, grade: number) {
    this.renderer.setStyle(active.nativeElement, 'width', `${grade / 0.05}%`);
  }
}