import { ReactNode } from "react"
import cn from "../../lib/class-names"
import { BLUE_BUTTON_CLASSES } from "./blue-button-link"
import { BUTTON_CLASSES } from "./button-link"
import { ROUNDED_BUTTON_CLASSES } from "./rounded-button-link"

type ButtonProps = {
  ariaLabel: string
  onClick: any
  className?: string
  children?: ReactNode
}

export default function BlueButton({
  onClick,
  ariaLabel,
  className,
  children,
}: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(
        BUTTON_CLASSES,
        ROUNDED_BUTTON_CLASSES,
        BLUE_BUTTON_CLASSES,
        className
      )}
    >
      {children}
    </button>
  )
}
