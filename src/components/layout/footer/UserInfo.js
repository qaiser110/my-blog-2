import React from 'react'
import { Follow } from 'react-twitter-widgets'

export default ({ expanded, username }) => (
  <Follow
    username={username}
    options={{ count: expanded ? true : 'none' }}
  />
)
