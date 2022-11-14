/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import BasePublication from "./base-publication"

type PublicationListProps = {
  publications: Array<any>
  start?: number
  showIndices?: boolean
  showLabLink?: boolean
  onPubClick?: any
  showAbstract?: boolean
}

// Space is only added to intermediate elements of the list so that
// wasted space at the bottom is removed

const BasePublicationList = ({
  publications,
  start = 0,
  showIndices,
  showLabLink,
  showAbstract,
  onPubClick,
}: PublicationListProps) => (
  <ul>
    {publications.map((publication: any, index: number) => (
      <li
        className={` ${index < publications.length - 1 ? "mb-2" : ""}`}
        key={start + index}
      >
        {/* <FlatCard autoHide={false}> */}
        <BasePublication
          publication={publication}
          index={showIndices ? start + index + 1 : -1}
          onPubClick={onPubClick}
          showAbstract={showAbstract}
        />
        {/* </FlatCard> */}
      </li>
    ))}
  </ul>
)

export default BasePublicationList
