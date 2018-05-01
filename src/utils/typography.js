import Typography from 'typography'
// import Wordpress2016 from 'typography-theme-wordpress-2016'
import Lincoln from 'typography-theme-lincoln'

Lincoln.overrideThemeStyles = () => ({
  'blockquote': {
    borderColor: 'rgba(0,0,0,0.125)',
  },
})

// delete Wordpress2016.googleFonts
// delete Lincoln.googleFonts

const typography = new Typography(Lincoln)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
