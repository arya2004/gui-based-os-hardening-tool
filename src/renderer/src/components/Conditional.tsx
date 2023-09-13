// @ts-nocheck
export default function Conditional ({ children }): JSX.Element {
  
  if (Array.isArray(children)) {

    let ifs = children.filter(child => child.props.slot == 'if')[0]
    let elseifs = children.filter(child => child.props.slot == 'elseif')
    let firstElseIf = elseifs.find(el => el.props['data-condition'])
    let elses = children.filter(child => child.props.slot == 'else')[0]
    return (
      <>{
        ifs.props['data-condition'] ? ifs : firstElseIf ? firstElseIf : elses
      }</>
    )
  }
  else {
    return (
      children.props['data-condition'] ? children : null
    )
  }

}