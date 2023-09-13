import Conditional from "./Conditional"
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'


interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
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

  // Element must be a function since icon is a variable
  const Element = (elProps: any) => icon

  // Classnames specified on the Button component override the default classnames
  return (
      <button {...otherProps} style={style} className={'text-xl px-4 py-2 bg-primary rounded' + className}>
          <Conditional>

            <Element slot="if" condition={icon && iconPosition == 'left'} className={props.text ? 'mr-2' : ''} />
            
            <span slot="if" condition={Boolean(props.text)}>{props.text}</span>
          
            <Element slot="if" condition={icon && iconPosition == 'right'}  className={props.text ? 'ml-2' : ''}/>

          </Conditional>
        </button>
        
  )
}