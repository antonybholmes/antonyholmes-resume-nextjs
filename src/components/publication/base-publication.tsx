import React, { useRef, useState } from "react"
import BaseLink from "../link/base-link"
import BlackLink from "../link/black-link"
import Row from "../row"

const friendlyUrl = (url: string) => {
  return url
    .replace(/http[s]?/, "")
    .replace("://", "")
    .replace(/\/$/, "")
    .replace(/\//g, " > ")
}


type AbstractProps = {
  publication: any
  maxWords?: number
}

const Abstract: React.FC<AbstractProps> = ({ publication, maxWords }) => {
  const [expanded, setExpanded] = useState(false)
  const [words, setWords] = useState(publication.abstract.split(" "))

  return (
    <>
      <div className={`relative text-sm mt-2 trans-ani`}>
        <p
          className={`cursor-pointer trans-ani hover:text-columbia-button-blue ${
            expanded ? "" : "truncate"
          }`}
          onClick={() => setExpanded(!expanded)}
        >
          {publication.abstract}
        </p>

        {/* {!expanded && (
          <Row
            isCentered={true}
            className="absolute bottom-0 w-full h-full cursor-pointer hover:text-blue-500 trans-ani"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 40%, rgba(255,255,255,1) 100%)",
            }}
            onClick={() => setExpanded(true)}
          >
            <div>
              <FontAwesomeIcon icon="chevron-down" />
            </div>
          </Row>
        )} */}
      </div>

      {/* <Row
        isCentered={true}
        className="w-full cursor-pointer hover:text-blue-500 trans-ani"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <FontAwesomeIcon icon={expanded ? "chevron-up" : "chevron-down"} />
        </div>
      </Row> */}

      {/* <RightDiv className="text-sm mt-1">
        <button
          className="text-gray-500 hover:text-default-blue trans-ani"
          onClick={() => setExpanded(!expanded)}
        >{`Read ${expanded ? "less" : "more"}`}</button>
      </RightDiv> */}
    </>
  )
}


/**
 * Format author list into string.
 *
 * @param {*} authors
 * @param {int} maxAuthors
 */
const authorString = (authors: Array<any>, maxAuthors: number = 10) => {
  const strs = []

  if (authors.length <= maxAuthors || maxAuthors === -1) {
    for (const author of authors) {
      strs.push(author) //.lastName + " " + author.initials)
    }
  } else {
    for (let i = 0; i < 3; ++i) {
      strs.push(authors[i]) //.lastName + " " + authors[i].initials)
    }

    strs.push("...")

    const n = authors.length - 1
    strs.push(authors[n]) //.lastName + " " + authors[n].initials)
  }

  let ret = strs.join(", ")
  ret = ret.replace(/, ([^,]+)$/, ", and $1")

  return ret
}

type PubDataProps = {
  text: string
  data: string
  onClick: any
  className?: string
}

const PubData: React.FC<PubDataProps> = ({
  text,
  data,
  onClick,
  className,
}) => (
  <span
    className={`cursor-pointer hover:text-default-blue trans-ani ${className}`}
    onClick={() => onClick(data)}
  >
    {text}
  </span>
)

PubData.defaultProps = {
  className: "",
}

const useAuthors = (
  authors: Array<any>,
  maxAuthors: number = 10,
  onClick: any
) => {
  const ret: Array<any> = []

  if (authors.length <= maxAuthors || maxAuthors === -1) {
    authors.map((author: string, index: number) => {
      ret.push(
        <PubData
          text={author}
          data={`"${author}"[author]`}
          onClick={onClick}
          key={`author-${index}`}
        />
      )

      if (index < authors.length - 1) {
        ret.push(
          <span key={`sep-${index}`}>
            {`, ${index === authors.length - 2 ? "and " : ""}`}
          </span>
        )
      }
    })
  } else {
    for (let i = 0; i < 3; ++i) {
      ret.push(authors[i]) //.lastName + " " + authors[i].initials)
    }

    ret.push("...")

    const n = authors.length - 1
    ret.push(authors[n]) //.lastName + " " + authors[n].initials)
  }

  //let ret = ret.join(", ")
  //ret = ret.replace(/, ([^,]+)$/, ", and $1")

  return ret
}

export const pubmedUrl = (pubmed: number) => {
  return `https://pubmed.ncbi.nlm.nih.gov/${pubmed}/` //``https://www.ncbi.nlm.nih.gov/pubmed/?term=${pubmed}`
}

export const doiUrl = (doi: string) => {
  return `https://doi.org/${doi}`
}

type BasePublicationProps = {
  publication: any
  index: number
  onPubClick?: any
  showAbstract?: boolean
  showUrl?: boolean
  showCount?: boolean
}

export default function BasePublication({
  publication,
  index,
  showAbstract,
  showUrl,
  onPubClick,
  showCount = true
}: BasePublicationProps) {
  const _handleJournalClick = (journal: string) => {
    if (onPubClick !== null) {
      onPubClick(journal)
    }
  }

  const authors = publication.authors.replace(
            "Holmes AB",
            "<strong>Holmes AB</strong>"
          )

  return (
    <article className="publication flex flex-row gap-x-2">
      {showCount && (
        <div className="m-0 w-6 flex-none text-center text-sm text-gray-500">{`${
          index
        }`}</div>
      )}
      <div className="grow">
        <h2 className="text-lg font-semibold leading-none">
          <BlackLink ariaLabel="View article" href={pubmedUrl(publication.pmid)}>
              {publication.title}
            </BlackLink>
        </h2>
        <p className="text-sm mt-1" dangerouslySetInnerHTML={{
          __html: authors
        }} />
        {/* <p className="text-sm font-light capitalize text-green-600">
        {publication.journal}. {publication.year}.
      </p> */}

        {/* <ul className="mt-1 flex flex-row flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
          {links.map(link => link)}
        </ul> */}

        <p className="text-sm text-emerald-600">
          {publication.journal}. {publication.year}.
        </p>
        {showAbstract && publication.abstract !== "" && (
          <Abstract publication={publication}  />
        )}
      </div>
    </article>
  )

  

}