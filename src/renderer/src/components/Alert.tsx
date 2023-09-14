import Conditional from "./Conditional"

export default function Alert (props): JSX.Element {
  
  let {
    children,
    className,
    ...otherProps
  } = props

  if (!Array.isArray(children)) {
    return (
      <div className={`flex items-center justify-between ${className}`} {...otherProps}>
        { children.props.slot == 'text' ? children : null }
      </div>
    )
  }

  let icon = children.filter((child: any) => child.props.slot == 'icon')[0]
  let buttons = children.filter((child: any) => child.props.slot == 'button')
  let text = children.filter((child: any) => child.props.slot == 'text')[0]

  return (
    <div className={`flex items-center justify-between ${className}`} {...otherProps}>
      <Conditional>
        
        <div slot="if" condition={icon && text} className="flex items-ceter justify-start">
          { icon }
          { text }
        </div>

        <div slot="elseif" condition={text} className="flex items-ceter justify-start">
          { text }
        </div>

        
        <div slot="if" condition={Boolean(buttons)} className="alert-buttons">{
          buttons.map((button: any) => button)
        }</div>

      </Conditional>
    </div>
  )
}