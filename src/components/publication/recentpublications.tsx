/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect, useState } from "react"
//import Button from "../../components/button"
//import PublicationYears from "./publicationyears"
import BasePublicationList from "./basepublicationlist"
import Row from "../row"

import NoResults from "../noresults"

type RecentPublicationsProps = {
  publications: Array<any>
  showAbstract?: boolean
  start?: number
  top?: number
  showCount?: boolean
  showMoreButton?: boolean
  showIndices?: boolean
  className?: string
  baseMode?: boolean
  onPubClick?: any
  onShowMoreClick?: any
  recordsPerPage?: any
}

const RecentPublications = ({
  publications,
  showAbstract,
  start = 0,
  showCount,
  recordsPerPage,
  className,
  onPubClick,
  onShowMoreClick,
  showIndices,
}: RecentPublicationsProps) => {
  const [filteredPublications, setFilteredPublications] = useState<Array<any>>(
    []
  )

  useEffect(() => {
    updatePublications()
  }, [])

  useEffect(() => {
    updatePublications()
  }, [publications])

  useEffect(() => {
    updatePublications()
  }, [recordsPerPage])

  const updatePublications = () => {
    setFilteredPublications(publications.slice(start, start + recordsPerPage))
  }

  return (
    <>
      {publications.length > 0 && showCount && (
        <Row isVCentered={true} className="justify-between mb-8">
          <div>
            {/* {`Showing ${Math.min(
              filteredPublications.length,
              recordsPerPage
            )} of ${publications.length} ${
              filteredPublications.length > 1 ? "publications" : "publication"
            }`} */}

            {`${publications.length} ${
              publications.length !== 1 ? "results" : "result"
            }`}
          </div>
        </Row>
      )}

      <div className={`${className}`}>
        {filteredPublications.length > 0 ? (
          <BasePublicationList
            start={start}
            publications={filteredPublications}
            showAbstract={showAbstract}
            onPubClick={onPubClick}
            showIndices={showIndices}
          />
        ) : (
          <NoResults text="No publications found." />
        )}
      </div>
    </>
  )
}

export default RecentPublications
