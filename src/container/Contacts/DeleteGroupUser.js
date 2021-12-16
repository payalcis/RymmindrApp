import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, styled } from '@material-ui/core/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const DeleteGroupUser = ({ handleClose, open, deletUseraccount }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete your account ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletUseraccount} color="primary" autoFocus>
            Yes
          </Button>
          <ButtonStyled autoFocus onClick={handleClose}>
            No
          </ButtonStyled>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteGroupUser.propTypes = {
  handleClose: PropTypes.func.isRequired,
  deletUseraccount: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default DeleteGroupUser;
