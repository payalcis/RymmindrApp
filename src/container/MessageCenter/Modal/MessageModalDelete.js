import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Divider } from '@material-ui/core';
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, styled } from '@material-ui/core/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const FormFields = {
  category:'term',
  message:'',
}

const DeleteRymindr = ({ handleClose, open, deleteMsg }) => {
  const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	const [formValue, setFormValue] = useState(FormFields)
	const [formValidation, setFormValidation] = useState(FormFields)
	
	const handleinput = (e) => {
    const formdata = { ...formValue}
    const { name, value } = e.target;
    const formvalidation = { ...formValidation }
        if (name === 'message') {
					formdata.message = value
					formvalidation.message = ''
        setFormValidation(formvalidation)
        }
        else {
          formdata[name] = value
        }
    setFormValue(formdata)
  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this message?</DialogContentText>
          {/* <Divider variant='inset' component='li' /> */}
            <Grid item xs={12}>
              <TextField label='Reason(Optional)'  
              name="message" 
              fullWidth variant='outlined' 
              value={formValue.message} 
              onChange={handleinput}
              error={!!formValidation.message}
              helperText={formValidation.message}
              fullWidth
            />
            </Grid>
        </DialogContent>
        <DialogActions>
          <ButtonStyled autoFocus onClick={handleClose}>
            No
          </ButtonStyled>
          <Button onClick={deleteMsg} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteRymindr.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deleteMsg: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DeleteRymindr;
