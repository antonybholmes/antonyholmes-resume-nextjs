import cn from "../../lib/class-names"
import * as React from "react"
import Button, { IButtonProps } from "./button"
import { PILL_BUTTON_CLASSES } from "./pill-button-link"

function PillButton({ onClick, ariaLabel, className, children }: IButtonProps) {
  return (
    <Button
      onClick={onClick}
      ariaLabel={ariaLabel}
      className={cn(PILL_BUTTON_CLASSES, className)}
    >
      {children}
    </Button>
  )
}

export default PillButton

//font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-md rounded px-5 py-3 trans-ani"
