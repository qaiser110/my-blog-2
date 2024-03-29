/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import "./src/styles/global.css"
import Index from './src/components/layout'
import 'prismjs/themes/prism-solarizedlight.css'

export const wrapPageElement = ({ element, props }) => {
  // props provide same data to Layout as Page element will get
  // including location, data, etc - you don't need to pass it
  return <Index {...props}>{element}</Index>
}
