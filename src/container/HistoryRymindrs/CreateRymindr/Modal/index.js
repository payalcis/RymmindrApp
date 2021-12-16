import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import Tabmenu from './Memberlist'
import { styled } from '@material-ui/core/styles'

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0
})

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20
})

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600'
}))

export default function ConfirmationDialogRaw (props) {
  const { onClose, value: valueProp, open, ...other } = props
  const [value, setValue] = useState(valueProp)

  useEffect(() => {
    console.log(open)
    if (!open) {
      setValue(valueProp)
    }
  }, [valueProp, open])

  const handleCancel = () => {
    setValue(false)
    onClose(!open)
  }

  const handleOk = () => {
    onClose(!open)
  }
  return (
    <Dialog
      fullWidth
      maxWidth='md'
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      <DialogTitleStyled id='form-dialog-title'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <TypoPopHeadStyled>Contacts</TypoPopHeadStyled>
          <IconButton color='default' onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitleStyled>
      <DialogContent>
        {props.children}
        {/* <Tabmenu groupdata={props.groupdata} memberdata={props.memberdata} /> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color='primary'>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
}
