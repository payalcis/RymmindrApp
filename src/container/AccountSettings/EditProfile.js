import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import CircularSpinner from '../../component/CircularSpinner';
import FileBase64 from 'react-file-base64';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import countries from './country.json';
import { updateProfile } from '../../store/actions/accountsettingAction';
import { withSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  container: { padding: '0 10%' },
  input: { display: 'none' },
  imgUpload: {
    position: 'absolute',
    background: theme.palette.primary.light,
    borderRadius: '60%',
    bottom: '-10px',
    right: '10px',
  },
}));
const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 17,
  color: theme.palette.text.primary,
  fontWeight: '600',
  paddingTop: 20,
  marginLeft: 25,
}));
const ButtonTypoStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const BoxStyled = styled(Box)(() => ({
  height: 130,
  width: 130,
  display: 'inline-block',
  margin: 'auto',
  position: 'relative',
}));

const AvatarStyled = styled(Avatar)(() => ({
  height: 130,
  width: 130,
}));

const EditProfile = (props) => {
  const {
    user_id,
    sc_bessi_name,
    account_type,
    address,
    post_code,
    email,
    mobile_no,
    country_name,
    profile_image,
  } = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData')) : {};

  console.warn('countries5454', countries);
  const formFields = {
    user_id,
    sc_bessi_name,
    // last_name,
    address,
    post_code,
    email,
    mobile_no,
    country_name: country_name ? country_name : countries[232].country,
    business_contact: '',
    profile_image: '',
  };
  const formValid = {
    sc_bessi_name : '',
    // last_name,
    address : '',
    email : '',
    post_code : '',
    mobile_no : '',
    country_name: '',
  };
  const classes = useStyles();
  const { updateProfile, enqueueSnackbar, error, sucess, loading, success_message } = props;
  const [values, setValues] = useState(formFields);
  const [formValidation, setFormValidation] = useState(formValid);
  const [files, setFiles] = useState();
  const [filesErr, setFilesErr] = useState('');
  const [account_types, setAccountType] = useState(account_type);
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  useMemo(() => {
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);

  const handlevalidation = () => {
    let error = false;
    // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    // var phoneno = /((0)|((\+|00)447)){1}[0-9]{10}\b/
    const formerr = { ...formValidation };
    
    if (!values.mobile_no) {
      error = true;
      formerr.mobile_no = 'Mobile no. is required!';
      setFormValidation(formerr);
    }
    else if (!((values.mobile_no).charAt(0) == "0")) {
      error = true;
      formerr.mobile_no = 'Invalid Mobile no.!';
      setFormValidation(formerr);
    }
    else if (isNaN(values.mobile_no)) {
      error = true;
      formerr.mobile_no = 'Invalid Mobile no.!';
      setFormValidation(formerr);
    }

    if (!values.address) {
      error = true;
      formerr.address = 'Address is required!';
      setFormValidation(formerr);
    }
    if (!values.sc_bessi_name) {
      error = true;
      formerr.sc_bessi_name = 'Name is required!';
      setFormValidation(formerr);
    }
    var postcodeRegEx = /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/;

    if (!values.post_code) {
      error = true;
      formerr.post_code = 'Post code is required!';
      setFormValidation(formerr);
    }
    else if (!postcodeRegEx.test((values.post_code).replace(/\s+/g, '').toUpperCase())) {
      error = true;
      formerr.post_code = 'Post code format is not correct!';
      setFormValidation(formerr);
    }

    if (!values.country_name){
      error=true;
      formerr.country_name="Country is required";
      setFormValidation(formerr)
    }
    return error;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (handlevalidation()) return false;
    values.account_type = account_types;
    values.business_contact = values.mobile_no;

    updateProfile(values);
  };

  const getFiles = (files) => {
    setFilesErr('');
    var extn = files.name.split('.');
    var etn = ['jpg', 'jpeg', 'png'];

    var low = extn[1].toLowerCase();
    if (etn.includes(low)) {
      setFiles(files);
      var image = files.base64.replace(/^data:image\/\w+;base64,/, '');
      updateProfile({ user_id, profile_image: image, ext: low });
      // console.log(sucess)
      setValues({ ...values, profile_image: image });
    } else {
      // error
      setFilesErr('This file not supportted');
      setValues({ ...values, profile_image: '' });
    }
  };

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  useMemo(() => {
    sucess && enqueueSnackbar(sucess, { variant: 'sucess' });
  }, [sucess]);


  return (
    <>
      <TypoStyled>Edit Profile</TypoStyled>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={5} className={classes.container}>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <BoxStyled>
              <AvatarStyled alt="Remy Sharp" src={files ? files.base64 : profile_image} />

              <FormControlLabel
                className="attachement"
                id="icon-button-file"
                control={
                  <FileBase64
                    // multiple={true}
                    accept="image/*"
                    onDone={getFiles}
                    className="displayNone"
                    style={{ display: 'none' }}
                  />
                }
                label={
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    className={classes.imgUpload}
                    component="span"
                  >
                    <PhotoCamera color="inherit" fontSize="small" />
                  </IconButton>
                }
              />
              <FormControl error={!!filesErr}>
                <FormHelperText>{filesErr}</FormHelperText>
              </FormControl>
            </BoxStyled>
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              id="fname"
              value={values.first_name}
              label="First Name"
              variant="outlined"
              fullWidth
              onChange={handleChange('first_name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="lname"
              value={values.last_name}
              label="Last Name"
              variant="outlined"
              fullWidth
              onChange={handleChange('last_name')}
            />
          </Grid> */}
          <Grid item xs={12} spacing={1}>
            <div className="cardBoxContainer" style={{ margin: 0 }}>
              {account_types === 'Education' ? (
                <div className="cardBox" onClick={() => setAccountType('Education')}>
                  <img src={require('../../assets/images/education.svg')} />
                  <ButtonTypoStyled variant="button">Education</ButtonTypoStyled>
                </div>
              ) : (
                <div className="cardBox" onClick={() => setAccountType('Business')}>
                  <img src={require('../../assets/images/business.svg')} />
                  <ButtonTypoStyled variant="button">Business</ButtonTypoStyled>
                </div>
              )}
            </div>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="sc_bessi_name"
              value={values.sc_bessi_name}
              label="School name"
              variant="outlined"
              fullWidth
              onChange={handleChange('sc_bessi_name')}
              error={!!formValidation.sc_bessi_name}
              helperText={formValidation.sc_bessi_name}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="address"
              value={values.address}
              label="Address"
              variant="outlined"
              fullWidth
              onChange={handleChange('address')}
              error={!!formValidation.address}
              helperText={formValidation.address}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="post_code"
              value={values.post_code}
              label="Postcode"
              variant="outlined"
              fullWidth
              onChange={handleChange('post_code')}
              error={!!formValidation.post_code}
              helperText={formValidation.post_code}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="email"
              value={values.email}
              label="Email"
              variant="outlined"
              fullWidth
              disabled
              onChange={handleChange('email')}
              error={!!formValidation.email}
              helperText={formValidation.email}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="mobile_no"
              value={values.mobile_no}
              label="Mobile no"
              variant="outlined"
              fullWidth
              onChange={handleChange('mobile_no')}
              error={!!formValidation.mobile_no}
              helperText={formValidation.mobile_no}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="Select Country"
              value={values.country_name}
              onChange={handleChange('country_name')}
              variant="outlined"
              error={!!formValidation.country_name}
              helperText={formValidation.country_name}
            >
              {countries.map((option) => (
                <MenuItem key={option.country} value={option.country}>
                  {option.country}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Box style={{ textAlign: 'center' }}>
              <Button variant="contained" color="primary" type="submit" disabled={loading}>
                {loading && <CircularSpinner />}
                SAVE PROFILE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
const mapStateToProps = ({ account }) => {
  return {
    loading: account.loading,
    error: account.error,
    sucess: account.error,
    success_message: account.success_message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (data) => dispatch(updateProfile(data)),
  };
};

EditProfile.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  sucess: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  updateProfile: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(EditProfile));
