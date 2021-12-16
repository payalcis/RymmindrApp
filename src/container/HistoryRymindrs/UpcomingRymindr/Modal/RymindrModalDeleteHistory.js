import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, styled } from '@material-ui/core/styles'

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main
}))

const DeleteRymindrHistory = ({ handleCloseHistory, open, clearHistory  }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleCloseHistory} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' />
        <DialogContent>
          <DialogContentText>Cleared Rymindrs not recoverable.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonStyled autoFocus onClick={handleCloseHistory}>
            Cancel
          </ButtonStyled>
          <Button onClick={clearHistory} color='primary' autoFocus>
          Confirm 
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

DeleteRymindrHistory.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deleteRymindr: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default DeleteRymindrHistory
