import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import config from "../data/SiteConfig";

function SEO(props) {
  const { pDesc, lang, pMeta, pTitle } = props
  const { postNode, postPath, postSEO, coverImage } = props

  let title;
  let description;
  let image;
  let postURL;

  if (postSEO) {
    const postMeta = postNode.frontmatter;
    title = postMeta.title;
    description = postMeta.description
      ? postMeta.description
      : postNode.excerpt;
    image = coverImage;
    postURL = config.siteUrl + config.pathPrefix + postPath;
  } else {
    title = pTitle || config.siteTitle;
    description = pDesc || config.siteDescription;
    image = config.siteLogo;
  }

  const realPrefix = config.pathPrefix === "/" ? "" : config.pathPrefix;
  image = config.siteUrl + realPrefix + image;
  const blogURL = config.siteUrl + config.pathPrefix;
  const schemaOrgJSONLD = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: blogURL,
      name: title,
      alternateName: config.siteTitleAlt ? config.siteTitleAlt : ""
    }
  ];
  if (postSEO) {
    schemaOrgJSONLD.push([
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": postURL,
              name: title,
              image
            }
          }
        ]
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: blogURL,
        name: title,
        alternateName: config.siteTitleAlt ? config.siteTitleAlt : "",
        headline: title,
        image: {
          "@type": "ImageObject",
          url: image
        },
        description
      }
    ]);
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${config.siteTitle}`}
      meta={pMeta}
    >
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ""}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta
        name="twitter:creator"
        content={config.userTwitter || config.siteAuthor}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  pMeta: [], // additional meta
  description: ``,
  pTitle: ``,
}

SEO.propTypes = {
  lang: PropTypes.string,
  pDesc: PropTypes.string,
  pMeta: PropTypes.arrayOf(PropTypes.object),
  pTitle: PropTypes.string,
}

export default SEO
