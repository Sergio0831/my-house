import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

export const slideInOut = trigger('slideInOut', [
  state('closed', style({ transform: 'translate3d(100%, 0, 0)' })),
  state('open', style({ transform: 'translate3d(0, 0, 0)' })),
  transition(':enter', [animate('.3s ease-in-out')]),
  transition(':leave', [animate('.3s ease-in-out')]),
]);
