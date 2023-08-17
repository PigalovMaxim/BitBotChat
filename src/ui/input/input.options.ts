import { ComponentProps } from "react"

export type InputProps = Omit<ComponentProps<'input'>, 'onChange'> & {
  onChange?: (text: string) => void
}
