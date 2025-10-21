import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger
} from '@angular/animations';

export const routeTransitionAnimation = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', [style({ position: 'fixed', width: '100%' })], {
      optional: true
    }),
    group([
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'translateY(0)' }),
          animate('250ms ease', style({ opacity: 0, transform: 'translateY(1rem)' }))
        ],
        { optional: true }
      ),
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateY(-1rem)' }),
          animate('350ms 120ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          animateChild()
        ],
        { optional: true }
      )
    ])
  ])
]);
