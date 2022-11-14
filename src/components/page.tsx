import React from "react"
import IChildrenProps from "../interfaces/children-props"
import cn from "../lib/class-names"

const Page = ({ className, style, children }: IChildrenProps) => (
  <div
    className={cn("h-screen page border border-white", className)}
    style={style}
  >
    {children}
  </div>
)

export default Page
