import IChildrenProps from "../interfaces/children-props"
import cn from "../lib/class-names"
import Row from "./row"

interface IProps extends IChildrenProps {
  date?: string
  title: string
  place: string
  color?: string
}

const Job = ({ date, title, place, className, children }: IProps) => (
  <div className={cn("flex flex-col", className)}>
    <Row className="justify-between items-center">
      <div>
        <h2 className="font-bold text-base leading-tight text-blue-600">
          {title}
        </h2>
        <Row className={cn("gap-x-2 items-center", [date !== undefined, "text-blue-400"])}>
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
