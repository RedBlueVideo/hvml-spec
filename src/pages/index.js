import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

// import intro from '../components/intro'
import { rhythm } from '../utils/typography'
import { sortElementPages, sortRootPages, groupElementPages } from '../utils/sortPages.js'
import expandCodeMarkdown from '../utils/expandCodeMarkdown'

class PagesIndex extends React.Component {
  render() {
    const siteTitle = get( this, 'props.data.site.siteMetadata.title' );
    let posts = get( this, 'props.data.feed.edges' );
    const intro = get( this, 'props.data.intro.edges[0].node' );
    const useCases = get( this, 'props.data.useCases.edges[0].node' );
    const cheatSheet = get( this, 'props.data.cheatSheet.edges[0].node' );

    posts = groupElementPages( sortElementPages( posts ) );
    posts.root = sortRootPages( posts.root );

    return (
      <article>
        <Helmet title={siteTitle} />
        {/* <intro /> */}
        <section dangerouslySetInnerHTML={ { __html: intro.html } }></section>
        <section dangerouslySetInnerHTML={ { __html: useCases.html } }></section>
        <section dangerouslySetInnerHTML={ { __html: cheatSheet.html } }></section>
        <section>
          <h2>Specification</h2>
          <ol start="0">
            <li><a href="/hvml">Single-page version</a></li>
            { posts.root.map( ( post, index ) => {
              let node = post.node;
              let title = get( node, 'frontmatter.title' ) || node.fields.slug;
              let key = node.fields.slug.replace( /^\/([^/]+)\//i, '$1' );

              return (
                <li key={ index }>
                  <Link to={ node.fields.slug }>
                    { title }
                  </Link>
                  { posts[key] &&
                    <ol> {
                      posts[key].map( ( { node } ) => {
                        const title = get( node, 'frontmatter.title' ) || node.fields.slug;
                        return (
                          <li key={ node.fields.slug }>
                            <Link to={ node.fields.slug } dangerouslySetInnerHTML={ { __html: expandCodeMarkdown( title ) } }></Link>
                          </li>
                        )
                      } )
                    } </ol>
                  }
                </li>
              );
            } ) }
          </ol>
          {/*
            <ol> {
              posts.map( ( { node } ) => {
                const title = get( node, 'frontmatter.title' ) || node.fields.slug;
                return (
                  <li key={ node.fields.slug }>
                    <Link to={ node.fields.slug }>
                      { title }
                    </Link>
                  </li>
                )
              } ) // map
            } </ol>
          */}
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
    feed: allMarkdownRemark(
      sort: {
        fields: [frontmatter___date],
        order: DESC
      },
      filter: {
        frontmatter: {
          path: {
            ne: "/"
          }
        }
      }
    ) {
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
    glossary: markdownRemark(fields: { slug: { eq: "/glossary/" } }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        formattedDate: date(formatString: "MMMM Do, YYYY")
        date: date
      }
    }
  }
`
