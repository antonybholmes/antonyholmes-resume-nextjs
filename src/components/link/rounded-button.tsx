import cn from "../../lib/class-names"
import { ROUNDED_BUTTON_CLASSES } from "./rounded-button-link"
import Button, { IButtonProps } from "./button"

function RoundedButton({
  onClick,
  ariaLabel,
  className,
  children,
}: IButtonProps) {
  return (
    <Button
      onClick={onClick}
      ariaLabel={ariaLabel}
      className={cn(ROUNDED_BUTTON_CLASSES, className)}
    >
      {children}
    </Button>
  )
}

export default RoundedButton

//font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
