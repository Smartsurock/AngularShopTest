import { animate, style, transition, trigger } from "@angular/animations";

export const appAnimation = [
  trigger('catalog', [
    transition('void => *', [
      style({
        transform: 'translateX(-100%)',
      }),
      animate(500, style({
        transform: 'translateX(0)',
      }))
    ]),
    transition('* => void', [
      style({
        transform: 'translateX(0)',
      }),
      animate(500, style({
        transform: 'translateX(-100%)',
      }))
    ]),
  ])
]