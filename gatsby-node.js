const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ( { graphql, boundActionCreators } ) => {
  const { createPage } = boundActionCreators

  return new Promise( ( resolve, reject ) => {
    const page = path.resolve( './src/templates/page.js' )
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    path
                  }
                }
              }
            }
          }
        `
      ).then( result => {
        if ( result.errors ) {
          console.log( result.errors );
          reject( result.errors );
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        _.each( posts, ( post, index ) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;
          const path = ( post.node.frontmatter.path || post.node.fields.slug );

          createPage( {
            path: path,
            component: page,
            context: {
              slug: path,
              previous: ( ( previous && ( previous.fields.slug === '/' ) ) || ( previous && previous.frontmatter.path === '/' ) ) ? undefined : previous,
              next: ( ( next && ( next.fields.slug === '/' ) ) || ( next && next.frontmatter.path === '/' ) ) ? undefined : next,
            },
          } );
        } ); // _.each
      } ) // .then
    )
  } );
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    // console.log(value)
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
