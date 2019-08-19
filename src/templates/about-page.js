import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Content, { HTMLContent } from '../components/Content'
import config from '../data/SiteConfig'

export const AboutPageTemplate = ({ title, content, contentComponent }) => {
  const PageContent = contentComponent || Content

  return (
    <section className="section">
      <Helmet title={`About me | ${config.siteTitle}`} />
      <div className="container">
        <h2 className="title">{title}</h2>
        <PageContent className="content" content={content} />
      </div>
    </section>
  )
}

export default ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <AboutPageTemplate
      contentComponent={HTMLContent}
      title={post.frontmatter.title}
      content={post.html}
    />
  )
}

export const aboutPageQuery = graphql`
  query AboutPage($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`
