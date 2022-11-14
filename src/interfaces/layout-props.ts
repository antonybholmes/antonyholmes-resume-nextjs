import IChildrenProps from "./children-props"
import IFieldMap from "./field-map"

export default interface ILayoutProps extends IChildrenProps {
  title: string
  showTitle?: boolean
  description?: string
  tab?: string
  isIndexed?: boolean
  headerMode?: string
  location: IFieldMap
}
