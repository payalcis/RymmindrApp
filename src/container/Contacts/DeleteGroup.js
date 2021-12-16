import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, styled } from '@material-ui/core/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  color: theme.palette.error.main,
}));

const DeleteGroup = ({ handleCloseGroup, openGroup, deletGroupUserGroup }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={openGroup} onClose={handleCloseGroup} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title"></DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this group ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deletGroupUserGroup} color="primary" autoFocus>
            Yes
          </Button>
          <ButtonStyled autoFocus onClick={handleCloseGroup}>
            No
          </ButtonStyled>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DeleteGroup.propTypes = {
    handleCloseGroup: PropTypes.func.isRequired,
    deletGroupUserGroup: PropTypes.func.isRequired,
    openGroup: PropTypes.bool.isRequired,
};

export default DeleteGroup;
