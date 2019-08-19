// const _ = require("lodash")
// const webpackLodashPlugin = require("lodash-webpack-plugin")
const path = require('path')
const { catInfo, tagInfo } = require('./src/data/index.js')

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions
  const categoryPage = path.resolve('src/templates/posts-by-category.js')
  const tagPage = path.resolve('src/templates/posts-by-tag.js')
  const blogPage = path.resolve('src/templates/blog.js')

  return graphql(`
    {
      allMarkdownRemark(
        limit: 1000
        sort: { order: DESC, fields: [frontmatter___date] }
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            html
            timeToRead
            id
            frontmatter {
              templateKey
              path
              series
              chapters
              date(formatString: "MMMM DD, YYYY")
              title
              description
              cover
              category
              tags
              image
              heading
              intro {
                blurbs {
                  image
                  text
                }
                heading
                description
              }
              main {
                heading
                description
                image1 {
                  alt
                  image
                }
                image2 {
                  alt
                  image
                }
                image3 {
                  alt
                  image
                }
              }
              testimonials {
                author
                quote
              }
              full_image
              pricing {
                heading
                description
                plans {
                  description
                  items
                  plan
                  price
                }
              }
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const categorySet = new Set()
    const tagSet = new Set()

    const postsPerPage = 3
    const pagesMap = { 1: [] }
    currPage = 1
    const err = []

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      if (node.frontmatter.category) {
        const cat = node.frontmatter.category
        categorySet.add(cat)
        if (!catInfo[cat])
          err.push(`Category \`${cat}\` used in "${node.frontmatter
            .path}" doesn't exist in \`data/index.js\`
`)
      }
      if (
        node.frontmatter.templateKey === 'blog-post' &&
        node.frontmatter.path !== node.frontmatter.series
      ) {
        if (pagesMap[currPage].length < postsPerPage)
          pagesMap[currPage].push(node)
        else {
          currPage += 1
          pagesMap[currPage] = [node]
        }
      }
      if (node.frontmatter.tags)
        node.frontmatter.tags.forEach(tag => {
          if (!tagInfo[tag]) {
            err.push(`Tag \`${tag}\` used in \`${node.frontmatter
              .path}\` doesn't exist in \`data/index.js\`
`)
            // throw new Error(err)
          }
          tagSet.add(tag)
        })

      const pagePath = node.frontmatter.path
      const cover = node.frontmatter.cover
        ? `/${node.frontmatter.cover.split('/img/')[1].split('.')[0]}/`
        : '/chemex/'

      createPage({
        path: pagePath,
        component: path.resolve(
          `src/templates/${String(node.frontmatter.templateKey)}.js`
        ),
        context: {
          cover,
          // path: pagePath,
          series: node.frontmatter.series || '',
        },
      })

      if (node.frontmatter.series !== null) {
      } else {
      }
    })

    if (err.length > 0) {
      console.log((`
      
${JSON.stringify(err)}

Allowed categories are: ${Object.keys(catInfo).join(', ')}

Allowed tags are: ${Object.keys(tagInfo).join(', ')}

      `))
      throw new Error()
    }

    const pNumArr = Object.keys(pagesMap)
    // const totalCt = pgNums.length
    pNumArr.forEach(pgNum => {
      createPage({
        path: pgNum === '1' ? '/' : `/page-${pgNum}/`,
        component: blogPage,
        context: {
          pgNum,
          posts: pagesMap[pgNum],
          newer: pgNum === '2' ? '/' : pgNum !== '1' && `/page-${pgNum - 1}/`,
          older:
            pgNum !== pNumArr[pNumArr.length - 1] && `/page-${+pgNum + 1}/`,
        },
      })
    })
    const tagList = Array.from(tagSet)
    tagList.forEach(tag => {
      createPage({
        path: `/tags/${tag}/`,
        component: tagPage,
        context: {
          tag,
        },
      })
    })

    const categoryList = Array.from(categorySet)
    categoryList.forEach(category => {
      createPage({
        path: `/categories/${category}/`,
        component: categoryPage,
        context: {
          category,
        },
      })
    })

    return Promise.resolve()
  })
}
