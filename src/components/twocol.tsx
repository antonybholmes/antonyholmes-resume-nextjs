import React, { ReactElement } from "react"
import IChildProps from "../interfaces/child-props"
import cn from "../lib/class-names"

const TwoCol = ({ className, children }: IChildProps) => (
  <div className={cn("grid grid-cols-3 gap-x-8 px-8", className)}>
    <div className="col-span-1">{children[0]}</div>
    <div className="col-span-2">{children[1]}</div>
  </div>
)

export default TwoCol
