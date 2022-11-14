import React, { ReactNode } from "react"
import cn from "../lib/class-names"

type RowProps = {
  isCentered?: boolean
  isVCentered?: boolean
  wrap?: boolean
  onClick?: any
  className?: string
  style?: any
  onMouseEnter?: any
  onMouseLeave?: any
  children?: ReactNode
}

const Row = ({
  isCentered = false,
  isVCentered = false,
  wrap = false,
  onClick,
  className,
  style,
  onMouseEnter,
  onMouseLeave,
  children,
}: RowProps) => {
  const baseClass = cn(
    `flex flex-row`,
    [isCentered, "justify-center"],
    [isVCentered, "items-center"],
    [wrap, "flex-wrap"]
  )

  return (
    <div
      className={`${baseClass} ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

export default Row
