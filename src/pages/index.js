import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

// import Intro from '../components/Intro'
import { rhythm } from '../utils/typography'

class PagesIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.all.edges')
    const intro = get(this, 'props.data.intro.edges[0].node')

    console.log(intro);

    return (
      <article>
        <Helmet title={siteTitle} />
        {/* <Intro /> */}
        <div dangerouslySetInnerHTML={{ __html: intro.html }} />
        <h2>The Elements of HVML</h2>
        <ol>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <li key={node.fields.slug}>
              <Link to={node.fields.slug}>
                {title}
              </Link>
            </li>
          )
        })}
        </ol>
      </article>
    )
  }
}

export default PagesIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    intro: allMarkdownRemark(filter: { fields: { slug: { eq: "/intro/" } } }) {
      edges {
        node {
          excerpt
          html
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
    all: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { fields: { slug: { ne: "/intro/" } } }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
