import {
  AppBar,
  Badge,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  DialogContent,
  Box,
  DialogTitle,
  Dialog,
  Button
} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import { Route, HashRouter as Router, Switch, useHistory, Link } from 'react-router-dom'
import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { fade, styled, makeStyles, useTheme } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import AvatarMenu from './AvatarMenu/AvataMenu'
import NotificationMenu from './Notification/Notification'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CreateRymindr from '../Rymindrs/CreateRymindr/CreateRymindr'
import EditRymindr from '../Rymindrs/CreateRymindr/EditRymindr'
import CreateHistoryRymindrs from '../HistoryRymindrs/CreateRymindr/CreateRymindr'
import HistoryRymindrs from '../HistoryRymindrs/UpcomingRymindr/UpcomingRymindr'
import Dashboard from '../Dashboard/Dashboard'
import LiveChat from '../LiveChat/LiveChat'
import MenuIcon from '@material-ui/icons/Menu'
import MoreIcon from '@material-ui/icons/MoreVert'
import Share from '@material-ui/icons/Share'
import GetApp from '@material-ui/icons/GetApp'
import Notification from '../Rymindrs/Notifications/Notifications'
import NotificationsIcon from '@material-ui/icons/Notifications'
import React, { useEffect, useMemo, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search'
import Lock from '@material-ui/icons/Lock'
import Sidebar from '../../component/Sidebar/Sidebar'
import UpcomingRymindr from '../Rymindrs/UpcomingRymindr/UpcomingRymindr'
import Contacts from '../Contacts/Contacts'

import TermDatesHolidays from '../TermDatesHolidays/TermDatesHolidays'
import Bookings from '../Bookings/Bookings';
import FormBuilders from '../FormBuilders/FormBuilders';
import FormTemplates from '../FormTemplates/FormTemplates';
import SubmittedExams from '../SubmittedExams/SubmittedExams';
import EventBookings from '../Bookings/EventBooking/EventBooking'
import EventBookingDuplicate from '../Bookings/EventBooking/EventBookingDuplicate'

import ManageBooking from '../Bookings/ManageBooking/ManageBooking'
import ManageBookingView from '../Bookings/ManageBooking/ManageBookingView'

import Calendar from '../Calendar/Calendar'
import MessageCenter from '../MessageCenter/MessageCenter'
import DirectMessage from '../MessageCenter/DirectMessage/DirectMessage'

import Payments from '../Payments/Payments'
import Integrations from '../Integrations/Integrations'
import Credits from '../Credits/Credits'
import Resources from '../Resources/Resources'
import Shop from '../Shop/Shop'
import Rewards from '../Rewards/Rewards'
import Fundraisers from '../Fundraisers/Fundraisers'

import { Close } from '@material-ui/icons'
import LiveFeed from '../LiveFeed/LiveFeed'
import RymindrNews from '../RymindrNews/RymindrNews'
import AccountSettings from '../AccountSettings/AccountSettings'
import { getUserDetails } from '../../store/actions/accountsettingAction'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import clsx from 'clsx'
import * as htmlToImage from 'html-to-image';
import { Scrollbars } from 'react-custom-scrollbars'
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from 'react-share'
import firebase from 'firebase'
import VideoModal from './VideoModal'
import { firebaseConfig } from '../../firebase';
import 'firebase/messaging';
import Axios from '../../helper/axios';
import { Send } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';

const drawerWidth = 300
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  myNode: {
    width: '65%',
    margin: 'auto'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth
    },
    background: '#fff'
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing(10),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto'
    }
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
}))

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600'
}))

const TypoBusStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 18,
  fontWeight: '800'
}))

const TypoTxtStyled = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  fontSize: 16

}))

const TypoTxtLrgStyled = styled(TypoTxtStyled)(({ theme }) => ({
  fontSize: 24,
  fontWeight: '600'
}))

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px'
})

const DialogContentStyled = styled(DialogContent)({
  textAlign: 'center'
})

