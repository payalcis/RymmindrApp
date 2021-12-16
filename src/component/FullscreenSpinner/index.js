import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const CircularProgressstyled = styled(CircularProgress)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12,
});

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog fullScreen open={props.open} onClose={handleClose}>
        <CircularProgressstyled />
      </Dialog>
    </div>
  );
}
