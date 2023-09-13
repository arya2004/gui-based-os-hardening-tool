import { useState } from "react"
import Conditional from "./Conditional"

interface ButtonProps {
  text?: string,
  icon?: string | null,
  iconPosition?: 'left' | 'right',
  onClick?:  React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

export default function Button (props: ButtonProps) : JSX.Element {
  
  const [number, setNumber] = useState(0)

  // others is a catch-all for event handlers, etc.
  // event handler still must be clared in ButtonProps
  const { className = '', text = '', icon = null, iconPosition = 'left', ...others } = props
  
  return (
    <Conditional>
      <button slot="if" data-condition={number == 0} onClick={() => setNumber(11)}>Hello if</button>
    </Conditional>
  )
}