const Layout = (props) => {
  const { container, getUserDetails, userdetails, error, loading, isTriggerNotify } = props
  const { business_code, user_id } = JSON.parse(localStorage.getItem('userData'))
  const history = useHistory()
  const classes = useStyles()
  const theme = useTheme()

  const [qrCode, setQrCode] = React.useState('')
  const [qrCodeBase64, setQrCodeBase64] = React.useState('')
  const [businessCode, setBusinessCode] = React.useState('')

  const [openImage, setOpenImage] = React.useState(false)

  const [openDownloadImage, setOpenDownloadImage] = React.useState(false)

  const [openNotification, setOpenNotification] = React.useState(false);

  const [opemWelcomePopup, setOpemWelcomePopup] = React.useState(false);

  const handleClickImageOpen = (user_qr_code, user_qr_code_base64, business_code) => {
    setOpenImage(true)
    setQrCode(user_qr_code)
    setQrCodeBase64(user_qr_code_base64)
    setBusinessCode(business_code)
  }

  const handleCloseImageModal = () => {
    // alert('clsoe')
    setOpenImage(false)
  }

  const handleCloseDownloadModal = () => {
    // alert('clsoe')
    setOpenImage(false)
    setOpenDownloadImage(false)
  }

  useEffect(() => {
    getUserDetails({ user_id })
  }, [])

  useEffect(() => {
    if(isTriggerNotify == true) {
      setOpenNotification(isTriggerNotify)
    }
  }, [isTriggerNotify])

  const { user_qr_code = '' } = userdetails

  const { user_qr_code_base64 = '' } = userdetails

  const { sc_bessi_name = '' } = userdetails

  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const openDemoPopup = () => {
    var x = Math.floor((Math.random() * 10) + 1);
    setOpemWelcomePopup(x);
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const logout = async () => {

    handleMenuClose()

    // Logout from firebase as well
    firebase.auth().signOut()

    var sessionToken = sessionStorage.getItem('token_de');

    Axios().post('users/logout', {
      device_token : sessionToken
      }).then((response) => {
        console.warn('hello response', response)
    })

    history.push('/login')
    localStorage.clear()
  }

  const [visibleModal, setVisibleModal] = React.useState(false)

  /* const downloadQRCode = () => {
    //setVisibleModal(true)
    htmlToImage.toPng(document.getElementById('my-node'), { backgroundColor: '#FFFFFF' })
      .then(function (dataUrl) {
        var link = document.createElement('a')
        link.crossOrigin = 'Anonymous'
        link.download = 'qr-code.png'
        link.href = dataUrl
        link.click()
      })
  } */

  const downloadQRCode = () => {
    handleCloseImageModal()
    setOpenDownloadImage(true)
    // alert('state--'+openDownloadImage);
    const timer = setTimeout(() => {
      htmlToImage.toPng(document.getElementById('qr-img'),{backgroundColor:"white",height:600 , width:450 })
        .then(function (dataUrl) {
          var link = document.createElement('a')
          link.crossOrigin = 'Anonymous'
          link.download = 'qr-code.png'
          link.href = dataUrl
          link.click()
        })
    }, 1200)
    return () => clearTimeout(timer)
    setOpenDownloadImage(false)
  }

  const shareButtonProps = {
    url: "https://github.com/greglobinski/react-custom-share",
    network: "Facebook",
    text: "Give it a try - react-custom-share component",
    longtext:
      "Social sharing buttons for React. Use one of the build-in themes or create a custom one from the scratch."
  };

  const [isHidden, setIsHidden] = React.useState(true)
  const showShare = () => {
    setIsHidden(!isHidden)
  }

  const handleNotificationClose = () => {
    setOpenNotification(false);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Account Settings</p>
      </MenuItem>
      <MenuItem onClick={logout}>
        <IconButton aria-label='logout' aria-haspopup='true' color='inherit'>
          <Lock />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  )
  const shareUrl = 'http://github.com'
  const title = 'GitHub'

  const handleShowMe = () => {
    history.push('/notification')
    setOpenNotification(false);
  }

  const handleCheckLater = () => {
  setOpenNotification(false);
  }
  const LinkStyled = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
  }));
  return (
    <div className={clsx(classes.root, "main_wrapper")} style={{position: 'relative'}}>
     
        {
          (opemWelcomePopup)
            ? <VideoModal openpopup={opemWelcomePopup} businessCode={business_code} qrCode={user_qr_code_base64} businessName={sc_bessi_name} userdetails={userdetails} /> : ''
        }


        
        <Modal
          open={openNotification}
          onClose={handleNotificationClose}

        >
           <div style={{width: 420, position: 'absolute', top: '40%', left: '40%', backgroundColor: 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center', zIndex: 9999, padding: 20, paddingLeft: 25, paddingRight: 25 }}>
              <div style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', display: 'flex', marginBottom: 40}}>
                <span style={{fontSize: 18, color: 'red'}}>Alert</span>
                <Button variant='contained' color='transparent' onClick={handleNotificationClose} class="btnCross" >
                    <img src={require('../../assets/images/alert_clear.png')} height="12" width="12"/>
                </Button>

              </div>

              <p style={{fontSize: 18, color: '#1773BF', marginBottom: 15}}>Hi, <span style={{fontSize: 18, color: '#17BAFF', fontWeight: 'bold'}}>{sc_bessi_name}</span></p>

              <div style={{position: 'relative', height: 35, width: 26}}>
                <img src={require('../../assets/images/notifications_bell.png')} height="100%" width="100%" resizeMode="contain"/>
                <span style={{position: 'absolute', right: 0, top: 0, height: 10, width: 10, borderRadius: 5, backgroundColor: 'orange'}}></span>
              </div>

              <p style={{marginTop: 30, marginBottom: 30}}>You have more than 15 unread notifications.  Check to make sure nothing important has been missed.</p>

              <div style={{justifyContent: 'space-between', alignItems: 'center', display: 'flex', marginBottom: 30}}>
                  <Button variant='contained' color='primary' size='large' className='mr-10' style={{width: '48%', backgroundColor: '#575FCF'}} onClick={handleCheckLater}>
                    I'll check later
                  </Button>
                  <Button variant='contained' color='primary' size='large' className='mr-10' style={{width: '48%'}} onClick={handleShowMe}
                  >
                    Show Me
                  </Button>

              </div>
          </div>
        </Modal>

      <CssBaseline />
      <AppBar
        position='fixed'
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >

        {/* <div id='my-node' class='myNode' style={{ display: (visibleModal) ? 'block' : 'none' }}> */}



        <Toolbar>
          <Hidden mdDown implementation='css'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              onClick={handleDrawerOpen}
              edge='start'
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden lgUp implementation='css'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <img src={require('../../assets/images/logo.png')} style={{ height: '46px', float: 'right' }} />
          </Hidden>

          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              {/* <IconButton color='primary'>
                <SearchIcon style={{ fontSize: 30, color: '#1872c0' }} />
              </IconButton> */}
            </div>
            {/* <InputBase
                placeholder='Search…'
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
              /> */}
          </div>
          <div className={classes.sectionDesktop}>
            <ul className="header-nav">
              <li className="help-btn">
                <img src="/assets/images/help-icon.svg" style={{ marginRight: 24, cursor: 'pointer' }} />
                <div className="resources-popup-box">
                  <div className="box-header">
                    <img src="/assets/images/rymindr-log.png" />
                    <h4>Hi {sc_bessi_name}!</h4>
                    <p>Connecting people through important Rymindrs!
                    </p>
                  </div>
                  <div className="box-container">
                    <h5>Resource Center</h5>
                    <p>Get started with these tools below or see
                      <a href>what's new</a>
                    </p>
                    <div className="nav-listing">
                      <ul>
                        <li>
                          <a href='https://rymindr.com/knowledge/' target='_blank' style={{cursor: 'pointer'}} >
                            <img src="/assets/images/onboarding.png" />
                            <span>Onboarding</span>
                          </a>
                        </li>
                        <li>
                          <a href>
                            <img src="/assets/images/Videos.png" />
                            <span>Video</span>
                          </a>
                        </li>
                        <li>
                          <a href='https://rymindr.com/knowledge/' target='_blank' style={{cursor: 'pointer'}}>
                            <img src="/assets/images/docs-faq.png" />
                            <span>Docs and FAQ's</span>
                          </a>
                        </li>
                        <li>
                          {/* <a href>
                            <img src="/assets/images/demo.png" />
                            <span>Demo</span>
                          </a> */}

                          <LinkStyled  onClick={openDemoPopup} >
                            <img src="/assets/images/demo.png" />
                            <span>Demo</span>
                          </LinkStyled>
                        </li>
                        <li>
                          <a href>
                            <img src="/assets/images/community.png" />
                            <span>Community</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h5>Support</h5>
                    <div className="nav-listing">
                      <ul>
                        <li>

                        <LinkStyled
                          
                          to={'rymindrs'}
                         >
                           <img src="/assets/images/connect-with.png" />
                          <span>Connect with Rymindr</span>
                        </LinkStyled>
                          {/* <a href>
                            <img src="/assets/images/connect-with.png" />
                            <span>Connect with Rymindr</span>
                          </a> */}
                        </li>
                        <li>
                          <LinkStyled  onClick={() => { window.open('https://rymindr.canny.io/feature-requests', '_blank'); }} >
                            <img src="/assets/images/bulb.png" />
                            <span>Request a feature
                            </span>
                          </LinkStyled>
                        </li>
                        <li>

                        <LinkStyled  onClick={() => { window.open('https://rymindr.canny.io/bugs', '_blank'); }} >
                            <img src="/assets/images/bug.png" />
                            <span>Report a bug
                            </span>
                          </LinkStyled>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <a href className="still-need-help">Still Need Help?
                    <img src="/assets/images/need-help.png" /> </a>
                </div>
              </li>
            </ul>
          </div>
          <div className={classes.sectionDesktop}>
            <img src={require('../../assets/images/qr.png')} onClick={() => handleClickImageOpen(user_qr_code, user_qr_code_base64, business_code)} style={{ height: '20px', marginRight: '10px', cursor: 'pointer' }} />
          </div>

          {/* QR CODE POPUP */}
          <Dialog open={openImage} onClose={handleCloseImageModal} aria-labelledby='form-dialog-title' maxWidth='sm' fullWidth>
            <DialogTitleStyled id='form-dialog-title'>
              <Box display='flex' justifyContent='space-between' alignItems='center'>
                <Box display='flex'>
                  <TypoPopHeadStyled>QR Code</TypoPopHeadStyled>
                </Box>
                <IconButton color='default' onClick={handleCloseImageModal}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitleStyled>
            <DialogContentStyled>
              <TypoBusStyled component='h2'>{sc_bessi_name}</TypoBusStyled>
              <TypoTxtStyled>Scan</TypoTxtStyled>
              {
                user_qr_code ? (
                  <img alt='semy Sharp' style={{ height: 280, width: 280 }} src={user_qr_code} />
                ) : ''
              }
              <TypoTxtStyled>or enter code</TypoTxtStyled>
              <TypoTxtLrgStyled>{business_code}</TypoTxtLrgStyled>

              <Box display='flex' justifyContent='space-around' mt={3} mb={3}>
                <Button onClick={downloadQRCode} style={{marginRight:'8px'}}><GetApp color='primary' style={{ marginRight: 17 }} /> Download</Button> 
                {/* <Button onClick={showShare}><Share color='primary' style={{ marginRight: 20 }} /> Share</Button> */}
              </Box>

              {!isHidden &&
                <Box display='flex' justifyContent='space-around' mt={3} mb={3}>
                  {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 50 }} src={require('../../assets/images/ic_g+.png')} /></Link>
                  <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_in.png')} /></Link> */}
                  <LinkedinShareButton
                    url='https://www.linkedin.com/company/rymindr'
                    quote='Rymindr'
                    className='Demo__some-network__share-button'
                    imageUrl={user_qr_code}
                  >
                    <LinkedinIcon size={48} round />
                  </LinkedinShareButton>

                  {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_twitter.png')} /></Link>
                  <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_fb.png')} /></Link> */}
                  <FacebookShareButton
                    url='https://www.facebook.com/Rymindr/'
                    quote='Rymindr'
                    className='Demo__some-network__share-button'
                    image={user_qr_code}
                  >
                    <FacebookIcon size={48} round />
                  </FacebookShareButton>

                  {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_wts.png')} /></Link>
              <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_email.png')} /></Link> */}
                  <EmailShareButton>
                    <EmailIcon size={48} round />
                  </EmailShareButton>
                </Box>}
            </DialogContentStyled>
          </Dialog>
          {/* QR CODE POPUP */}

          {/* QR CODE DOWNLOAD POPUP */}
          <Dialog className='myNode' id='my-node' open={openDownloadImage} onClose={handleCloseDownloadModal} aria-labelledby='form-dialog-title' maxWidth='xs' fullWidth>
            <div  id='qr-img'>
            <DialogContentStyled >
              <div className='logoHeadOverWrite'>
                <img src={require('../../assets/images/rymindr_smiles_logo.png')} />
              </div>
              <h1 className='h1OverWrite'>{sc_bessi_name}</h1>
              <p className='pOverwrite'>Scan</p>
              <img src={qrCodeBase64} className='qrCode' />
              <p className='pOverwrite'>Or enter code</p>
              <h4 className='h4OverWrite'>{businessCode}</h4>
              {/* <div className='poweredBy'> */}
                <p className='pOverwrite'>Powered by</p>
              {/* </div> */}
              <div>
              <img src={require('../../assets/images/rymindr_original.png')} style={{ height: '52px' }} />
              </div>

            </DialogContentStyled>
            </div>
          </Dialog>
          {/* QR CODE DOWNLOAD POPUP */}

          {/*
            (userdetails.first_login == 1)
              ? <VideoModal businessCode={business_code} qrCode={user_qr_code_base64} businessName={sc_bessi_name} userdetails={userdetails} /> : ''
          */}

          <div className={classes.sectionDesktop}>
            <NotificationMenu />
            <AvatarMenu logout={() => logout()} />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {/* {renderMenu} */}
      <Hidden lgUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <Sidebar />
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation='css'>
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <img src={require('../../assets/images/logo.png')} style={{ marginRight: '50px', height: '50px' }} />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Sidebar />
        </Drawer>
      </Hidden>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open
        }, "main_cont_wrap")}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route path='/payments' component={Payments} />
          <Route path='/integrations' component={Integrations} />
          <Route path='/credits' component={Credits} />
          <Route path='/resources' component={Resources} />
          <Route path='/shop' component={Shop} />
          <Route path='/rewards' component={Rewards} />
          <Route path='/fundraisers' component={Fundraisers} />
          <Route exact path='/rymindrs' component={UpcomingRymindr} />
          <Route exact path='/rymindrs/:param/:paramType' component={UpcomingRymindr} />
          <Route exact path='/form-builders' component={FormBuilders} />
          <Route exact path='/form-templates' component={FormTemplates} />
          <Route exact path='/submitted-exams/:exam_id' component={SubmittedExams} />
          <Route path='/notification' component={Notification} />
          <Route exact path='/create-rymindr' component={CreateRymindr} />
          <Route exact path='/create-rymindr/:group_id/:member_id/:get_name' component={CreateRymindr} />
          <Route exact path='/live-chat' component={LiveChat} />
          <Route exact path='/live-chat/:chat_id/:chat_type' component={LiveChat} />
          <Route path='/message-center' component={MessageCenter} />
          <Route path='/edit-rymindr/:rymindr_id' component={EditRymindr} />
          <Route path='/contacts' component={Contacts} />
          <Route path='/term-dates-holidays' component={TermDatesHolidays} />
          <Route path='/bookings' component={Bookings} />
          <Route exact path='/event-bookings' component={EventBookings} />
          <Route exact path='/event-bookings/:group_id/:member_id/:get_name' component={EventBookings} />
          <Route exact path='/event-bookings/:ID' component={EventBookings} />
          <Route exact path='/event-bookings-duplicate/:ID' component={EventBookingDuplicate} />
          <Route exact path='/manage-booking/:ID' component={ManageBooking} />
          <Route exact path='/booking-view/:ID' component={ManageBookingView} />
          <Route path='/calendar' component={Calendar} />
          <Route exact path='/direct-message' component={DirectMessage} />
          <Route exact path='/direct-message/:group_id/:member_id/:get_name' component={DirectMessage} />
          <Route exact path='/direct-message/:ID' component={DirectMessage} />
          <Route path='/live-feed' component={LiveFeed} />
          <Route path='/rymindr-news' component={RymindrNews} />
          <Route path='/account-settings' component={AccountSettings} />
          <Route path='/resources' component={Resources} />
          <Route path='/history-rymindrs' component={HistoryRymindrs} />
          <Route path='/' component={Dashboard} />
        </Switch>
      </main>
    </div>
  )
}

// export default Layout;
const mapStateToProps = ({ account, notification }) => {
  return {
    loading: account.loading,
    error: account.error,
    userdetails: account.userdetails,
    isTriggerNotify: notification.isTriggerNotify,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (data) => dispatch(getUserDetails(data))
  }
}

Layout.propTypes = {
  getUserDetails: PropTypes.func.isRequired,
  userdetails: PropTypes.any.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout)
