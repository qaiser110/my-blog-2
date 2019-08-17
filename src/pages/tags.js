import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
// import kebabCase from "lodash/kebabCase"
import { siteTitle } from '../data/SiteConfig'
import { tagInfo } from '../data'

class TagsPageRoute extends React.Component {
  render() {
    const allTags = this.props.data.allMarkdownRemark.group
    return (
      <div>
        <Helmet title={siteTitle + ' | tags'} />
        <div>
          <h1 className="title">Tags</h1>
          <ul>
            {allTags.map(tag => (
              <li key={tag.fieldValue}>
                <Link
                  style={{
                    textDecoration: 'none',
                  }}
                  to={`/tags/${tag.fieldValue}/`}
                >
                  {tagInfo[tag.fieldValue].title} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default TagsPageRoute

export const pageQuery = graphql`
  query TagsQuery {
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
