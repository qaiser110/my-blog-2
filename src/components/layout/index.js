/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Footer from './footer'
import { rhythm } from '../../utils/typography'

import Header from "./header"
import "./index.css"

const Index = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div
        style={{
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          maxWidth: rhythm(24),
          margin: `0 auto`,
          paddingTop: `80px`,
        }}
      >
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Index.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Index
