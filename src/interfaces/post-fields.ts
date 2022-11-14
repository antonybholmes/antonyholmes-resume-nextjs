import IBaseFields from "./base-fields"

export default interface IPostFields extends IBaseFields {
  index: number
  title: string
  description: string
  hero: string
  heroCaption: string
  readTime: string
  authors: string[]
  section: string
  related: string[]
  draft: boolean
  tags: string[]
}
