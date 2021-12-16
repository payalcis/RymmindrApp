import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography, DialogContent,
  Box,
  DialogTitle,
  Dialog,
  IconButton,

} from '@material-ui/core';
import { Close } from '@material-ui/icons'
import Share from '@material-ui/icons/Share'
import {
  FacebookIcon,
  LinkedinIcon,
  EmailIcon,
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton
} from 'react-share'
import GetApp from '@material-ui/icons/GetApp'
import React, { useEffect, useMemo, useState } from 'react';
import { genrateQrCode, getUserDetails } from '../../store/actions/accountsettingAction';
import CircularSpinner from '../../component/CircularSpinner';
import CodeIcon from '@material-ui/icons/Code';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as htmlToImage from 'html-to-image';

import { styled } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';

const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 20,
}));

const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto',
  },
});

const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginBottom: 10,
}));

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
  fontWeight: 'bold',
}));

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  fontWeight: '600',
  padding: 35,
}));

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600'
}))

const DialogContentStyled = styled(DialogContent)({
  textAlign: 'center'
})

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

const BusinessAccount = (props) => {
  const { getUserDetails, enqueueSnackbar, error, loading, userdetails, genrateQrCode,success_message, container, isTriggerNotify } = props;
  const { business_code, user_id } = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    getUserDetails({ user_id });
  }, []);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {

    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);
  const genrate_code = () => {
    genrateQrCode({ user_id });
  };


  const [openImage, setOpenImage] = React.useState(false)
  const [qrCode, setQrCode] = React.useState('')
  const [qrCodeBase64, setQrCodeBase64] = React.useState('')
  const [businessCode, setBusinessCode] = React.useState('')
  const [isHidden, setIsHidden] = React.useState(true)
  const [openDownloadImage, setOpenDownloadImage] = React.useState(false)

  const showShare = () => {
    setIsHidden(!isHidden)
  }

  const handleClickImageOpen = (user_qr_code, user_qr_code_base64, business_code) => {
    setOpenImage(true)
    setQrCode(user_qr_code)
    setQrCodeBase64(user_qr_code_base64)
    setBusinessCode(business_code)
  }

  const handleCloseImageModal = () => {
    setOpenImage(false)
  }

  const downloadQRCode = () => {
    handleCloseImageModal()
    setOpenDownloadImage(true)
    // alert('state--'+openDownloadImage);
    const timer = setTimeout(() => {
      htmlToImage.toPng(document.getElementById('my-node'), { backgroundColor: '#FFFFFF' })
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

  const handleCloseDownloadModal = () => {
    // alert('clsoe')
    setOpenImage(false)
    setOpenDownloadImage(false)
  }

  const { user_qr_code = '' } = userdetails;
  const { user_qr_code_base64 = '' } = userdetails
  const { sc_bessi_name = '' } = userdetails

  return (
    <>
      <TypoStyled>You’re Unique Business code & QR is</TypoStyled>
      <ListStyled>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <CodeIcon color="primary" />
          </ListItemAvatar>
          <ListItemText
            primary={<TypoTitleStyled>Code</TypoTitleStyled>}
            secondary={<TypoContentStyled>{business_code}</TypoContentStyled>}
          />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem alignItems="flex-start" onClick={() => handleClickImageOpen(user_qr_code, user_qr_code_base64, business_code)}>
          <ListItemAvatar >
            <AvatarStyled alt="semy Sharp" variant="square" src={require('../../assets/images/qr.png')} />
          </ListItemAvatar>

          <ListItemText
            primary={<TypoTitleStyled>QR code</TypoTitleStyled>}
            secondary={
              user_qr_code ? (
                <img alt="semy Sharp" style={{ height: 80, width: 80 }} src={user_qr_code} />
              ) : (
                <Button variant="contained" color="primary" onClick={genrate_code} disabled={loading}>
                  {loading && <CircularSpinner />}
                  generate Qr Code
                </Button>
              )
            }
          />
        </ListItem>

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

              <Box display='flex' justifyContent='space-around' mt={4} mb={2}>
                <Button onClick={downloadQRCode}><GetApp color='primary' style={{ marginRight: 20 }} /> Download</Button> <Button onClick={showShare}><Share color='primary' style={{ marginRight: 20 }} /> Share</Button>
              </Box>

              {!isHidden &&
                <Box display='flex' justifyContent='space-around' mt={3} mb={3}>
                  {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 50 }} src={require('../../assets/images/ic_g+.png')} /></Link>
                  <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_in.png')} /></Link> */}
                  <LinkedinShareButton
                    url='https://www.linkedin.com/company/rymindr'
                    quote='Rymindr'
                    className='Demo__some-network__share-button'
                  >
                    <LinkedinIcon size={48} round />
                  </LinkedinShareButton>

                  {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_twitter.png')} /></Link>
                  <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_fb.png')} /></Link> */}
                  <FacebookShareButton
                    url='https://www.facebook.com/Rymindr/'
                    quote='Rymindr'
                    className='Demo__some-network__share-button'
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
          <Dialog className='myNode' id='my-node' open={openDownloadImage} onClose={handleCloseDownloadModal} aria-labelledby='form-dialog-title' maxWidth='sm' fullWidth>

            <DialogContentStyled>
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
          </Dialog>
          {/* QR CODE DOWNLOAD POPUP */}
      </ListStyled>
    </>
  );
};

const mapStateToProps = ({ account }) => {
  return {
    loading: account.loading,
    error: account.error,
    userdetails: account.userdetails,
    success_message: account.success_message

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetails: (data) => dispatch(getUserDetails(data)),
    genrateQrCode: (data) => dispatch(genrateQrCode(data)),
  };
};

BusinessAccount.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  userdetails: PropTypes.any.isRequired,
  genrateQrCode: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,

};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(BusinessAccount));
