import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
const CircularProgressstyled = styled(CircularProgress)({
  color: green[500],
  position: 'absolute',
  top: '50%',
  left: '50%',
  marginTop: -12,
  marginLeft: -12
});

const CircularSpinner = () => {
  return <CircularProgressstyled size={24} />;
};
export default CircularSpinner;
