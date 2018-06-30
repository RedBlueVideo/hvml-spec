import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import get from 'lodash/get';

// import Intro from '../components/Intro'
import { rhythm, scale } from '../utils/typography';
import { sortElementPages } from '../utils/sortElementPages';
import expandCodeMarkdown from '../utils/expandCodeMarkdown'

class PageTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get( this.props, 'data.site.siteMetadata.title' )
    const { previous, next } = this.props.pathContext
    // const elementPages = this.props.data.elements.edges;
    const elementPages = sortElementPages( this.props.data.elements.edges );
    let lastUpdate = get( this, 'props.data.elements.edges' ).map( ( { node } ) => {
      return node.frontmatter;
    } ).shift();
    // console.log( 'lastUpdate', lastUpdate );

    return (
      <article>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <h1
          style={ {
            marginTop: 0,
            // marginBottom: rhythm(1.25),
          } }
          dangerouslySetInnerHTML={ { __html: expandCodeMarkdown( post.frontmatter.title ) } }
        ></h1>
        <p>Last updated: <time dateTime={ lastUpdate.date }>{ lastUpdate.formattedDate }</time></p>
        { ( post.fields.slug === '/elements/' ) &&
          <ol>
          { elementPages.map( ( { node } ) => {
            const title = get( node, 'frontmatter.title' ) || node.fields.slug;
            return (
              <li key={ node.fields.slug }>
                <Link to={ node.fields.slug } dangerouslySetInnerHTML={ { __html: expandCodeMarkdown( title ) } }></Link>
              </li>
            )
          } ) }
          </ol>
        }
        { ( post.fields.slug !== '/elements/' ) &&
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        }
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        {/* <Bio /> */}

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
            marginLeft: 0
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </article>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
    elements: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC },
      filter: {
        fields: {
          slug: { regex: "/^\/elements\//i",
          ne: "/elements/" }
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
            title
            formattedDate: date(formatString: "MMMM Do, YYYY")
            date: date
          }
        }
      }
    }
  }
`
