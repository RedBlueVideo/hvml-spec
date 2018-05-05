import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

// import intro from '../components/intro'
import { rhythm } from '../utils/typography'
import { sortElementPages } from '../utils/sortElementPages.js'

class PagesIndex extends React.Component {
  render() {
    const siteTitle = get( this, 'props.data.site.siteMetadata.title' );
    let posts = get( this, 'props.data.feed.edges' );
    const intro = get( this, 'props.data.intro.edges[0].node' );
    const useCases = get( this, 'props.data.useCases.edges[0].node' );
    const cheatSheet = get( this, 'props.data.cheatSheet.edges[0].node' );

    console.log( 'posts', posts );
    posts = sortElementPages( posts );

    return (
      <article>
        <Helmet title={siteTitle} />
        {/* <intro /> */}
        <section dangerouslySetInnerHTML={ { __html: intro.html } }></section>
        <section dangerouslySetInnerHTML={ { __html: useCases.html } }></section>
        <section dangerouslySetInnerHTML={ { __html: cheatSheet.html } }></section>
        <section>
          <h2>Specification</h2>
          <ol>
          { posts.map( ( { node } ) => {
            const title = get( node, 'frontmatter.title' ) || node.fields.slug;
            return (
              <li key={ node.fields.slug }>
                <Link to={ node.fields.slug }>
                  { title }
                </Link>
              </li>
            )
          } ) }
          </ol>
        </section>
      </article>
    );
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
    useCases: allMarkdownRemark(filter: { fields: { slug: { eq: "/use-cases/" } } }) {
      edges {
        node {
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
    cheatSheet: allMarkdownRemark(filter: { fields: { slug: { eq: "/cheat-sheet/" } } }) {
      edges {
        node {
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
    feed: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { path: { ne: "/" } } }) {
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
