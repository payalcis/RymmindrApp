import { Button, Grid, MenuItem, Typography, IconButton, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { Flag, Send, Close, BeachAccess } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import { makeStyles, styled } from '@material-ui/core/styles';

import { Link, useHistory, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getBusinessUsers, getGroups } from '../../store/actions/bookevent';

import { createTerm } from '../../store/actions/bookterm';

import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import CircularSpinner from '../../component/CircularSpinner/index';
import ConfirmationDialogRaw from '../Bookings/EventBooking/Modal';
import Tabmenu from '../Bookings/EventBooking/Modal/Memberlist';

const ButtonWarn = styled(Button)(({ theme }) => ({
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
}));

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20,
});

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));

const ButtonColor = styled(Button)(({ theme }) => ({
  background: theme.palette.props.main,
  color: theme.palette.props.contrastText,
}));
const AutocompleteStyled = styled(Autocomplete)({
  height: 154,
  '&>div': {
    margin: 0,
    '&>div': { height: 154, alignItems: 'flex-start' },
  },
});

const FormFields = {
  message: '',
  EventForm_to_group: '',
  eventForm_to: '',
  user_id: '',
  user_name: '',
  subject: '',
  category: '',
  isPrivate: false,
  // dynaminc_field: '',
  // allow_parents:'',
  set_date: '',
  end_date: '',
  // id:'',
};

