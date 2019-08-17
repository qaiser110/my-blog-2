import React, { Component } from 'react'
import { Follow } from 'react-twitter-widgets'
import config from "../data/SiteConfig";

class UserInfo extends Component {
  render() {
    const { expanded } = this.props
    return (
      <Follow
        username={config.userTwitter}
        options={{ count: expanded ? true : 'none' }}
      />
    )
  }
}

export default UserInfo
