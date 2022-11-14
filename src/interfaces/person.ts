import IFieldMap from "./field-map"
import IPostPerson from "./post-person"

export default interface IPerson extends IPostPerson {
  titleMap: IFieldMap
  html: string
}
