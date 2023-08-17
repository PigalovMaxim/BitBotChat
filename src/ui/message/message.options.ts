import { TransitionStatus } from "react-transition-group";

export type MessageProps = {
  text: string
  isRight: boolean
}

export const DEFAULT_MESSAGE_CLASSES = {
  transition: 'opacity 300ms ease-in-out, transform 100ms ease-in-out',
  opacity: 0,
}

export const TRANSITION_MESSAGE_CLASSES: Record<TransitionStatus, Record<string, unknown>> = {
  entering: { opacity: 1, transform: ['translateY(100%)'], },
  entered:  { opacity: 1, transform: ['translateY(0%)'] },
  exiting:  { opacity: 0, transform: ['translateY(0%)'] },
  exited:  { opacity: 0, transform: ['translateY(100%)'] },
  unmounted: { opacity: 0, transform: ['translateY(100%)'] },
};