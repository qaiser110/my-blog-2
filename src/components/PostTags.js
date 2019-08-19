import React from 'react'
import { Link } from 'gatsby'
import { tagInfo } from '../data'

export default ({ tags }) => {
  if (!tags) return null

  const tagSection = tags.map((tag, i) => {
    if (!tagInfo[tag]) return null
    const dividerStr = i < tags.length - 1 && <span>{' | '}</span>
    return (
      <span key={tag} className='dim-link'>
        <Link to={`/tags/${tag}`}>
          {tagInfo[tag].title}
        </Link>
        {dividerStr}
      </span>
    )
  })

  return (
    <div className="tags">
      <span className='dim'>Tagged with:</span> {tagSection}
    </div>
  )
}
