import IPageFields from "./page-fields"

export default interface IPage {
  slug: string
  frontmatter: IPageFields
  html: string
}
