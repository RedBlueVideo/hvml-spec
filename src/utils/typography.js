import Typography from 'typography'
// import Wordpress2016 from 'typography-theme-wordpress-2016'
import Lincoln from 'typography-theme-lincoln'

Lincoln.overrideThemeStyles = () => ({
  'blockquote': {
    borderColor: 'rgba(0,0,0,0.125)',
  },
  // 'h1,h2,h3,h4,h5,h6': {
  //   marginTop: '1rem'
  // },
  'h4,h5,h6': {
    fontWeight: 'bold',
    fontSize: '1rem',
    marginTop: '1.5rem'
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
  'dl.inline dt': {
    display: 'inline',
    marginRight: '.25rem'
    // fontWeight: 'bold'
  },
  'dl.inline dd': {
    margin: '0px',
    display: 'inline'
  },
  'dl.inline dd:after': {
    content: "\A",
    whiteSpace: 'pre'
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
