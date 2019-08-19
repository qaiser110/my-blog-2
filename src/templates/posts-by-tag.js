import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import PostListing from '../components/PostListing'
import config from '../data/SiteConfig'
import { tagInfo } from '../data'

export default class CategoryTemplate extends React.Component {
  render() {
    const { tag } = this.props.pageContext
    return (
      <section className="section">
        <Helmet
          title={`Articles tagged "${tagInfo[tag]
            .title}" | ${config.siteTitle}`}
        />
        <div className="container">
          <div className="content">
            <h1 className="title">Posts tagged "{tagInfo[tag].title}"</h1>
            {this.props.data.allMarkdownRemark.edges.map(({ node }, key) => (
              <PostListing key={key} post={node} showCat />
            ))}
            <div>
              <Link to="/categories">View all tags</Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query PostsByTagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          timeToRead
          frontmatter {
            path
            title
            description
            date(formatString: "MMMM DD, YYYY")
            cover
            category
            tags
          }
        }
      }
    }
  }
`
