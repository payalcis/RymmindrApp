import { Button, Typography, TextField, Grid } from '@material-ui/core'
import React, { useMemo, useState } from 'react'
import CircularSpinner from '../../component/CircularSpinner'
import { Delete } from '@material-ui/icons'
import DeleteUserModal from './deletUserModal'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteUserAccount } from '../../store/actions/accountsettingAction'
import { styled } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'
import { withSnackbar } from 'notistack'

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  fontWeight: '600',
  paddingTop: 20
}))

const TypoSubStyled = styled(TypoStyled)(({ theme }) => ({
  fontSize: 16,
  fontWeight: '500',
  marginBottom: 30
}))

const TypoVerifiStyled = styled(TypoStyled)(({ theme }) => ({
  fontSize: 16,
  fontWeight: '500',
  marginTop: 20
}))

const ButtonDanger = styled(Button)(({ theme }) => ({
  background: '#FD7F7F',
  color: theme.palette.warning.contrastText,
  marginBottom: 50
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  width: 170
}))

const DeleteAccount = (props) => {
  const { deleteUserAccount, enqueueSnackbar, error, loading, success_message } = props
  const history = useHistory()
  const { user_id, email } = JSON.parse(localStorage.getItem('userData'))
  const [open, setOpen] = useState(false)
  const [accountDeletedMailSent, setAccountDeletedMailSent] = useState(false);

  const handleClose = () => {
    setOpen(false)
  }

  const deletUseraccount = async () => {
    setOpen(false)
    //const delAcc = { user_id, email: sessionStorage.getItem('email') }
    const delAcc = { user_id, email }
    const deleted = await deleteUserAccount(delAcc);

    if(deleted.status === true )
      setAccountDeletedMailSent(true);
  }

  const handleOpen = () => {
    setOpen(true)
  }
  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' })
  }, [error])

  useMemo(() => {
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);

  // Message to be shown when account delete mail has been sent!
  let deletedMailSentInfo = null;
  if(accountDeletedMailSent) {
    deletedMailSentInfo = (
      <>
        <TypoStyled>Didn't receive the email?</TypoStyled>
        <TypoSubStyled>
          -Check your Spam or Junk folder just in case. <br />
          -It can take up to 10 mins during busy periods.  Maybe worth waiting.
        </TypoSubStyled>
        <TypoStyled>Need help?  Email us on support@rymindr.com </TypoStyled>
      </>
    );
  }

  return (
    <div style={{ paddingLeft: 25, paddingRight: 25 }}>
      <DeleteUserModal open={open} handleClose={handleClose} deletUseraccount={deletUseraccount} />
      <TypoStyled>Delete my Rymindr account</TypoStyled>
      <TypoSubStyled>
        1. We'll keep your Rymindrs and connection live for 30 days, just in case. <br />
        2. After 30 days all Rymindrs, connections, messages, comments and posts will be removed and irrecoverable.
      </TypoSubStyled>

      <ButtonDanger variant='contained' color='primary' onClick={handleOpen} startIcon={<Delete />} disabled={loading || deletedMailSentInfo}>
        {loading && <CircularSpinner />}
        Delete Account
      </ButtonDanger>
      {deletedMailSentInfo}
    </div>
  )
}

const mapStateToProps = ({ account }) => {
  return {
    loading: account.loading,
    error: account.error,
    success_message: account.success_message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteUserAccount: (data, history) => dispatch(deleteUserAccount(data, history))
  }
}

DeleteAccount.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  deleteUserAccount: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(DeleteAccount))