const AddNewHolidayModal = (props) => {
  const { user_id, business_code, first_name, last_name, sc_bessi_name } = JSON.parse(localStorage.getItem('userData'));

  const {
    enqueueSnackbar,
    error,
    sucessTerm,
    getGroups,
    groups,
    matched_contact,
    businessusers,
    getBusinessUsers,
    createTerm,
    loading,
    handleedit1,
    UpdateTermlist,
    ...other
  } = props;

  const [formValue, setFormValue] = useState(FormFields);
  const [formValidation, setFormValidation] = useState(FormFields);
  const history = useHistory();

  let { ID } = useParams();

  useEffect(() => {
    const dataToSend = {
      user_id,
      category_id: '',
    };
    // props.getcategories(dataToSend)
    getGroups({ user_id });
    const SendToBusiness = {
      user_id,
      business_code,
    };
    getBusinessUsers(SendToBusiness);

    if (ID != undefined) {
      //  getBookListDetail({ID,user_id});
    }

    //setFormValue([...formValue, { message:bookdetails[0].message}] )
  }, []);

  useEffect(()=>{
    setContactList(businessusers)
  },[businessusers])

  const [checked, setChecked] = useState([]);
  const [memberchecked, setMemberchecked] = useState([]);
  const [group_members, setGroup_members] = useState([]);
  const [groupname_membersname, setGroupname_membersname] = useState([]);
  const [eventForm_to, setEventForm_to] = useState('');
  const [checkupdate, setCheckupdate] = useState(0);
  const [setDate, setDateChange] = useState();
  const [endDate, setEndDateChange] = useState();
  const [ContactList , setContactList] = useState([]);

  const handleClose = (newValue) => {
    setOpen(newValue);
    const membername = [];
    const groupname = [];
    groups.forEach((element) => {
      const checkvalue = checked.indexOf(element.group_id);
      if (checkvalue !== -1) {
        groupname.push(element.group_name);
      }
    });
    if (businessusers){
      businessusers.forEach((element) => {
      const checkvalue = memberchecked.indexOf(element.user_id);
      if (checkvalue !== -1) {
        membername.push(`${element.first_name} ${element.last_name}`);
      }
    });
    }
    

    setGroupname_membersname(groupname.concat(membername));
    if (memberchecked.length > 0) {
      setFormValue({ ...formValue, eventForm_to: memberchecked });
    }
    if (checked.length > 0) {
      setFormValue({ ...formValue, EventForm_to_group: checked });
    }

    const dataToSend = {
      mobile_no: phoneNumber.join(),
    };
    if (newValue) {
      // setValue(newValue);
    }
  };

  const handleGroupToggle = (value) => {
    const groupMembers = value.group_member_list;
    const currentIndex = checked.indexOf(value.group_id);
    const newChecked = [...checked];
    const selectedmember = [...group_members];

    if (currentIndex === -1) {
      newChecked.push(value.group_id);
      groupMembers.forEach((element) => {
        selectedmember.push(element.user_id);
      });
    } else {
      newChecked.splice(currentIndex, 1);
      groupMembers.forEach((element) => {
        const remomeitem = selectedmember.indexOf(element.user_id);
        selectedmember.splice(remomeitem, 1);
      });
    }
    const formvalidation = { ...formValidation };
    formvalidation.eventForm_to = '';
    setFormValidation(formvalidation);
    setFormValue({ ...formValue, eventForm_to: '' });
    setChecked(newChecked);
    setGroup_members(selectedmember);
  };
  const handleMemberToggle = (value) => {
    const currentIndex = memberchecked.indexOf(value.user_id);
    const newChecked = [...memberchecked];

    if (currentIndex === -1) {
      newChecked.push(value.user_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    const formvalidation = { ...formValidation };
    setFormValue({ ...formValue, eventForm_to: '' });
    formvalidation.eventForm_to = '';
    setFormValidation(formvalidation);

    setMemberchecked(newChecked);
  };

  const handleToopen = () => {
    setOpen(true);
  };
  const handleToTagvalue = (value) => {
    setPhoneNumber(value);
  };

  const [phoneNumber, setPhoneNumber] = useState([]);

  const [state, setState] = useState({
    checkedB: true,
    switch: true,
  });
  //const [selectedDate, handleDateChange] = useState(new Date())
  // const [selectedTime, handleTimeChange] = useState(new Date())
  const handleDateChange = (e) => {
    const date = new Date(e);
    const selecteddate = moment(date).format('YYYY-MM-DD');
    // const currentDate = moment(new Date()).format('YYYY-MM-DD')
    setDateChange(selecteddate);
    // setEndDateChange(currentDate);
    const formvalidation = { ...formValidation };
    formvalidation.set_date = '';

    if (selecteddate > endDate) {
      formvalidation.end_date = 'End date must be greater than start date'
      setFormValidation(formvalidation)
    } else {
      formvalidation.end_date = ''
      setFormValidation(formvalidation)
    }
    setFormValue({ ...formValue, set_date: selecteddate, end_date: endDate });
  };

  // const handleEndDateChange = (e) => {
  //   const date = new Date(e)
  //   const selecteddate = moment(date).format('YYYY-MM-DD')
  //   setEndDateChange(selecteddate)
  //   const formvalidation = { ...formValidation }
  //   formvalidation.end_date = ''
  //   setFormValidation(formvalidation)
  //   setFormValue({ ...formValue, end_date: selecteddate })
  // }

  const handleEndDateChange = (e) => {
    const formvalidation = { ...formValidation };
    const date = new Date(e);
    const selectedenddate = moment(date).format('YYYY-MM-DD');
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const startDate = moment(setDate).format('YYYY-MM-DD');
    console.log('startDate===', startDate);
    console.log('selectedenddate===', selectedenddate);
    if (currentDate >= selectedenddate) {
      formvalidation.end_date = 'You can not choose a date before the current date.';
      setFormValidation(formvalidation);
      setEndDateChange(selectedenddate)
      setFormValue({ ...formValue, end_date: selectedenddate });
    } 
    else if (startDate > selectedenddate) {
      setEndDateChange(selectedenddate)
      formvalidation.end_date = 'End date must be greater than start date';
      setFormValidation(formvalidation);
      setFormValue({ ...formValue, end_date: selectedenddate });
    } 
    else {
      setEndDateChange(selectedenddate);
      formvalidation.end_date = '';
      setFormValidation(formvalidation);
      setFormValue({ ...formValue, end_date: selectedenddate });
    }
    if (formValue.set_date==''){
      setDateChange(currentDate)
      formvalidation.set_date = '';
      setFormValue({...formValue,set_date:currentDate})
      setFormValidation(formvalidation);
    }
  };
  
  const [open, setOpen] = React.useState(false);

  const [openg, setOpeng] = React.useState(false);
  const [open1 , setOpen1] =useState(false);
  const [isPrivate, setIsPrivate] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCancel = () => {
    setOpen1(false);
  };

  const handleClickOpen1 = () => {
    if (ContactList.length>0 )
    {
      setOpeng(true);
    }
    else{
      setOpen1(true)
    }
  };

  const handleClose1 = () => {
    setOpeng(false);
    setDateChange('');
    setEndDateChange('');
    setGroup_members([]);
    setMemberchecked('');
    // setFormValue('')
    setIsPrivate(false);
    setMemberchecked([]);
    setGroupname_membersname([]);
    setFormValue(FormFields);
    setFormValidation(FormFields);
  };

  const handleinput = (e) => {
    const formdata = { ...formValue };
    const { name, value } = e.target;
    const formvalidation = { ...formValidation };
    if (name === 'message') {
      formdata.message = value;
      formvalidation.message = '';
      setFormValidation(formvalidation);
    } else if (name === 'subject') {
      formdata.subject = value;
      formvalidation.subject = '';
      setFormValidation(formvalidation);
    } else {
      formdata[name] = value;
    }
    setFormValue(formdata);
  };

  const validate = () => {
    const formvalidation = { ...formValidation };
    let isError = false;

    if (!formValue.message) {
      isError = true;
      formvalidation.message = 'Please add Term Title';
      setFormValidation(formvalidation);
    }
    if (!formValue.subject) {
      isError = true;
      formvalidation.subject = 'Please add term name';
      setFormValidation(formvalidation);
    }
    if (!formValue.eventForm_to && isPrivate && !formValue.EventForm_to_group && isPrivate) {
      isError = true;
      formvalidation.eventForm_to = 'Please add contact';
      setFormValidation(formvalidation);
    }
    if (!formValue.set_date) {
      isError = true;
      formvalidation.set_date = 'Please Select valid Start Date';
      setFormValidation(formvalidation);
    }
 
    if (!formValue.end_date) {
      isError = true;
      formvalidation.end_date = 'Please Select valid End Date';
      setFormValidation(formvalidation);
    }

    if(formvalidation.end_date){
      isError=true;
    }

    return isError;
  };

  const handleChangeCheck = (event) => {
    setIsPrivate(event.target.checked);
    // setState({ ...state, [event.target.name]: event.target.checked })
    setFormValue({ ...formValue, isPrivate: event.target.checked });
  };

  const handleToSubmit = () => {
    if (validate()) return false;

    const formFeilds = { ...formValue };
    // if (validate()) return false
    const EventFormField = { ...formFeilds };
    if (checked.length > 0) {
      EventFormField.EventForm_to_group = checked.join();
    }

    if (group_members.length > 0) {
      EventFormField.EventForm_group_members_to = [...new Set(group_members)].join();
    }
    EventFormField.user_id = user_id;
    EventFormField.user_name = first_name ? first_name : sc_bessi_name;
    if (memberchecked.length > 0) {
      EventFormField.eventForm_to =
        matched_contact !== null ? memberchecked.join() + ',' + matched_contact.user_id : memberchecked.join();

      // EventFormField.eventForm_to = memberchecked.join()
    }
    const unmatch = matched_contact ? matched_contact.mobile_no : '';
    const sendAttachment = '';
    EventFormField.category = 'term';
    console.log('EventFormField=====', EventFormField);
    // return false;
    if (checkupdate) {
      // updateEventbook(EventFormField, unmatch, history, sendAttachment);
    } else {
      createTerm(EventFormField, unmatch, history, sendAttachment);
      UpdateTermlist(EventFormField);
      setOpeng(false);
    }
    setIsPrivate(false);
    formValue.message = '';
    formValue.subject = '';
    setEventForm_to('');
    setDateChange();
    setEndDateChange();
    setGroup_members('');
    setGroupname_membersname('');
    setChecked([]);
    setMemberchecked('');
    setFormValue(FormFields);
    setFormValidation(FormFields);
    // formValue.eventForm_to = ''
    // formValue.set_date = new Date()
    // formValue.end_date = new Date()
  };

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  // useMemo(() => {
  //   setOpeng(false);
  //   sucessTerm && enqueueSnackbar(sucessTerm, { variant: 'success' });
  // }, [sucessTerm])

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen1}
        className="mr-10"
        startIcon={<Flag />}
      >
        Add new term
      </Button>

      <Dialog
          fullWidth
          maxWidth="md"
          disableBackdropClick
          disableEscapeKeyDown
          aria-labelledby="confirmation-dialog-title"
          open={open1}
          {...other}
        >
          <Box display="flex" justifyContent="end" alignItems="center" style={{ margin: '1rem' }}>
            <IconButton color="default" onClick={handleCancel}>
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent style={{ margin: '2rem 6rem 2rem 6rem', textAlign: 'center' }}>
            <h6 style={{ letterSpacing: '0.4px', paddingLeft: '1rem' }}>
              You'll need to have at least 1 contact to enable this feature.
            </h6>
          </DialogContent>
          <Box display="flex" justifyContent="center" style={{ marginBottom: '5rem' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                history.push('/contacts');
              }}
            >
              Add Contacts
            </Button>
          </Box>
        </Dialog>

      <Dialog open={openg} onClose={handleClose1} aria-labelledby="form-dialog-title" maxWidth="md">
        <DialogTitleStyled id="form-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TypoPopHeadStyled>Add New Term</TypoPopHeadStyled>
            <IconButton color="default" onClick={handleClose1}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitleStyled>
        <DialogContent>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <ConfirmationDialogRaw open={open} onClose={handleClose} groupdata={groups} memberdata={businessusers}>
              <Tabmenu
                groupdata={groups}
                memberdata={businessusers}
                handleToggles={handleGroupToggle}
                checked={checked}
                handleMemberToggle={handleMemberToggle}
                memberchecked={memberchecked}
                handleToTagvalue={handleToTagvalue}
              />
            </ConfirmationDialogRaw>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  label="Term Name"
                  placeholder="For example: Term 1, Summer Term"
                  /*style={{color: focused ? 'red' : ''}} */
                  name="subject"
                  fullWidth
                  variant="outlined"
                  value={formValue.subject}
                  onChange={handleinput}
                  error={!!formValidation.subject}
                  helperText={formValidation.subject}
                  fullWidth
                />
              </Grid>

              <Grid item xs={6}>
                <DatePicker
                  label="Start Date"
                  inputVariant="outlined"
                  value={setDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                  name="set_date"
                  format="DD/MM/YYYY"
                  fullWidth
                  error={!!formValidation.set_date}
                  helperText={formValidation.set_date}
                  //disablePast={true}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="End Date"
                  name="end_date"
                  inputVariant="outlined"
                  value={endDate}
                  onChange={handleEndDateChange}
                  animateYearScrolling
                  format="DD/MM/YYYY"
                  fullWidth
                  error={!!formValidation.end_date}
                  helperText={formValidation.end_date}
                  disablePast={true}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox checked={isPrivate} onChange={handleChangeCheck} name="isPrivate" color="primary" />
                  }
                  label="Make this term private ?  If checked only selected contacts will be added."
                />
              </Grid>

              {isPrivate ? (
                <Grid item xs={12}>
                  <AutocompleteStyled
                    multiple
                    limitTags={4}
                    id="tags-filled"
                    filterSelectedOptions={false}
                    options={[]}
                    freeSolo
                    onChange={(event, newValue) => {
                      let newVal = newValue.toString();
                      let getArray = newVal.split(',');

                      let user_id_arr = [];
                      let group_id_arr = [];
                      for (let i = 0; i < getArray.length; i++) {
                        var getNewList = businessusers.find(
                          (ele) => (ele.first_name + ' ' + ele.last_name).trim() == getArray[i]
                        );
                        var getNewGroupList = groups.find((ele) => ele.group_name == getArray[i]);
                        if (getNewList) {
                          user_id_arr.push(getNewList.user_id);
                        } else {
                          //FOR GROUPS
                          getNewGroupList && getNewGroupList.group_id && group_id_arr.push(getNewGroupList.group_id);
                        }
                      }
                      setGroup_members(group_id_arr);
                      setGroupname_membersname(newValue);
                      setChecked(group_id_arr);
                      setMemberchecked(user_id_arr);
                    }}
                    value={groupname_membersname}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="To"
                        onChange={handleToopen}
                        onClick={handleToopen}
                        error={!!formValidation.eventForm_to}
                        helperText={formValidation.eventForm_to}
                      />
                    )}
                  />
                </Grid>
              ) : null}

              <Grid item xs={12}>
                <TextField
                  label="What’s the rymindr"
                  fullWidth
                  variant="outlined"
                  rows={4}
                  rowsMax={100}
                  name="message"
                  value={formValue.message}
                  onChange={handleinput}
                  error={!!formValidation.message}
                  helperText={formValidation.message}
                  className="mb-40"
                />
              </Grid>

              <Grid item xs={12} style={{ textAlign: 'right' }}>
                <ButtonWarn
                  onClick={handleToSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Send />}
                  disabled={loading}
                >
                  {loading && <CircularSpinner />}
                  {checkupdate == 1 ? 'Update Rymindr' : 'Send Rymindr'}
                </ButtonWarn>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.bookterm.loading,
    error: state.bookterm.error,
    sucessTerm: state.bookterm.sucessTerm,
    groups: state.bookevent.groups,
    bookdetails: state.booklist.bookdetails,
    businessusers: state.bookevent.businessusers,
    matched_contact: state.bookevent.matched_contact,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (data) => dispatch(getGroups(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    createTerm: (data, unmatch, history, sendAttachment) =>
      dispatch(createTerm(data, unmatch, history, sendAttachment)),
  };
};

AddNewHolidayModal.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,

  businessusers: PropTypes.array.isRequired,
  getBusinessUsers: PropTypes.func.isRequired,
  createTerm: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  matched_contact: PropTypes.any.isRequired,
  rymindrListData: PropTypes.array.isRequired,
  handleedit1: PropTypes.func.isRequired,
  UpdateTermlist: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(AddNewHolidayModal));
