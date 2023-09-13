// @ts-nocheck

export default function Conditional ({ children }): JSX.Element {
  
  if (Array.isArray(children)) {
    
    let pairs = []

    const getType = (child: any) => {
      if (child) 
       return child.props.slot
    }

    for (let i = 0; i < children.length; i++) {
      let child = children[i]
      let type = getType(child)
      if (type == 'if') {
        pairs.push([child])
        if (i + 1 >= children.length) break
        for (let j = i + 1; j < children.length; j++) {
          let c = children[j]
          let t = getType(c)
          if (t == 'elseif') {
            pairs[pairs.length - 1].push(c)
            i++
          }
          else if (t == 'else') {
            pairs[pairs.length - 1].push(c)
            i++
            break
          }
        }
      }
    }

    return (
      <>{
        pairs.map(pair => {
          let ifChild = pair[0]
          let otherChildren = pair.slice(1)
          if (ifChild.props.condition) {
            return ifChild
          }
          if(otherChildren.find(c => getType(c) == 'elseif' && c.props.condition)) {
            return otherChildren.find(c => getType(c) == 'elseif' && c.props.condition)
          }
          if (getType(otherChildren[otherChildren.length - 1]) == 'else') {
            return otherChildren[otherChildren.length - 1]
          }
        })
      }</>
    )
  }
  else {
    return (
      children.props.condition ? children : null
    )
  }

}