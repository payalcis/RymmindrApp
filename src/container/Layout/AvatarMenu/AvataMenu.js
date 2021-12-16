import { Box, Divider, IconButton, ListItem, ListItemText, Menu, Typography, Button } from '@material-ui/core'
import { AccountCircle, ArrowDropDown } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React from 'react'
import UserAvatar from './UserAvatar'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Link, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  },
  menuDropBox: {
    width: 300,
    textAlign: 'center',
    // padding: theme.spacing(2),
    outline: 'none',
    '& a': { display: 'block', fontWeight: 'bold', padding: theme.spacing(2), cursor: 'pointer' }
  },
  dropHead: {
    padding: theme.spacing(2.5)
  },
  Menu: {
    marginTop: theme.spacing(5)
  },
  typography: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main
  },

  IconButton: {
    padding: theme.spacing(0)
  },
  ListItem: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  }
}))

const BoxAvtarStyled = styled(Box)(({ theme }) => ({
  marginTop: -4, marginBottom: -4
}))

const TypoNameStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.primary.main,
  lineHeight: '10px',
  margin: 0,
  marginTop: 8,
  textTransform: 'capitalize'
}))

const TypoEmailStyled = styled(Typography)(({ theme }) => ({
  fontSize: 10,
  color: '#b3bcc3',
  textTransform: 'none'
}))

const AvatarMenu = ({ logout }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const { email, first_name, last_name, profile_image, sc_bessi_name } = JSON.parse(localStorage.getItem('userData'));
  // const { email = 'demo@gmail.com', firstName = 'demo', lastName = 'user', displayPic = '' } = {}
  // console.log(JSON.parse(localStorage.getItem('userData')))
  return (
    <div className={classes.root}>
      <Button
        edge='end'
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Box display='flex' alignItems='center'>
          <BoxAvtarStyled>
            <UserAvatar username={first_name.toUpperCase()} displayPic={profile_image} size='small' bgcolor='default' />
          </BoxAvtarStyled>
          <Box>
            <TypoNameStyled variant='h6' component='h6'>
            {`${sc_bessi_name}`}
            </TypoNameStyled>
            <TypoEmailStyled variant='caption'>{email}</TypoEmailStyled>
          </Box>
          <ArrowDropDown />
        </Box>
      </Button>

      <Menu
        id='menu-appbar'
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        className={classes.Menu}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={open}
        onClose={handleClose}
      >
        <div className={classes.menuDropBox}>
          <div className={classes.dropHead}>
            <UserAvatar username={first_name.toUpperCase()} displayPic={profile_image} size='large' bgcolor='default' />
            <Typography variant='h6' component='h6' className={classes.typography}>
              {`${sc_bessi_name}`}
            </Typography>
            <Typography variant='body1'>
              <Box mt={1} fontWeight='fontWeightMedium' color='grey.600' component='span'>
                {email}
              </Box>
            </Typography>
          </div>
          <Divider />
          <ListItem button to="account-settings/business-account/" component={Link} className={classes.ListItem} onClick={handleClose}>
            <ListItemText
              primary={
                <Box fontWeight='fontWeightMedium' color='primary.main'>
                  Account Settings
                </Box>
              }
            />
          </ListItem>
          <ListItem button className={classes.ListItem} onClick={() => logout()}>
            <ListItemText
              primary={
                <Box fontWeight='fontWeightMedium' color='error.main'>
                  Logout
                </Box>
              }
            />
          </ListItem>
        </div>
      </Menu>
    </div>
  )
}
AvatarMenu.propTypes = {
  logout: PropTypes.func.isRequired
}
export default AvatarMenu
