import { CommonProps } from '@renderer/main'
import { cloneElement, useEffect, useState } from 'react'
import Conditional from './Conditional'

interface SwitchProps extends CommonProps {
  checked?: boolean
  onClick?: (e: any, isChecked: boolean) => void
  barStyles?: React.CSSProperties
  knobStyles?: React.CSSProperties
  knobColor?: string
  knobSize?: number
  barColor?: string
  icon?: any
  style: React.CSSProperties
}

export default function Switch(props: SwitchProps): JSX.Element {
  const [isChecked, setIsChecked] = useState(false)

  const {
    checked = false,
    onClick = () => {},
    barStyles = {},
    knobStyles = {},
    className = '',
    knobColor = 'primary',
    knobSize = 7,
    barColor = 'gray-400',
    icon = null,
    style = {},
    ...otherProps
  } = props

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const onClickHandler = (e: any) => {
    onClick(e, isChecked)
    setIsChecked(!isChecked)
  }



  return (
    <div
      className={`relative w-10 cursor-pointer ${className}`}
      onClick={onClickHandler}
      {...otherProps}
      style={style}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3 rounded bg-gray-300`}
        style={{...barStyles, background: barColor}}
      ></div>
      <div
        className={`absolute top-1/2 ${
          isChecked ? 'left-0' : 'left-full'
        } transition-all -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary flex items-center justify-center`}
        style={{...knobStyles, background: knobColor, width: `${knobSize / 4}rem`, height: `${knobSize / 4}rem`}}
      >
          {icon || null}
      </div>
    </div>
  )
}
