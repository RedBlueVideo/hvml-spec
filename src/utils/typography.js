import Typography from 'typography'
// import Wordpress2016 from 'typography-theme-wordpress-2016'
import Lincoln from 'typography-theme-lincoln'

const bodyBgColor = 'hsl(0, 0%, 95%)';
// export { bodyBgColor }

Lincoln.overrideThemeStyles = () => ({
  body: {
    backgroundColor: bodyBgColor
  },
  a: {
    // color: linkColor,
    // textDecoration: 'none',
    textShadow: [
      `.03em 0 ${bodyBgColor}`,
      `-.03em 0 ${bodyBgColor}`,
      `0 .03em ${bodyBgColor}`,
      `0 -.03em ${bodyBgColor}`,
      `.06em 0 ${bodyBgColor}`,
      `-.06em 0 ${bodyBgColor}`,
      `.09em 0 ${bodyBgColor}`,
      `-.09em 0 ${bodyBgColor}`,
      `.12em 0 ${bodyBgColor}`,
      `-.12em 0 ${bodyBgColor}`,
      `.15em 0 ${bodyBgColor}`,
      `-.15em 0 ${bodyBgColor}`
    ].join( ',' )
    // backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, ${linkColor} 1px, ${linkColor} 2px, rgba(0, 0, 0, 0) 2px)`, // eslint-disable-line
  },
  'blockquote': {
    borderColor: 'rgba(0,0,0,0.125)',
  },
  // 'h1,h2,h3,h4,h5,h6': {
  //   marginTop: '1rem'
  // },
  'h4,h5,h6': {
    fontWeight: 'bold',
    fontSize: '1.25rem',
    marginTop: '2rem'
  },
  'article + article': {
    marginTop: '4.5rem'
  },
  '.self-referential-link': {
    textDecoration: 'none',
    // textShadow: 'none',
    backgroundImage: 'none',
    color: 'inherit'
  },
  // https://stackoverflow.com/a/21261303/214325
  'dl.inline-flex': {
    display: 'flex',
    flexFlow: 'row',
    flexWrap: 'wrap',
    width: '100%', /* set the container width*/
    overflow: 'visible'
  },
  'dl.inline-flex dt': {
    flex: '0 0 25%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    // marginBottom: '1rem'
  },
  'dl.inline-flex dd': {
    flex: '0 0 75%',
    marginLeft: 'auto',
    textAlign: 'left',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: '0.75rem',
    // marginTop: '-0.5rem'
  },
  'dfn': {
    fontStyle: 'normal',
    fontWeight: 'bold'
  },
  'dfn[title]': {
    borderBottom: '1px dotted black',
    cursor: 'help'
  },
  'abbr:not([title])': {
    borderBottom: 'none'
  },
  '.alt-link': {
    fontSize: '0.9em'
  },
  'details': {
    'cursor': 'default'
  },
  'details dl': {
    'cursor': 'initial'
  }
})

// delete Wordpress2016.googleFonts
// delete Lincoln.googleFonts

const typography = new Typography(Lincoln)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography