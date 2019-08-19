import React  from 'react'
import { Link } from 'gatsby'
import UserLinks from './UserLinks'
import UserInfo from './UserInfo'
import config from '../../../data/SiteConfig'

export default () => (
  <footer className="footer">
    <section className="container">
      <div className="item" style={{flex: 2}}>
        <h4>About me</h4>
        <p>
          I'm a Full-Stack Developer and Automation Engineer. I help teams build quality software by applying good development, automation, and testing tools and practices.
        </p>
      </div>
      <div className="item" style={{flex: 2}}>
        <h4>Expertise</h4>
        <p>I work on Node, React, Swift, improving Code Quality, and all kinds of Automation and tools for development and testing of apps.</p>
      </div>
      <div className="item" style={{flex: 1}}>
        <div className="contact">
          <h4>Contact Me</h4>
          <UserLinks config={config} labeled />
        </div>
      </div>
    </section>

    <h6 className="container notice-container">
      <span className="item" style={{paddingTop: '8px'}}>
        <UserInfo username={config.userTwitter}/>
      </span>
      <span className="item" style={{paddingLeft: '8em', color: '#959595'}}>
              {config.copyright || null}
            </span>
      <span className="item">
              <Link style={{ float: 'right' }} to={config.siteRss}>
                Subscribe
              </Link>
            </span>
    </h6>
  </footer>
)
