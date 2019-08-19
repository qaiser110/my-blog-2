import PropTypes from "prop-types"
import React from "react"
import { Link } from 'gatsby'

const Header = ({ siteTitle }) => (
  <header className="header">
    <Link to="/" className="logo">
      {siteTitle}
    </Link>
    <input className="menu-btn" type="checkbox" id="menu-btn" value="off" />
    <label className="menu-icon" htmlFor="menu-btn">
      <span className="navicon" />
    </label>
    <ul className="menu">
      {/*
      <li>
        <Link to="/about">About</Link>
      </li>
*/}
      <li>
        <Link to="/series/">Series</Link>
      </li>
      <li>
        <Link to="/categories">Categories</Link>
      </li>
      {/*
      <li>
        <a href="/">Contact</a>
      </li>
*/}
    </ul>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
