import { ReactNode } from "react"
import * as React from "react"

type TitleProps = {
  className?: string
  children?: ReactNode
}

const Title = ({ className, children }: TitleProps) => (
  <h5
    className={`bg-gray-100 py-2 mb-4  ${className}`}
    style={{ paddingLeft: "0.15in", paddingRight: "0.15in" }}
  >
    {children}
  </h5>
)

export default Title
