import React from "react"

type NoResultsProps = {
  text: string
}

const NoResults: React.FC<NoResultsProps> = ({ text }) => (
  <h4 className="text-center">{text}</h4>
)

NoResults.defaultProps = {
  text: "No results.",
}

export default NoResults
