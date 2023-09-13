import { FontAwesomeIconProps, FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export interface IconProps extends FontAwesomeIconProps {}

export default function Icon(props: FontAwesomeIconProps): JSX.Element {
  return (
    <FontAwesomeIcon {...props} />
  )
}