import React from 'react'
import Link from 'gatsby-link'

import { rhythm, scale } from '../utils/typography'

// import 'prismjs/themes/prism-solarizedlight.css'
import 'prism-solarized-dark/prism-solarizeddark.css'
// import './themes/prism-mods/solarizedlight.css'
import './themes/prism-mods/solarizeddark.css'
import './style.css'

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
      <img className="branding__logo" src={ logo1x } width={ ( location.pathname === rootPath ) ? 152 : 114 } height={ ( location.pathname === rootPath ) ? 152 : 114 } srcSet={ `${logo1x} 1x, ${logo2x} 2x, ${logo3x} 3x` } style={ {
        borderRadius: '101px',
        margin: '0 auto'
      } } />
    )

    let header = (
      <hgroup className="branding__name" style={ {
        ...scale(1.5),
        marginTop: '-13px'
      } }>
        { ( location.pathname === rootPath ) ? headerContents() : headerContents( 'small' ) }
      </hgroup>
    )

    return (
      <React.Fragment>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            // maxWidth: rhythm(24.68355),
            width: '39rem',
            maxWidth: '80%',
            padding: `${rhythm(1.5)} 0`, // ${rhythm(3 / 4)}
          }}
        >
          <header className="branding" style={ {
            marginBottom: rhythm(1.5)
          } }>
            <Link
              className="homepage-link"
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
          <footer style={ {
            textAlign: 'center',
            ...scale(0.00625),
            marginTop: rhythm(3),
            marginBottom: rhythm(-.75),
            lineHeight: 1.5
          } }>
            <p style={ {
              fontSize: '0.95rem',
              marginBottom: rhythm(0.333333)
            } }><a href="https://github.com/RedBlueVideo/hvml-spec">GitHub</a> | <a href="https://twitter.com/HypervideoML">Twitter</a></p>
            <p><small>Copyright © { (() => {
              const year = ( new Date() ).getFullYear();
              // console.log( )
              if ( year > 2018 ) {
                return `2018—${year}`
              }
              return year;
            })() } HVML Working Group (<a href="https://hughguiney.com">Hugh Guiney</a> <abbr title="and others">et al.</abbr>).</small></p>
            <p><small>This work is licensed under the <a rel="license" href="https://github.com/RedBlueVideo/hvml-spec/blob/master/LICENSE.txt"><abbr>GNU</abbr> General Public License v3.0</a>.</small></p>
          </footer>
        </div>
      </React.Fragment>
    )
  }
}

export default Template
