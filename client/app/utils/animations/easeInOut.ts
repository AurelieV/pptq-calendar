import {
  trigger,
  state,
  style,
  transition,
  animate,
  AnimationEntryMetadata
} from "@angular/core";

export function easeInOut(name: string = 'easeInOut', time: string = '100ms') {
  return trigger(name, [
    state('in', style({ opacity: 1 })),
    transition('void => in', [
      style({ opacity: 0 }),
      animate(time)
    ]),
    transition('in => void', [
      animate(time, style({ opacity: 0 }))
    ])
  ])
}
