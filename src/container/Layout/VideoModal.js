import {
  Link,
  DialogContent,
  Box,
  DialogTitle,
  Dialog,
  Button,
  Grid,
  Paper,
  Typography
} from '@material-ui/core'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { makeStyles, styled } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
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

const DialogContentStyled = styled(DialogContent)({
  textAlign: 'center', paddingLeft: 30, paddingRight: 30, paddingBottom: 30
})
const TypoTxtStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 14,
  fontWeight: '500',
  letterSpacing: 1.25,
  lineHeight: 28 + 'px'
}))

const TypoTxtBoldtyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 18,
  fontWeight: '500',
  letterSpacing: 1.6,
  marginTop: 45,
  marginBottom: 20
}))

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
  fontWeight: 'bold'
}))

const TypoCodeStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 24,
  fontWeight: '600',
  marginTop: 10
}))

const VideoModal = (props) => {
  const classes = useStyles()
  const { businessCode, businessName, qrCode, openpopup,userdetails } = props
  const [openVideoPop, setOpenVideoPop] = React.useState(true)
  const history = useHistory()

  const handleClickVideoOpen = () => {
    setOpenVideoPop(true)
  }
  const handleCloseVideoModal = () => {
    
    let tempUserData = JSON.parse(localStorage.getItem('userData'));

    const {
      user_id,
      business_code,
      country_name,
      device_token,
      notification_status,
      notification_chat_status,
      notification_post_status,
      notification_msg_center_status,
      profile_image,
      first_name,
      last_name,
      sc_bessi_name,
      address,
      post_code,
      email,
      mobile_no,
      account_type,
      default_category
    } = tempUserData;

    const first_login = 0;

    const userData = {
      user_id,
      business_code,
      country_name,
      device_token,
      notification_status,
      notification_chat_status,
      notification_post_status,
      notification_msg_center_status,
      profile_image,
      first_name,
      last_name,
      sc_bessi_name,
      address,
      post_code,
      email,
      mobile_no,
      account_type,
      first_login,
      default_category
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    setOpenVideoPop(false)
  }
  useEffect(() => {
    if(openpopup){
      setOpenVideoPop(true)
    }
  }, [openpopup])
  const handleResourceLink = () => {
	  setOpenVideoPop(false)
	  history.push('/resources')
  }
  const handleContactLink = () => {
	  setOpenVideoPop(false)
	  history.push('/contacts')
  }
  const handleHelpLink = () => {
	  setOpenVideoPop(false)
	  history.push('/resources')
  }
  console.log('userdetails', userdetails)

  return (
    <Dialog open={openVideoPop} onClose={handleCloseVideoModal} aria-labelledby='form-dialog-title' maxWidth='lg' fullWidth>
      <DialogContentStyled className="welcome-wrap">
        <Grid className="welcome-head" container spacing={3} justify='center' alignItems='center'>
          <Grid item xs className="wc-logo-left">
            <img src={require('../../assets/images/login_logo.png')} style={{ height: '80px', float: 'left' }} />
          </Grid>
          <Grid item xs className="wc-text-center">
            <TypoHeadStyled variant='h4'>
              Welcome to rymindr
            </TypoHeadStyled>
          </Grid>
          <Grid item xs className="wc-logo-right">
            <img src={require('../../assets/images/rymindr_smiles_logo.png')} style={{ height: '45px', float: 'right' }} />
          </Grid>
        </Grid>
        <Grid className="welcome-body" container spacing={3} style={{ marginTop: 30 }}>
          <Grid item xs className="video-frame-box">
            <iframe className="video-frame" width='500' height='315' src='https://www.youtube.com/embed/WBimqlCMEB0' frameborder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowfullscreen='allowfullscreen' />
          </Grid>
        </Grid>

        <TypoTxtBoldtyled className="welcm-hello-ttl">Hi {userdetails.contact_person}, great to have you and {businessName} on board!  </TypoTxtBoldtyled>
        <TypoTxtStyled className="welcm-hello-text">Your new Rymindr account is Ready, Lets get you started with some important information:</TypoTxtStyled>

        <Grid className="welcm-qrCode-box" container spacing={3}>
          <Grid item xs>
            <Box display='flex' justifyContent='center' alignItems='center'>
              <Box className="qrCode-fig">
                  <img src={require('../../assets/images/displayqr.png')} />
              </Box>
              <Box className="qr_code_no">
                <TypoTxtStyled className="qr__code__txt">code</TypoTxtStyled>
                <TypoCodeStyled>{businessCode}</TypoCodeStyled>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <TypoTxtStyled className="welcm-info-msg">By sharing these codes Rymindr users can easily connect with you. For more information and how-to-instructions, visit our <Link style={{ cursor: 'pointer' }} onClick={handleResourceLink}>Resource Centre</Link> from your Dashboard. Now you’re all set to set to send Rymindrs, instant messages and notifications.</TypoTxtStyled>
        <Box className="welcm-cont-help" display='flex' justifyContent='center' mt={2} mb={3}>
          <Box mr={5}><TypoTxtStyled><Link style={{ cursor: 'pointer' }} onClick={handleHelpLink}>Need Help?</Link></TypoTxtStyled></Box>
          <Box><TypoTxtStyled><Link style={{ cursor: 'pointer' }} onClick={handleContactLink}>Contact Us</Link></TypoTxtStyled></Box>
        </Box>
        <Button className="get-start-btn" variant='contained' color='primary' size='large' onClick={handleCloseVideoModal}>GET STARTED</Button>

      </DialogContentStyled>
    </Dialog>
  )
}

export default VideoModal
