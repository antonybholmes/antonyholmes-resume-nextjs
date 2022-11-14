/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { SITE_NAME } from "../constants"
import IChildrenProps from "../interfaces/children-props"

interface IProps extends IChildrenProps {
  title: string
  description?: string
  lang?: string
  isIndexed?: boolean
}

export default function Seo({
  title,
  description,
  lang = "en",
  isIndexed = true,
  children,
}: IProps) {
  const metaDescription = description ? description : `${title} page` //SITE_DESCRIPTION
  const metaTitle = `${title} - ${SITE_NAME}`

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
      {/* <meta
         name="twitter:creator"
         content={site.siteMetadata?.social?.twitter || ``}
       /> */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={metaDescription} />

      {!isIndexed && (
        <>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </>
      )}

      {children}
    </>
  )
}
