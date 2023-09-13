import { AriaAttributes, DOMAttributes } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    condition?: boolean
  }
}

declare module '@fortawesome/react-fontawesome' {
  interface FontAwesomeIconProps {
    slot?: string
    condition?: Boolean
  }
}