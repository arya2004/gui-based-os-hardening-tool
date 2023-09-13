import { AriaAttributes, DOMAttributes } from 'react'

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    slot?: string
    condition?: any
  }
}

declare module '@fortawesome/react-fontawesome' {
  interface FontAwesomeIconProps {
    slot?: string
    condition?: any
  }
}

