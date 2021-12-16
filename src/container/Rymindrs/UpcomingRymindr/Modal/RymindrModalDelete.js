import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme, styled } from '@material-ui/core/styles'
import React, { useEffect, useMemo, useState } from 'react'

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main
}))

const DeleteRymindr = ({ handleClose, open, deleteRymindr }) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [reason, setReason] = useState(null)

  const handleChange = (e) => {
    setReason(e.target.value)
  }

  const handleCloseWithValue = () => {
    deleteRymindr(reason)
  }
 
  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title' />
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this Rymindr ?</DialogContentText>
        </DialogContent>
        <TextField
          id='outlined-select-currency'
          label='Reason(Optional)'
          value={reason}
          fullWidth
          onChange={handleChange}
          variant='outlined'
          name='reason'
          rows={4}
          rowsMax={100}
          multiline
          style={{width: '90%', alignSelf: 'center'}}
        ></TextField>
        <DialogActions>
          <ButtonStyled autoFocus onClick={handleClose}>
            No
          </ButtonStyled>
          <Button onClick={handleCloseWithValue} color='primary' autoFocus>
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
