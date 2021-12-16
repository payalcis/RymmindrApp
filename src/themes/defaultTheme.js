import {
  primaryDark,
  primaryLight,
  primaryMain,
  primaryTextColor,
  primarycontrastText,
  secondaryDark,
  secondaryLight,
  secondaryMain,
  secondarycontrastText,
  secondryTextColorDark,
  textSecondaryColor
} from '../constants/colorConstant'
import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: primaryLight,
      main: primaryMain,
      dark: primaryDark,
      contrastText: primarycontrastText
    },
    secondary: {
      light: secondaryLight,
      main: secondaryMain,
      dark: secondaryDark,
      contrastText: secondryTextColorDark
    },
    text: {
      primary: primaryTextColor,
      secondary: textSecondaryColor
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    warning: {
      light: '#ffb74d',
      main: '#FFA502',
      dark: '#f57c00',
      contrastText: '#fff'
    },
    info: {
      light: '#64b5f6',
      main: '#17BAFF',
      dark: '#1976d2',
      contrastText: '#fff'
    },
    success: {
      light: '#81c784',
      main: '#2ECD70',
      dark: '#388e3c',
      contrastText: '#fff'
    },
    props: {
      light: '#8085db',
      main: '#575FCF',
      dark: '#424aaf',
      contrastText: '#fff'
    }
  },
  typography: {
    fontFamily: [
      '"Roboto"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"', 
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  overrides: {
    MuiTab: {
      wrapper: {
        flexDirection: 'row',
        justifyContent: 'start'
      }
    }
  }
})

export default theme
