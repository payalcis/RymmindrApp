import { Button, Grid, MenuItem, Typography, IconButton, Box, Checkbox, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Flag, Send, Close, Edit, BeachAccess } from '@material-ui/icons';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MomentUtils from '@date-io/moment';
import { makeStyles, styled } from '@material-ui/core/styles';

import { Link, useHistory, useParams } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { getBusinessUsers, getGroups } from '../../../store/actions/bookevent';

import { updateTerm } from '../../../store/actions/bookterm';

import React, { useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import CircularSpinner from '../../../component/CircularSpinner/index';
import ConfirmationDialogRaw from '../../Bookings/EventBooking/Modal';
import Tabmenu from '../../Bookings/EventBooking/Modal/Memberlist';

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

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));

const FormFields = {
  message: '',
  EventForm_to_group: '',
  eventForm_to: '',
  user_id: '',
  user_name: '',
  subject: '',
  category: '',
  dynaminc_field: '',
  allow_parents: '',
  set_date: '',
  end_date: '',
  isPrivate: false,
  id: '',
};

const Editterm = (props) => {
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

  const {
    enqueueSnackbar,
    error,
    sucessTerm,
    getGroups,
    groups,
    matched_contact,
    businessusers,
    getBusinessUsers,
    updateTerm,
    loading,
    handleedit1,
    getRymindrListData,
    EdittermData,
  } = props;
  console.log('getRymindrListData123=====', getRymindrListData);

  const [formValue, setFormValue] = useState(FormFields);
  const [formValidation, setFormValidation] = useState(FormFields);
  const history = useHistory();
  const [rymindrListData, updateRymindrListData] = useState(getRymindrListData);
  const [memberchecked, setMemberchecked] = useState([]);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    console.log('getRymindrListData123=====', getRymindrListData);
    let tempStatus = false;
    if (getRymindrListData.rymindr_status == 'Private') {
      tempStatus = true;
    } else {
      tempStatus = false;
    }

    setFormValue({
      id: getRymindrListData.id,
      message: getRymindrListData.message,
      subject: getRymindrListData.subject,
      // eventForm_to: '@',
      eventForm_to: getRymindrListData.event_to,
      event_to_group: getRymindrListData.event_to_group,
      set_date: getRymindrListData.start_date1,
      end_date: getRymindrListData.event_end1,
    });

    setDateChange(getRymindrListData.start_date1);
    setEndDateChange(getRymindrListData.event_end1);
    setIsPrivate(tempStatus);

    //this is for popoup
    const newChecked = [];
    const mem_checked = [];
    const groupname = [];
    const mobile_name = [];

    if (
      getRymindrListData.event_to_group != null &&
      getRymindrListData.event_to_group != '' &&
      getRymindrListData.event_to_group != 'NaN'
    ) {
      getRymindrListData.event_to_group.split(',').forEach((element, index) => {
        newChecked.push(parseInt(element));
        groups.map((data, i) => {
          if (data.group_id == element) {
            groupname.push(data.group_name);
          }
          // if(groupname.indexOf(element) === -1) {groupname.push(element)}
        });
      });
    }
    if (getRymindrListData.event_to != null ) {
      getRymindrListData.event_to.split(',').forEach((element, index) => {
        businessusers.map((data, i) => {
          if (data.user_id == element) {
            if (data.first_name) {
              groupname.push(data.first_name);
            } else {
              groupname.push(data.mobile_no);
            }
          }
        });
        mem_checked.push(element);
      });
    }
    if (getRymindrListData.event_mobile_no != null) {
      getRymindrListData.event_mobile_no.split(',').forEach((element, index) => {
        if (mobile_name.indexOf(element) === -1) {
          mobile_name.push(element);
        }
      });
    }

    if (getRymindrListData.event_group_name != null) {
      getRymindrListData.event_group_name.split(',').forEach((element, index) => {
        if (groupname.indexOf(element) === -1) {
          groupname.push(element);
        }
      });
    }

    setChecked(newChecked);
    setMemberchecked(mem_checked);
    // setGroupname_membersname(groupname.concat(mobile_name))
    setGroupname_membersname(groupname);
    //popup end
  }, [getRymindrListData]);

  const [group_members, setGroup_members] = useState([]);
  const [groupname_membersname, setGroupname_membersname] = useState([]);
  const [eventForm_to, setEventForm_to] = useState('');
  const [checkupdate, setCheckupdate] = useState(0);
  const [setDate, setDateChange] = useState();
  const [endDate, setEndDateChange] = useState();

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

    businessusers.forEach((element) => {
      const checkvalue = memberchecked.indexOf(element.user_id);
      if (checkvalue !== -1) {
        membername.push(`${element.first_name} ${element.last_name}`);
      }
    });


    setGroupname_membersname(groupname.concat(membername));

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
    setFormValue({
      ...formValue,
      eventForm_to: selectedmember,
      // eventForm_to: '@'
    });
    console.log('newChecked=====', newChecked);
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

    setFormValue({
      ...formValue,
      eventForm_to: newChecked,
      // eventForm_to: '@'
    });
    formvalidation.eventForm_to = '';
    setFormValidation(formvalidation);

    setMemberchecked(newChecked);
  };
