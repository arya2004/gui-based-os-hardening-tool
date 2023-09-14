import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CommonProps } from '@renderer/main'

export interface IconProps extends FontAwesomeIconProps, CommonProps {
}

export default function Icon(props: IconProps): JSX.Element {
  return (
    <FontAwesomeIcon {...props} />
  )
}