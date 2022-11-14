import cn from "../../lib/class-names"
import ILinkProps from "../../interfaces/link-props"
import PillButtonLink from "./pill-button-link"

export const SECONDARY_BUTTON_CLASSES =
  "!border-gray-300 hover:!border-gray-400 bg-white font-medium"

function SecondaryButtonLink({
  href,
  ariaLabel,
  className,
  onHover,
  children,
}: ILinkProps) {
  return (
    <PillButtonLink
      href={href}
      ariaLabel={ariaLabel}
      onHover={onHover}
      className={cn(SECONDARY_BUTTON_CLASSES, className)}
    >
      {children}
    </PillButtonLink>
  )
}

export default SecondaryButtonLink

//font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
