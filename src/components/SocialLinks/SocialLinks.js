import React, { Component } from 'react'
import {
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramIcon,
  TelegramShareButton,
  RedditIcon,
  RedditShareCount,
  RedditShareButton,
  FacebookIcon,
  FacebookShareCount,
  FacebookShareButton,
  // PinterestIcon,
  // PinterestShareCount,
  // PinterestShareButton,
} from 'react-share'
import config from '../../data/SiteConfig'
import './SocialLinks.css'

class SocialLinks extends Component {
  render() {
    const { postNode, postPath, mobile } = this.props
    const post = postNode.frontmatter
    const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
    const url = config.siteUrl + realPrefix + postPath

    const iconSize = mobile ? 36 : 48
    const filter = count => (count > 0 ? count : '')

    return (
      <div className="social-links">
        <RedditShareButton url={url} title={post.title}>
          <RedditIcon round size={iconSize} />
          <RedditShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </RedditShareCount>
        </RedditShareButton>
        <TwitterShareButton
          url={url}
          title={post.title}
          hashtags={post.hashtags}
        >
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={url} quote={postNode.frontmatter.description}>
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </FacebookShareCount>
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          title={post.title}
          description={postNode.frontmatter.description}
        >
          <LinkedinIcon round size={iconSize} />
        </LinkedinShareButton>
        <TelegramShareButton url={url}>
          <TelegramIcon round size={iconSize} />
        </TelegramShareButton>
      </div>
    )
  }
}

export default SocialLinks
