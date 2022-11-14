import { connect } from "puppeteer-core"
import React from "react"
import IChildrenProps from "../interfaces/children-props"
import cn from "../lib/class-names"
import Row from "./row"

interface IProps extends IChildrenProps {
  date?: string
  title: string
  place: string
  color?: string
}

const Job = ({ date, title, place, className, color="text-blue-600", children }: IProps) => (
  <div className={cn("flex flex-col", className)}>
    <Row className="justify-between items-center">
      <div>
        <h2 className={cn("font-bold text-base leading-tight", color)}>
          {title}
        </h2>
        <Row className={cn("gap-x-2 items-center", color)}>
          <h3 className="leading-tight">{place}</h3>
          {date && (
            <>
              <span>|</span>
              <h3 className="leading-tight">{date}</h3>
            </>
          )}
        </Row>
      </div>
      {/* <h3 className="text-base font-light leading-tight text-gray-500">{date}</h3> */}
    </Row>
    {children}
  </div>
)

export default Job
