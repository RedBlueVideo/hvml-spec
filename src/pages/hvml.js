import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'

// import intro from '../components/intro'
import { rhythm } from '../utils/typography'
import { sortElementPages, groupElementPages } from '../utils/sortElementPages.js'
import expandCodeMarkdown from '../utils/expandCodeMarkdown'

class HvmlIndex extends React.Component {
  render() {
    const siteTitle = get( this, 'props.data.site.siteMetadata.title' );
    let posts = get( this, 'props.data.feed.edges' );
    posts = groupElementPages( sortElementPages( posts ) );
    // console.log( 'posts', posts );
    let lastUpdate = get( this, 'props.data.feed.edges' ).map( ( { node } ) => {
      return node.frontmatter;
    } ).shift();

    return (
      <article>
        <Helmet title={siteTitle} />
        <header>
          <h1>Specification</h1>
          <dl className="inline" style={ {
            marginBottom: rhythm(0.25),
            marginRight: '1rem',
            // display: 'inline-block'
          } }>
            <dt>Last updated:</dt>
            <dd><time dateTime={ lastUpdate.date }>{ lastUpdate.formattedDate }</time></dd>
          </dl>
        </header>
        { posts.root.map( ( post, index ) => {
          let node = post.node;
          let title = get( node, 'frontmatter.title' ) || node.fields.slug;
          let key = node.fields.slug.replace( /^\/([^/]+)\//i, '$1' );

          return (
            <section key={ index } id={ key }>
              <header>
                <h2>
                  <Link to={ '#' + key } className="self-referential-link">{ title }</Link>
                </h2>
                <div style={ { fontSize: '0.9rem' } }>
                  <nav style={ {
                    // display: 'inline-block'
                  } }>
                    <Link to={ node.fields.slug }>📖 Paginated version</Link>
                  </nav>
                </div>
              </header>
              {
                posts[key].map( ( { node } ) => {
                  const localNameRegExp = new RegExp( `/${key}/([^/]+)/`, 'i' );
                  const id = node.fields.slug.replace( localNameRegExp, '$1' );
                  const title = get( node, 'frontmatter.title' ) || node.fields.slug;
                  return (
                    <article key={ id } id={ id }>
                      {/*<Link to={ node.fields.slug } */}
                      <h3>
                        <Link
                          to={ `#${id}` }
                          className="self-referential-link"
                          dangerouslySetInnerHTML={ { __html: expandCodeMarkdown( title ) } }
                        ></Link>
                      </h3>
                      {/* <p>Last updated: <time dateTime={ node.frontmatter.date }>{ node.frontmatter.formattedDate }</time></p> */}
                      <div dangerouslySetInnerHTML={ { __html: node.html } }></div>
                    </article>
                  )
                } )
              }
            </section>
          );
        } ) }
      </article>
    );
  }
}

export default HvmlIndex

export const pageQuery = graphql`
  query HvmlQuery {
    site {
      siteMetadata {
        title
      }
    }
    feed: allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { path: { ne: "/" } } }) {
      edges {
        node {
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
    }
  }
`
