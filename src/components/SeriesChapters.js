import React from 'react'
import Link from 'gatsby-link'

// const ToC = ({})

export default ({ series, chapterNodes, currPath }) =>
  currPath === series.path ? null : (
    <aside id="series">
      This blog post is part of a series on{' '}
      <Link
        to={`${series.path}`}
        className={currPath === series.path ? 'is-active' : ''}
      >
        {series.title}
      </Link>. Here's the complete list from this series, in case you've missed
      the previous posts:
      <br/>
      <br/>
      <ol className="chapters">
        {chapterNodes.map(
          (chap, key) =>
            currPath === chap.path ? (
              <li key={key}>
                <span className="curr-post">{chap.title}</span>
              </li>
            ) : (
              <Link
                key={key}
                style={{ textDecoration: 'none' }}
                to={`${chap.path}`}
              >
                <li>{chap.title}</li>
              </Link>
            )
        )}
      </ol>
    </aside>
  )
