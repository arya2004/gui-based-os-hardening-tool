import { CommonProps } from '@renderer/main'
import { useEffect, useState } from 'react'

interface SwitchProps extends CommonProps {
  checked?: boolean
  onClick?: (e: any, isChecked: boolean) => void
  barStyles?: React.CSSProperties
  knobStyles?: React.CSSProperties
  knobColor?: string
  knobSize?: number
  barColor?: string
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
    ...otherProps
  } = props

  useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const onClickHandler = (e: any) => {
    setIsChecked(!isChecked)
    onClick(e, isChecked)
  }

  return (
    <div
      className={`relative w-10 cursor-pointer ${className}`}
      onClick={onClickHandler}
      {...otherProps}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-3 rounded bg-gray-300`}
        style={{...barStyles, background: barColor}}
      ></div>
      <div
        className={`absolute top-1/2 ${
          isChecked ? 'left-0' : 'left-full'
        } transition-all -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary`}
        style={{...knobStyles, background: knobColor, width: `${knobSize / 4}rem`, height: `${knobSize / 4}rem`}}
      ></div>
    </div>
  )
}
