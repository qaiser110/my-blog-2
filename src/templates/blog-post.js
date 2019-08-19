import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import Content, { HTMLContent } from '../components/Content'
import { catInfo } from '../data'
import PostTags from '../components/PostTags'
import Chapters from '../components/SeriesChapters'
import SEO from '../components/seo'
import SocialLinks from '../components/SocialLinks/SocialLinks'
import config from '../data/SiteConfig'

export const BlogPostTemplate = ({
  post,
  series,
  chapterNodes,
  imageSharp,
  contentComponent,
  helmet,
}) => {
  const PostContent = contentComponent || Content
  const { path, title, description, /*cover,*/ category, tags } = post.frontmatter
  const smallImage = imageSharp.fluid.srcSet.split(' ')[0]
  const isSeries = series && series.chapters && series.chapters.length > 0
  return (
    <section className="section">
      {helmet || ''}
      <SEO postSEO postPath={path} postNode={post} coverImage={smallImage} />
      <div className="container content">
        <h1 className="title">{title}</h1>
        {category && (
          <span>
            in{' '}
            <Link className="cat-link" to={`/categories/${category}`}>
              {catInfo[category]}
            </Link>
          </span>
        )}
        <Img
          className="cover-img"
          sizes={imageSharp.fluid}
          alt={`Image for "${title}"`}
        />
        <p>{description}</p>
        {isSeries && (
          <Chapters
            series={series}
            chapterNodes={chapterNodes}
            currPath={path}
          />
        )}
        <PostContent content={post.html} />
        <div className="post-meta">
          <SocialLinks postPath={path} postNode={post} />
          <br />
          <PostTags tags={tags} />
        </div>
      </div>
    </section>
  )
}

export default ({ data }) => {
  const { markdownRemark: post, imageSharp, chapters } = data
  let chapterNodes = []
  let series = null
  if (chapters) {
    chapters.edges.forEach(
      ch =>
        ch.node.frontmatter.path === ch.node.frontmatter.series
          ? (series = ch.node.frontmatter)
          : chapterNodes.push(ch.node.frontmatter)
    )
  }

  return (
    <BlogPostTemplate
      imageSharp={imageSharp}
      post={post}
      series={series}
      chapterNodes={chapterNodes}
      contentComponent={HTMLContent}
      helmet={
        <Helmet title={`${post.frontmatter.title} | ${config.siteTitle}`} />
      }
    />
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!, $cover: String!, $series: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        description
        date(formatString: "MMMM DD, YYYY")
        series
        chapters
        cover
        category
        tags
        hashtags
      }
    }
    imageSharp(fluid: {originalName: {regex: $cover}}) {
      fluid(maxWidth: 1240) {
        ...GatsbyImageSharpFluid
      }
    }
    chapters: allMarkdownRemark(
      filter: { frontmatter: { series: { eq: $series }, draft: { ne: true } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            series
            chapters
          }
        }
      }
    }
  }
`
