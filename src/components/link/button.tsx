import cn from "../../lib/class-names"
import { BASE_BUTTON_CLASSES } from "./button-link"
import IChildrenProps from "../../interfaces/children-props"
import IAriaProps from "../../interfaces/aria-props"

export interface IButtonProps extends IChildrenProps, IAriaProps {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

export default function Button({
  onClick,
  ariaLabel,
  className,
  children,
}: IButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(BASE_BUTTON_CLASSES, className)}
    >
      {children}
    </button>
  )
}
