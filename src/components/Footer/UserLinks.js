import React, { Component } from 'react'

class UserLinks extends Component {
  getLinkElements() {
    const { userLinks } = this.props.config
    const { labeled } = this.props
    return userLinks.map(link => (
      <li key={link.label}>
        <a target="_blank" href={link.url}>
          {labeled ? link.label : ''}
        </a>
      </li>
    ))
  }
  render() {
    const { userLinks } = this.props.config
    if (!userLinks) {
      return null
    }
    return <ul className="user-links">{this.getLinkElements()}</ul>
  }
}

export default UserLinks
