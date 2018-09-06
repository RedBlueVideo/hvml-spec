import React from 'react'
import Link from 'gatsby-link'

import { rhythm, scale } from '../utils/typography'

import 'prismjs/themes/prism-solarizedlight.css'
import './themes/prism-mods/solarizedlight.css'

// import 'prism-themes/themes/prism-a11y-dark.css'
// import './themes/dracula-prism/css/dracula-prism.css'

// import 'prismjs/themes/prism-funky.css'
// import './themes/prism-mods/funky.css'

// import 'prism-themes/themes/prism-duotone-sea.css'
// import './themes/prism-mods/duotone-sea.css'

// import logo from '../img/hvml-logo.png'
import logo1x from '../img/hvml-logo.png'
import logo2x from '../img/hvml-logo@2x.png'
import logo3x from '../img/hvml-logo@3x.png'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    // let isHomepage = ( location.pathname === rootPath )

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    let headerContents = ( size ) => {
      return (
        <React.Fragment>
          <h1 style={ {
            fontSize: ( size === 'small' ? rhythm(1) : undefined ),
            marginTop: 0
          } }>HVML</h1>
          <h2 style={ {
            fontSize: ( size === 'small' ? rhythm(0.777778) : undefined ),
            margin: rhythm(0)
          } }>Hypervideo Markup Language</h2>
        </React.Fragment>
      )
    }

    let logo = (
      <img src={ logo1x } width={ ( location.pathname === rootPath ) ? 152 : 114 } height={ ( location.pathname === rootPath ) ? 152 : 114 } srcSet={ `${logo1x} 1x, ${logo2x} 2x, ${logo3x} 3x` } style={ {
        borderRadius: '101px',
        margin: '0 auto'
      } } />
    )

    let header = (
      <hgroup style={ {
        ...scale(1.5),
        marginTop: '-13px'
      } }>
        { ( location.pathname === rootPath ) ? headerContents() : headerContents( 'small' ) }
      </hgroup>
    )

    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          // maxWidth: rhythm(24.68355),
          maxWidth: '39rem',
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header style={ {
          marginBottom: rhythm(1.5)
        } }>
          <style scoped>{`
            header {
              text-align: center;
            }
            hgroup {
              margin: 0 auto;
            }
            a {
              margin-bottom: 1.5rem;
              display: block;
            }
            @media only screen and (min-width: 540px) {
              header {
                text-align: left;
              }
              a, hgroup {
                display: inline-block;
                vertical-align: middle;
              }
              hgroup {
                margin: 0 auto 0 1.25rem;
              }
              a {
                margin-bottom: 0;
              }
            }
          `}</style>
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
              backgroundImage: 'none',
            }}
            to={'/'}
          >
            {logo}
          </Link>
          {header}
        </header>
        {children()}
      </div>
    )
  }
}

export default Template
