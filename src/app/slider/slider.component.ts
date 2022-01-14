import { ChangeDetectionStrategy, Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { SliderOptions } from './slider.model';

// import { ResponsiveFacade } from '@medium-stories/responsive';
import { interval, Observable, Subject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { startWith, switchMap, tap } from 'rxjs/operators';

const OPTIONS_DEFAULT: SliderOptions = {
  slides: [],
  active: 0,
  hide: null,
  interval: 6000,
  indicators: true
};

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit {
  constructor(
    // public responsiveFacade: ResponsiveFacade,
    /* tslint:disable-next-line:ban-types */
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
  }

  options: SliderOptions | null = null;

  watch$!: Observable<number>;

  changeSlide$ = new Subject<number>();

  @Input() set config(options: Partial<SliderOptions>) {
    this.options = { ...OPTIONS_DEFAULT, ...options };
    if (isPlatformBrowser(this.platformId)) {
      this.watch$ = this.changeSlide$.pipe(
        startWith(-1),
        switchMap(index => {
          if (index >= 0) {
            this.options.hide = this.options.active;
            this.options.active = index;
          }
          return interval(this.options.interval).pipe(
            tap(() => {
              if (!window.document.hidden) {
                if (this.options.active + 1 === this.options.slides.length) {
                  this.options.hide = this.options.slides.length - 1;
                  this.options.active = 0;
                } else {
                  this.options.hide = this.options.active;
                  this.options.active++;
                }
              }
            })
          );
        })
      );
    }
  }

  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      const anchor = window.document.getElementById(this.options.scrollAnchor);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
