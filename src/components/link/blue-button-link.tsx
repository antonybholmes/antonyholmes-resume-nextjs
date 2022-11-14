import ILinkProps from "../../interfaces/link-props"
import cn from "../../lib/class-names"
import PillButtonLink from "./pill-button-link"

export const BLUE_BUTTON_CLASSES =
  "bg-blue-500 hover:bg-blue-600 text-white font-medium"

export default function BlueButtonLink({
  href,
  ariaLabel,
  underline,
  className,
  children,
}: ILinkProps) {
  return (
    <PillButtonLink
      href={href}
      ariaLabel={ariaLabel}
      className={cn(BLUE_BUTTON_CLASSES, className)}
      underline={underline}
    >
      {children}
    </PillButtonLink>
  )
}