console.log('formValue',formValue)

  const handleAllMembersToggle = (value) => {
    const newChecked = [...value];
    const formvalidation = { ...formValidation };

    setFormValue({
      ...formValue,
      eventForm_to: newChecked,
      // eventForm_to: '@'
    });
    formvalidation.eventForm_to = '';
    setFormValidation(formvalidation);

    setMemberchecked(newChecked);
  };

  const handleAllGroupMembersToggle = (value) => {
    const newChecked = [...checked];
    const selectedmember = [...group_members];
    const formvalidation = { ...formValidation };
    formvalidation.eventForm_to = '';
    setFormValidation(formvalidation);
    setFormValue({
      ...formValue,
      eventForm_to: selectedmember,
      // eventForm_to: '@'
    });
    setChecked(newChecked);
    setGroup_members(selectedmember);
  }



  const handleToopen = () => {
    setOpen(true);
  };
  const handleToTagvalue = (value) => {
    setPhoneNumber(value);
  };

  const [phoneNumber, setPhoneNumber] = useState([]);
  const [isPrivate, setIsPrivate] = React.useState(false);

  const [state, setState] = useState({
    checkedB: true,
    switch: true,
  });
  //const [selectedDate, handleDateChange] = useState(new Date())
  // const [selectedTime, handleTimeChange] = useState(new Date())

  const handleDateChange = (e) => {
    const date = new Date(e);
    const selecteddate = moment(date).format('YYYY-MM-DD');
    setDateChange(selecteddate);

    // setEndDateChange(getRymindrListData.event_end1);
    const formvalidation = { ...formValidation };
    formvalidation.set_date = '';
    setFormValidation(formvalidation);

    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    if (selecteddate > endDate) {
      formvalidation.end_date = 'You can not choose a date greater then end date.';
      setFormValidation(formvalidation);
    } else {
      formvalidation.end_date = '';
      setFormValidation(formvalidation);
    }

    setFormValue({ ...formValue, set_date: selecteddate, end_date: endDate });
  };

  //  const handleDateChange = (e) => {
  //   const date = new Date(e)
  //   const selecteddate = moment(date).format('YYYY-MM-DD')
  //   setDateChange(selecteddate)
  //   const formvalidation = { ...formValidation }
  //   formvalidation.set_date = ''
  //   setFormValidation(formvalidation)
  //   setFormValue({ ...formValue, set_date: selecteddate })
  //   }

  // const handleEndDateChange = (e) => {
  //     const date = new Date(e)
  //     const selecteddate = moment(date).format('DD/MM/YYYY')
  //     setEndDateChange(selecteddate)
  //     const formvalidation = { ...formValidation }
  //      formvalidation.end_date = ''
  //         setFormValidation(formvalidation)
  //     setFormValue({ ...formValue, end_date: selecteddate })
  //   }

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
      setEndDateChange(selectedenddate)
      setFormValidation(formvalidation);
      setFormValue({ ...formValue, end_date: selectedenddate });
    } else if (startDate > selectedenddate) {
      setEndDateChange(selectedenddate)
      formvalidation.end_date = 'End date must be greater than start date';
      setFormValidation(formvalidation);
      setFormValue({ ...formValue, end_date: selectedenddate });
    } else {
      setEndDateChange(selectedenddate);
      formvalidation.end_date = '';
      setFormValidation(formvalidation);
      setFormValue({ ...formValue, end_date: selectedenddate });
    }
  };

  const [open, setOpen] = React.useState(false);

  const [openg, setOpeng] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen1 = () => {
    console.log('getRymindrListData=========', getRymindrListData);
    console.log('formValue=========', formValue);

    setOpeng(true);
  };

  const handleClose1 = () => {
    console.log('handleClose1handleClose1handleClose1handleClose1handleClose1');
    setOpeng(false);
    // setDateChange('')
    // setEndDateChange('')
    // setGroup_members([])
    // setMemberchecked('')
    // // setFormValue('')
    // setIsPrivate(false)
    // setMemberchecked([])
    // setGroupname_membersname([])
    // setFormValue(FormFields)
    // setFormValidation(FormFields)
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
      if (getRymindrListData.type == 'term') {
        formvalidation.message = 'Please add term Title';
      } else {
        formvalidation.message = 'Please add holiday Title';
      }

      setFormValidation(formvalidation);
    }
    if (!formValue.subject) {
      isError = true;
      if (getRymindrListData.type == 'term') {
        formvalidation.subject = 'Please add term name';
      } else {
        formvalidation.subject = 'Please add holiday name';
      }
      setFormValidation(formvalidation);
    }

    if (isPrivate) {
      if (formValue.eventForm_to[0] == '' && formValue.eventForm_to.length == 1) {
        isError = true;
        formvalidation.eventForm_to = 'Please add contact ';
        setFormValidation(formvalidation);
      }
      if (formValue.eventForm_to.length == 0){
        isError = true;
        formvalidation.eventForm_to = 'Please add contact ';
        setFormValidation(formvalidation);
      }
    }


    if (formvalidation.end_date) {
      isError = true;
    }

    // if (formValue.eventForm_to.length == 0  && isPrivate) {
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

    return isError;
  };

  const handleChangeCheck = (event) => {
    setIsPrivate(event.target.checked);
    // setState({ ...state, [event.target.name]: event.target.checked })
    setFormValue({ ...formValue, isPrivate: event.target.checked });
  };

  const handleToSubmit = () => {
    // alert('submit');
    if (validate()) return false;

    const formFeilds = { ...formValue };
    // if (validate()) return false
    const EventFormField = { ...formFeilds };

    if (isPrivate) {
      EventFormField.event_to_group = checked.join();
      EventFormField.EventForm_to_group = checked.join();
      EventFormField.EventForm_group_members_to = [...new Set(group_members)].join();
      EventFormField.eventForm_to =
        matched_contact !== null ? memberchecked.join() + ',' + matched_contact.user_id : memberchecked.join();
    } else {
      EventFormField.EventForm_to_group = '';
      EventFormField.EventForm_group_members_to = '';
      EventFormField.eventForm_to = '';
      EventFormField.event_to_group = '';
    }

    EventFormField.user_id = user_id;
    EventFormField.user_name = first_name;
    const unmatch = matched_contact ? matched_contact.mobile_no : '';
    const sendAttachment = '';
    EventFormField.category = 'term';
    //return false;
    if (checkupdate) {
      updateTerm(EventFormField, unmatch, history, sendAttachment, user_id);
      EdittermData(EventFormField);
      //
    } else {
      updateTerm(EventFormField, unmatch, history, sendAttachment, user_id);
      EdittermData(EventFormField);
    }

    setIsPrivate(false);
    formValue.message = '';
    formValue.subject = '';
    setEventForm_to('');
    // setDateChange();
    // setEndDateChange();
    setGroup_members('');
    setGroupname_membersname('');
    setChecked([]);
    setMemberchecked('');
    setFormValue(FormFields);
    setFormValidation(FormFields);
  };

  useMemo(() => {
    //alert(error)
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  //  useMemo(() => {
  //     setOpeng(false);
  //     sucessTerm && enqueueSnackbar(sucessTerm, { variant: 'success' });
  //   }, [sucessTerm])

  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      if (mounted) {
        setOpeng(false);
        sucessTerm && enqueueSnackbar(sucessTerm, { variant: 'success' });
      }
    }, 0);
    return function cleanup() {
      mounted = false;
    };
  }, [sucessTerm]);

  return (
    <div>
      <ButtonPlain
        variant="contained"
        color="primary"
        size="large"
        onClick={handleClickOpen1}
        className="mr-10"
        startIcon={<Edit style={{ color: '#1872c0' }} />}
      >
        Edit
      </ButtonPlain>

      <Dialog open={openg} onClose={handleClose1} aria-labelledby="form-dialog-title" maxWidth="md">
        <DialogTitleStyled id="form-dialog-title">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <TypoPopHeadStyled>
              Edit {getRymindrListData.message !== null && getRymindrListData.type == 'term' ? 'Term' : 'Holiday'}
            </TypoPopHeadStyled>
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
                handleAllMembersToggle={handleAllMembersToggle}
                handleAllGroupMembersToggle={handleAllGroupMembersToggle}
                memberchecked={memberchecked}
                handleToTagvalue={handleToTagvalue}
              />
            </ConfirmationDialogRaw>

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  label={getRymindrListData.subject !== null && getRymindrListData.type == 'term' ? 'Term' : 'Holiday'}
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
                  label={`Make this  ${getRymindrListData.message !== null && getRymindrListData.type == 'term' ? 'term' : 'holiday'} private ?  If checked only selected contacts will be added.`}
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
                      let getArray = newVal.split(',')
                      let user_id_arr = [];
                      let group_id_arr = [];
                      for (let i = 0; i < getArray.length; i++) {
                        var getNewList = businessusers.find(
                          (ele) => (ele.first_name) == getArray[i]
                        );

                        if (getNewList) {
                          user_id_arr.push(getNewList.user_id);
                        } else {
                          //FOR GROUPS
                          let getNewGroupList = groups.find((ele) => ele.group_name == getArray[i]);
                          getNewGroupList && getNewGroupList.group_id && group_id_arr.push(getNewGroupList.group_id);
                        }
                      }

                      setGroup_members(group_id_arr);
                      setGroupname_membersname(newValue);

                      // const formdata = { ...formvalue }

                      setFormValue({
                        ...formValue,
                        eventForm_to: user_id_arr.length > 0 ? user_id_arr : '',
                        EventForm_to_group: group_id_arr.length > 0 ? group_id_arr : '',
                      });

                      setChecked(group_id_arr);
                      setMemberchecked(user_id_arr);

                      //formdata.message_group = (user_id_arr.join()) ? user_id_arr.join() :group_id_arr.join();
                      //formdata.to_member = user_id_arr.join();
                      //formdata.to_group = group_id_arr.join();
                      /*
                      const EventFormField = { ...formFeilds }
                      EventFormField.EventForm_to_group = user_id_arr.join()
                        EventFormField.EventForm_group_members_to = [...new Set(group_members)].join()
                        EventFormField.user_id = user_id
                        EventFormField.user_name = first_name
                        EventFormField.eventForm_to = */
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
                  {checkupdate == 0 ? 'Update Rymindr' : 'Send Rymindr'}
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
    updateTerm: (data, unmatch, history, sendAttachment, user_id) =>
      dispatch(updateTerm(data, unmatch, history, sendAttachment, user_id)),
  };
};

Editterm.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  businessusers: PropTypes.array.isRequired,
  getBusinessUsers: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  matched_contact: PropTypes.any.isRequired,
  rymindrListData: PropTypes.array.isRequired,
  handleedit1: PropTypes.func.isRequired,
  EdittermData: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Editterm));
