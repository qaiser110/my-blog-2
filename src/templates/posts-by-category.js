import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import PostListing from '../components/PostListing'
import config from '../data/SiteConfig'
import { catInfo } from '../data'

export default class CategoryTemplate extends React.Component {
  render() {
    const category = this.props.pageContext.category
    return (
      <section className="section">
        <Helmet title={`${catInfo[category]} articles | ${config.siteTitle}`} />
        <div className="container">
          <div className="content">
            <h1 className="title">Articles in "{catInfo[category]}"</h1>
            {this.props.data.allMarkdownRemark.edges.map(({ node }, key) => (
              <PostListing key={key} post={node} />
            ))}
          </div>
          <h4>
            <Link to="/categories">View all categories</Link>
          </h4>
        </div>
      </section>
    )
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query PostsByCategoryPage($category: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { category: { eq: $category }, draft: { ne: true } }
      }
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
