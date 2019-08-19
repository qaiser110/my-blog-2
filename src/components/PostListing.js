import React from 'react'
import { Link } from 'gatsby'
import { catInfo } from '../data'
import PostTags from './PostTags'

const CatLink = ({ category }) => (
  <span>
    <span className="dim">{' in '}</span>
    <Link to={`/categories/${category}`} className="dim-link">
      {catInfo[category]}
    </Link>
  </span>
)

export default ({ post, showCat }) => (
  <div className="post-item">
    <Link to={post.frontmatter.path}>
      <h2>{post.frontmatter.title}</h2>
    </Link>
    <p className="date-time">
      <span className="dim">posted {post.frontmatter.date} </span>
      {showCat && <CatLink category={post.frontmatter.category} />}
    </p>
    <div>
      {post.frontmatter.description}
      <div className="post-meta">
        <PostTags tags={post.frontmatter.tags} />
        <h6>
          <Link to={post.frontmatter.path} className="dim-link">
            Read more...
          </Link>
        </h6>
      </div>
    </div>
  </div>
)
