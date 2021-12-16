import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, styled } from '@material-ui/core/styles'

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main
}))

const DeleteRymindr = ({ handleClose, open, deleteRymindr ,type}) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' />
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this {type} ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <ButtonStyled autoFocus onClick={handleClose}>
            No
          </ButtonStyled>
          <Button onClick={deleteRymindr} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};

DeleteRymindr.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deleteRymindr: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
}

export default DeleteRymindr
