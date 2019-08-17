import React from 'react'
import Helmet from 'react-helmet'
import PostListing from '../components/PostListing'
// import kebabCase from "lodash/kebabCase"
import { siteTitle } from '../data/SiteConfig'
import { graphql } from 'gatsby'

class CatsPageRoute extends React.Component {
  render() {
    console.log('----this.props.data.allMarkdownRemark---')
    console.log(this.props.data)
    return (
      <div>
        <Helmet title={siteTitle + ' | Posts Series'} />
        <div>
          <h1 className="title">Series</h1>
          {this.props.data.allMarkdownRemark.edges.map(({ node }, key) => (
            <PostListing key={key} post={node} showCat />
          ))}
        </div>
      </div>
    )
  }
}

export default CatsPageRoute

export const pageQuery = graphql`
  query SeriesQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { 
        frontmatter: { 
          isSeries: { eq: true }
          draft: { ne: true }
        } 
      }
    ) {
      totalCount
      edges {
        node {
          html
          timeToRead
          frontmatter {
            path
            title
            description
            date(formatString: "MMMM DD, YYYY")
            category
            tags
          }
        }
      }
    }
  }
`
