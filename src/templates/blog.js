import React from 'react'
import { Link, graphql } from 'gatsby'
import PostListing from '../components/PostListing'

export default class IndexPage extends React.Component {
  render() {
    const { pgNum, posts, newer, older } = this.props.pageContext
    return (
      <section className="section">
        <div className="container">
          <div className="content">
            <h1 className="title">Latest Articles</h1>
          </div>
          {posts.map((node, key) => (
            <PostListing key={key} post={node} pgNum={pgNum} showCat />
          ))}
          <div className="pager">
            <i>
              {older && (
                <Link to={older}>
                  <span className="arrow">{'<<  '}</span> older articles
                </Link>
              )}
            </i>
            {newer && older && <span className="divider">{'  |  '}</span>}
            <i>
              {newer && (
                <Link to={newer}>
                  newer articles <span className="arrow">{' >>'}</span>
                </Link>
              )}
            </i>
          </div>
        </div>
      </section>
    )
  }
}

/*
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          frontmatter {
            path
            title
            description
            date(formatString: "MMMM DD, YYYY")
            cover
            category
            tags
            templateKey
            series
            chapters
          }
        }
      }
    }
  }
`
*/
