import Conditional from "./Conditional"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  text?: string,
  disabled?: boolean,
  className?: string,
  style?: React.CSSProperties
  icon?: any
  iconPosition?: 'left' | 'right'
}

export default function Button (props: ButtonProps): JSX.Element {

  // Setup some defaults for the props
  const classNames = props.className || ''
  const iconPosition = props.iconPosition || 'left'
  const icon = props.icon || null
  const style = props.style || {}

  // Classnames specified on the component override the default classnames
  return (
      <button {...props} style={style} className={'text-xl px-4 py-2 bg-primary rounded' + classNames}>
          <Conditional>

            <FontAwesomeIcon slot="if" condition={icon && iconPosition == 'left'} icon={icon} />
            

            <span slot="if" condition={Boolean(props.text)}>{props.text}</span>
          
            <FontAwesomeIcon slot="if" condition={icon && iconPosition == 'right'} icon={icon} />

          </Conditional>
        </button>
        
  )
}