import Conditional from "./Conditional"
import { cloneElement } from "react"
import { ClassNameProp } from "@renderer/main"

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>,ClassNameProp {
  text?: string,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
  icon?: any,
  iconPosition?: 'left' | 'right',
}

export default function Button (props: ButtonProps): JSX.Element {

  // Setup some defaults for the props which control button appearance
  // otherProps may contain eventListeners, etc.
  let {
    className = '',
    iconPosition = 'left',
    style = {},
    icon = null,
    ...otherProps
  } = props

  // Classnames specified on the Button component override the default classnames
  return (
      <button {...otherProps} style={style} className={`text-xl px-4 py-2 bg-primary rounded ${className}`}>
          <Conditional>

            {
              // If icon is specified, clone it and add it to the button
              // cloneElement is needed because we need to add a slot and condition prop to the icon
              icon ? cloneElement(icon, { slot: "if", condition: icon && iconPosition == 'left', className: props.text ? 'mr-2' : '' }) : null
            }
            
            <span slot="if" condition={Boolean(props.text)}>{props.text}</span>
            
            { icon ?
              cloneElement(icon, { slot: "if", condition: icon && iconPosition == 'right', className: props.text ? 'ml-2' : '' }) : null
            }

          </Conditional>
        </button>
        
  )
}