import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, styled } from '@material-ui/core/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const DeleteMember = ({ handleCloseMember, openMember, deleteContact }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={openMember} onClose={handleCloseMember} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this contact ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteContact} color="primary" autoFocus>
            Yes
          </Button>
          <ButtonStyled autoFocus onClick={handleCloseMember}>
            No
          </ButtonStyled>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteMember.propTypes = {
    handleCloseMember: PropTypes.func.isRequired,
    deleteContact: PropTypes.func.isRequired,
    openMember: PropTypes.bool.isRequired,
};

export default DeleteMember;
