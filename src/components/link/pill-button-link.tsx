import ILinkProps from "../../interfaces/link-props"
import cn from "../../lib/class-names"
import ButtonLink from "./button-link"

export const PILL_BUTTON_CLASSES = `rounded-full overflow-hidden px-4 py-2`

export default function PillButtonLink({
  href,
  ariaLabel,
  underline,
  className,
  children,
}: ILinkProps) {
  return (
    <ButtonLink
      href={href}
      ariaLabel={ariaLabel}
      underline={underline}
      className={cn(PILL_BUTTON_CLASSES, className)}
    >
      {children}
    </ButtonLink>
  )
}

//font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
