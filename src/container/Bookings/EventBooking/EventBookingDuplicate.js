import { Visibility, Replay, Send, AddCircle, Cancel } from '@material-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
  Radio,
  RadioGroup,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';

import { makeStyles, styled } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import Autocomplete from '@material-ui/lab/Autocomplete';

import React, { useEffect, useMemo, useState } from 'react';

import { connect, useDispatch } from 'react-redux';
import { createEventbook, getBusinessUsers, getGroups, getCategory } from '../../../store/actions/bookevent';

import { getBookListDetail } from '../../../store/actions/booklist';

import moment from 'moment';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import CircularSpinner from '../../../component/CircularSpinner/index';
import FullscreenSpinner from '../../../component/FullscreenSpinner/index';
import Tabmenu from './Modal/Memberlist';
import ConfirmationDialogRaw from './Modal';
import { Link, useHistory, useParams } from 'react-router-dom';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import ckEditorConfig from '../../../helper/ckEditorConfig';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
  },
  categoryIon: {
    height: 32,
    margin: -10,
    marginLeft: 0,
    marginRight: 10,
  },
}));

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const PaperStyled = styled(Paper)({
  padding: '35px 15px',
  height: 100 + '%',
});

const GridStyled = styled(Grid)(({ theme }) => ({}));
const GridVioletStyled = styled(Grid)({
  padding: '10px 0',
  height: 100 + '%',
  background: '#edf8fe',
  borderRadius: 15,
  minHeight: 210,
  position: 'relative',
});

const AutocompleteStyled = styled(Autocomplete)({
  height: 154,
  '&>div': {
    margin: 0,
    '&>div': { height: 154, alignItems: 'flex-start' },
  },
});

const ButtonAddStyled = styled(Button)({
  fontSize: 16,
  fontWeight: 'bold',
  '& svg': {
    fontSize: '28px !important',
  },
});
const currencies = [
  {
    value: '10',
    label: '10 Min',
  },
  {
    value: '15',
    label: '15 Min',
  },
  {
    value: '30',
    label: '30 Min',
  },
  {
    value: '45',
    label: '45 Min',
  },
  {
    value: '1',
    label: '1 Hour',
  },
  {
    value: '2',
    label: '2 Hour',
  },
];

const category = [
  {
    value: 'Parents Evening',
    label: 'Parents Evening',
    category_id: 159,
    img: require('../../../assets/images/parent.png'),
  },
  {
    value: 'Event',
    label: 'Event',
    category_id: 158,
    img: require('../../../assets/images/event.png'),
  },
  {
    value: 'Appointment',
    label: 'Appointment',
    category_id: 157,
    img: require('../../../assets/images/event_blue.png'),
  },
];

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  color: theme.palette.error.main,
  position: 'absolute',
  right: -15,
  top: -15,
  cursor: 'pointer',
  '& svg': {
    width: '2.3rem',
    height: '2.3rem',
  },
}));

//form field
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
  id: '',
};

const CreateEventbook = (props) => {
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

  const {
    enqueueSnackbar,
    error,
    sucessEvent,
    getGroups,
    getBookListDetail,
    groups,
    bookdetails,
    businessusers,
    getBusinessUsers,
    loading,
    matched_contact,
    createEventbook,
    getCategory,
  } = props;

  const [formValue, setFormValue] = useState(FormFields);
  const [formValidation, setFormValidation] = useState(FormFields);
  const [setDate, setDateChange] = useState();
  const [categoryVal, setCategoryVal] = React.useState('');
  const [allowParentValue, setAllowParent] = useState('');
  const [getMessage, setMessage] = useState('');
  const history = useHistory();
  const date = new Date();
  const [checked, setChecked] = useState([]);
  const [memberchecked, setMemberchecked] = useState([]);
  const [group_members, setGroup_members] = useState([]);
  const [groupname_membersname, setGroupname_membersname] = useState([]);
  const [eventForm_to, setEventForm_to] = useState('');

  const [checkupdate, setCheckupdate] = useState(0);
  const [showTime, setShowTime] = useState('No');
  const [tempTime, setTempTime] = useState();
  const [isPageLoading, setPageLoading] = useState(false);

  //let { ID } = useParams();
  let { ID, member_id, group_id, get_name } = useParams();

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

    // getCategory();

    if (ID != undefined) {
      setPageLoading(true);
      getBookListDetail({ ID, user_id });
    }
  }, []);

  useEffect(() => {
    if (ID != undefined) {
      if (bookdetails !== null) {
        setPageLoading(false);
        setTimeout(() => {
          setFormValue({
            id: ID,
            message: bookdetails[0].message,
            subject: bookdetails[0].subject,
            set_date: bookdetails[0].event_date,
            category: bookdetails[0].category,
            subcategory_id:bookdetails[0].category,
            allow_parents: bookdetails[0].add_comment,
            eventForm_to: '@',
          });
        }, 0);

        if (bookdetails[0].category == '157') {
          setCategoryVal('Appointment');
        } else if (bookdetails[0].category == '158') {
          setCategoryVal('Event');
        } else if (bookdetails[0].category == '159') {
          setCategoryVal('Parents Evening');
        }
        // setCategoryVal(bookdetails[0].category);
        //setDateChange(moment(bookdetails[0].event_date));
        setAllowParent(bookdetails[0].add_comment);

        //this is for popoup
        const newChecked = [];
        const mem_checked = [];
        const groupname = [];
        const mobile_name = [];
        var temp = null;

        bookdetails[0].event_to_group.split(',').forEach((element, index) => {
          newChecked.push(parseInt(element));
        });
        bookdetails[0].event_to.split(',').forEach((element, index) => {
          mem_checked.push(element);
        });

        if (bookdetails[0].event_group_name != null) {
          bookdetails[0].event_group_name.split(',').forEach((element, index) => {
            if (groupname.indexOf(element) === -1) {
              groupname.push(element);
            }
          });
        }
        if (bookdetails[0].event_mobile_no != null) {
          bookdetails[0].event_mobile_no.split(',').forEach((element, index) => {
            temp = businessusers.filter((x) => element.user_id == element);
            // if(mobile_name.indexOf(element) === -1) {mobile_name.push(element)};
          });
          if (temp) {
            bookdetails[0].user &&
              bookdetails[0].user.length > 0 &&
              bookdetails[0].user.forEach((data, i) => {
                mobile_name.push(data.user_name);
              });
          }
        }

        setChecked(newChecked);
        setMemberchecked(mem_checked);
        setGroupname_membersname(groupname.concat(mobile_name));
        //popup end

        //dynamic eleent start
        var new_meet_data = [];
        var new_meet_data_frm = [];
        var dynamic_valid = [];

        // bookdetails[0].meeting_data.forEach((element, index) => {
        // // list[index][fieldName]    = fieldVal
        // let innerObj = {};
        // let innerObj_frm={};
        // let  innerObj_valid={};

        // innerObj['meetingDate'] = moment(element.meeting_date);
        // innerObj['startTime']   = moment(element.meeting_date+' '+element.meeting_time_start);
        // innerObj['endTime']     = moment(element.meeting_date+' '+element.meeting_time_end);
        // innerObj['currency']    = element.meeting_slot;
        // innerObj['breakStatus']    = element.comfort_break;
        // innerObj['breakStartTime'] = moment(element.meeting_date+' '+element.meeting_time_start1);
        // innerObj['breakEndTime']   = moment(element.meeting_date+' '+element.meeting_time_end1);
        // innerObj['isbooked_check']   = element.is_slot_book;

        // innerObj_frm['meetingDate'] = element.meeting_date;
        // innerObj_frm['startTime']   = element.meeting_date+' '+element.meeting_time_start;
        // innerObj_frm['endTime']     = element.meeting_date+' '+element.meeting_time_end;
        // innerObj_frm['currency']    = element.meeting_slot;
        // innerObj_frm['breakStatus']    = element.comfort_break;
        // innerObj_frm['breakStartTime'] =element.meeting_date+' '+element.meeting_time_start1;
        // innerObj_frm['breakEndTime']   =element.meeting_date+' '+element.meeting_time_end1;

        // innerObj_valid['meetingDate'] = '';
        // innerObj_valid['startTime']   = '';
        // innerObj_valid['endTime']     = '';
        // innerObj_valid['currency']    = '';
        // innerObj_valid['breakStatus']    = '';
        // innerObj_valid['breakStartTime'] ='';
        // innerObj_valid['breakEndTime']   ='';

        // new_meet_data.push(innerObj);
        // new_meet_data_frm.push(innerObj_frm);
        // dynamic_valid.push(innerObj_valid);
        // });

        //setInputList(new_meet_data);

        // setDynamicFormValidation(dynamic_valid);
        // setSaveInputList(new_meet_data_frm);
        setAllowParent(bookdetails[0].add_comment);
        //end of dyamic field
        setFormValue({ ...formValue, set_date: moment(bookdetails[0].event_date) });
      }
    }
  }, [bookdetails]);

  //  const handleinput = (e, isEditor=null) => {
  //     const formdata = { ...formValue}
  //     const formvalidation = { ...formValidation }
  //     if(!isEditor){
  //       const { name, value } = e.target;
  //       if (name === 'message') {
  //         formdata.message = value
  //         formvalidation.message = ''
  //         setFormValidation(formvalidation)
  //         }else if(name === 'subject'){
  //         formdata.subject = value
  //         formvalidation.subject = ''
  //         setFormValidation(formvalidation)
  //         }
  //         else {
  //           formdata[name] = value
  //         }
  //     }

  //     else{
  //       formdata.message = e
  //       formvalidation.message = ''
  //       setFormValidation(formvalidation)
  //     }

  //     setFormValue(formdata)
  //   }

  useEffect(() => {
    const formdata = { ...formValue };
    const formvalidation = { ...formValidation };
    formdata.message = getMessage;
    formvalidation.message = '';
    setFormValidation(formvalidation);
    setFormValue(formdata);
  }, [getMessage]);

  const subjectHandleinput = (e, isEditor = null) => {
    const formdata = { ...formValue };
    const formvalidation = { ...formValidation };
    const { name, value } = e.target;
    formdata.subject = value;
    formvalidation.subject = '';
    setFormValidation(formvalidation);
    setFormValue(formdata);
  };

  const handleCategoryChange = (event) => {
    setCategoryVal(event.target.value);
    var cat_id = '';
    if (event.target.value == 'Parents Evening') {
      cat_id = 159;
    } else if (event.target.value == 'Event') {
      cat_id = 158;
    } else {
      cat_id = 157;
    }
    setFormValue({ ...formValue, subcategory_id: cat_id, category: event.target.value });
  };

  //start cloneing field
  // Add remove fields
  const [inputList, setInputList] = useState([
    {
      meetingDate: new Date(),
      currency: '15',
      startTime: new Date(),
      endTime: new Date(), 
      breakStatus: 'No',
      breakStartTime: new Date(),
      breakEndTime: new Date(),
      isbooked_check: 0,
    },
  ]);

  const date22 = new Date();
  let saveFieldVal22 = moment(date22).format('HH:mm');
  // Save data array value
  const [saveInputList, setSaveInputList] = useState([
    {
      meetingDate: moment(new Date()).format('YYYY-MM-DD'),
      currency: '15',
      startTime: saveFieldVal22,
      endTime: saveFieldVal22,
      breakStatus: 'No',
      breakStartTime: saveFieldVal22,
      breakEndTime: saveFieldVal22,
    },
  ]);

  const [dynamicFormValidation, setDynamicFormValidation] = useState([
    {
      meetingDate: '',
      currency: '',
      startTime: '',
      endTime: '',
      breakStatus: '',
      breakStartTime: '',
      breakEndTime: '',
    },
  ]);
  // handle input change
  const handleInputChange = (fieldName, event, index) => {
    const list = [...inputList];
    const saveList = [...saveInputList];
    const vali = [...dynamicFormValidation];
    console.log('event-',event)
    const fieldsArr = ['startTime', 'endTime', 'breakStartTime', 'breakEndTime'];
    var fieldVal = '';
    var saveFieldVal = '';
    var saveVali = '';
    if (fieldName == 'meetingDate') {
      fieldVal = event;
      const date = new Date(event);
      saveFieldVal = moment(date).format('YYYY-MM-DD');
      saveVali = '';
    } else if (fieldsArr.indexOf(fieldName) >= 0) {
      fieldVal = event;
      const date = new Date(event);
      saveFieldVal = moment(date).format('HH:mm');
      console.log('saveFieldVal--',saveFieldVal)
      // setTempTime(event)
    } else if (fieldName == 'breakStatus') {
      let prevValue = list[index][fieldName];
      let currentVal = prevValue !== event.target.value ? event.target.value : '';
      fieldVal = currentVal;
      saveFieldVal = currentVal;
      if (currentVal === 'Yes') {
        setShowTime('Yes');
      } else {
        setShowTime('No');
      }
    } else {
      fieldVal = event.target.value;
      saveFieldVal = event.target.value;
      // saveVali=event.target.value
      console.log('currentVal-',event.target.value)
    }

    list[index][fieldName] = fieldVal;
    saveList[index][fieldName] = saveFieldVal;
    vali[index][fieldName] = saveVali;

    setInputList(list);
    setSaveInputList(saveList);
    setDynamicFormValidation(vali);
  };

  // handle click event of the Add button
  const handleAddAnotherClick = () => {
    let tempBreakStatus = '0';
    console.log('inputList[inputList.length - 1].breakStatus',inputList[inputList.length - 1].breakStatus)

    if (inputList.length > 0 && inputList[inputList.length - 1].breakStatus == 'No') {
      tempBreakStatus = 'No';
    } else {
      tempBreakStatus = 'Yes';
    }

    const date = new Date(tempTime);

    let meetDate = '';

    if (inputList.length > 0) {
      let getDate = moment(new Date(inputList[inputList.length - 1].meetingDate), 'DD-MM-YYYY').add(1, 'days');
      meetDate = getDate.format('YYYY-MM-DD');
    } else {
      meetDate = new Date().addDays(1);
    }

    setInputList([
      ...inputList,
      {
        // meetingDate: inputList.length > 0 ? (inputList[inputList.length-1].meetingDate).addDays(1) : new Date().addDays(1),
        //meetingDate: inputList.length > 0 ? moment(inputList[inputList.length-1].meetingDate, "DD-MM-YYYY").add(1, 'days') : new Date().addDays(1),
        meetingDate: meetDate,
        currency: inputList.length > 0 ? inputList[inputList.length - 1].currency : '',
        startTime: inputList.length > 0 ? inputList[inputList.length - 1].startTime : new Date(),
        endTime: inputList.length > 0 ? inputList[inputList.length - 1].endTime : new Date(),
        breakStatus: tempBreakStatus,
        breakStartTime: inputList.length > 0 ? inputList[inputList.length - 1].breakStartTime : new Date(),
        breakEndTime: inputList.length > 0 ? inputList[inputList.length - 1].breakEndTime : new Date(),
      },
    ]);

    let meetDate2 = '';
    if (saveInputList.length > 0) {
      let getDate = moment(new Date(saveInputList[saveInputList.length - 1].meetingDate), 'DD-MM-YYYY').add(1, 'days');
      meetDate2 = getDate.format('YYYY-MM-DD');
    } else {
      meetDate2 = new Date().addDays(1);
    }
    setSaveInputList([
      ...saveInputList,
      {
        // meetingDate: saveInputList.length > 0 ? (saveInputList[saveInputList.length-1].meetingDate).addDays(1) : new Date().addDays(1),
        //meetingDate: saveInputList.length > 0 ? moment(saveInputList[saveInputList.length-1].meetingDate, "DD-MM-YYYY").add(1, 'days') : new Date().addDays(1),
        meetingDate: meetDate2,
        currency: saveInputList.length > 0 ? saveInputList[saveInputList.length - 1].currency : '',
        startTime: saveInputList.length > 0 ? saveInputList[saveInputList.length - 1].startTime : new Date(),
        endTime: saveInputList.length > 0 ? saveInputList[saveInputList.length - 1].endTime : new Date(),
        breakStatus: tempBreakStatus,
        breakStartTime: saveInputList.length > 0 ? saveInputList[saveInputList.length - 1].breakStartTime : new Date(),
        breakEndTime: saveInputList.length > 0 ? saveInputList[saveInputList.length - 1].breakEndTime : new Date(),
      },
    ]);
    setDynamicFormValidation([
      ...dynamicFormValidation,
      {
        meetingDate: '',
        currency: '',
        startTime: '',
        endTime: '',
        breakStatus: '',
        breakStartTime: '',
        breakEndTime: '',
      },
    ]);

    // setSaveInputList([...saveInputList, {
    //   // meetingDate:'',
    //   // currency: '',
    //   // startTime: '',
    //   // endTime : '',
    //   // breakStatus: '0',
    //   // breakStartTime: '',
    //   // breakEndTime: '',
    //   meetingDate: inputList.length > 0 ? inputList[inputList.length-1].meetingDate : '',
    //     currency: inputList.length > 0 ? inputList[inputList.length-1].currency : '',
    //     startTime: inputList.length > 0 ? inputList[inputList.length-1].startTime : '',
    //     endTime : inputList.length > 0 ? inputList[inputList.length-1].endTime : '',
    //     breakStatus: tempBreakStatus,
    //     breakStartTime: inputList.length > 0 ? inputList[inputList.length-1].breakStartTime : '',
    //     breakEndTime: inputList.length > 0 ? inputList[inputList.length-1].breakEndTime : '',
    // }]);
  };

  // handle click event of the Remove button
  const handleRemoveAnotherClick = (index) => {
    const list = [...inputList];
    const saveList = [...saveInputList];
    const vali = [...dynamicFormValidation];
    list.splice(index, 1);
    saveList.splice(index, 1);
    vali.splice(index, 1);
    setInputList(list);
    setSaveInputList(saveList);
    setDynamicFormValidation(vali);
  };

  //end cloning

  const handleAllowparents = (event) => {
    if (event.target.value === allowParentValue) {
      setAllowParent('');
    } else {
      setAllowParent(event.target.value);
    }
    setFormValue({ ...formValue, allow_parents: event.target.value });
  };

  const [phoneNumber, setPhoneNumber] = useState([]);
  const handleTag = (e) => {
    const newNumber = [...phoneNumber, e.target.value];
    setPhoneNumber(Array.from(new Set(newNumber)));
  };
  const handleDateChange = (e) => {
    const date = new Date(e);
    const selecteddate = moment(date).format('YYYY-MM-DD');
    setDateChange(selecteddate);
    const formvalidation = { ...formValidation };
    formvalidation.set_date = '';
    setFormValidation(formvalidation);
    setFormValue({ ...formValue, set_date: selecteddate });
  };

  //const [selectedDate, handleDateChange] = useState(new Date())
  //const [selectedTime, handleTimeChange] = useState(new Date())

  const [currency, setCurrency] = React.useState('10');
  const [note, setNote] = React.useState('');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };
  const handlenoteChange = (e) => {
    setNote(e.target.value);
  };

  const classes = useStyles();

  const ButtonColor = styled(Button)(({ theme }) => ({
    background: theme.palette.props.main,
    color: theme.palette.props.contrastText,
  }));

  const ButtonWarn = styled(Button)(({ theme }) => ({
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  }));

  const [open, setOpen] = useState(false);
  const handleToopen = () => {
    setOpen(true);
  };

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

    if (businessusers.length > 0) {
      businessusers.forEach((element) => {
        const checkvalue = memberchecked.indexOf(element.user_id);
        if (checkvalue !== -1) {
          membername.push(`${element.first_name} ${element.last_name}`);
        }
      });
    }

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
    setFormValue({ ...formValue, eventForm_to: '@' });
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
    setFormValue({ ...formValue, eventForm_to: '@' });
    formvalidation.eventForm_to = '';
    setFormValidation(formvalidation);

    setMemberchecked(newChecked);
  };

  /*
 useMemo(() => {
    alert('sddd');
      setFormValue({ ...formValue, message:bookdetails[0].message  })

  }, [bookdetails])
*/

  const validate = () => {
    const formvalidation = { ...formValidation };
    let isError = false;
    if (!formValue.message) {
      isError = true;
      formvalidation.message = 'Please add some message';
      setFormValidation(formvalidation);
    }
    if (!formValue.subject) {
      isError = true;
      formvalidation.subject = 'Please add some subject';
      setFormValidation(formvalidation);
    }
    // if (!formValue.eventForm_to) {
    //   isError = true
    //   formvalidation.eventForm_to = 'Please add contact'
    //   setFormValidation(formvalidation)
    // }
    if (groupname_membersname.length == 0) {
      isError = true;
      formvalidation.eventForm_to = 'Please add contact';
      setFormValidation(formvalidation);
    }
    if (!formValue.set_date) {
      isError = true;
      formvalidation.set_date = 'Please Select valid Date';
      setFormValidation(formvalidation);
    }

    return isError;
  };

  const handleToTagvalue = (value) => {
    setPhoneNumber(value);
  };

  //dynamic field validation
  /*
const dynamicValidate_old = () => {
  const dynamicFormVal = [...dynamicFormValidation ]
    const form_filed_change_val = [...saveInputList]
  let isError = false
  for (var i = 0; i < dynamicFormVal.length; i++) {
    if(!form_filed_change_val[i].meetingDate){
    isError = true
    dynamicFormVal[i].meetingDate = 'This field is isRequired to select future date'
    setDynamicFormValidation(dynamicFormVal)
    }
    if(!form_filed_change_val[i].endTime){
    isError = true
    dynamicFormVal[i].endTime = 'This field is isRequired'
    setDynamicFormValidation(dynamicFormVal)
    }
    if(!form_filed_change_val[i].startTime){
    isError = true
    dynamicFormVal[i].startTime = 'This field is isRequired'
    setDynamicFormValidation(dynamicFormVal)
    }
  }


  return isError
};
*/
  //dynamic field validation
  const dynamicValidate = () => {
    const dynamicFormVal = [...dynamicFormValidation];
    const form_filed_change_val = [...saveInputList];

    let requiredMsg = 'This field is required';
    let isError = false;
    for (var i = 0; i < dynamicFormVal.length; i++) {
      let meetingDate = form_filed_change_val[i].meetingDate;
      let currency = form_filed_change_val[i].currency ? form_filed_change_val[i].currency : 0;
      let startTime = form_filed_change_val[i].startTime;
      let endTime = form_filed_change_val[i].endTime;
      let breakStartTime = form_filed_change_val[i].breakStartTime;
      let breakEndTime = form_filed_change_val[i].breakEndTime;
      let breakStatus = form_filed_change_val[i].breakStatus;

      if (!meetingDate) {
        isError = true;
        dynamicFormVal[i].meetingDate = requiredMsg;
        setDynamicFormValidation(dynamicFormVal);
      }

      // if(currency<1){

      //   isError = true
      //   dynamicFormVal[i].currency = requiredMsg
      //   setDynamicFormValidation(dynamicFormVal)
      // }

      if (!startTime) {
        isError = true;
        dynamicFormVal[i].startTime = requiredMsg;
        setDynamicFormValidation(dynamicFormVal);
      }

      if (!endTime) {
        isError = true;
        dynamicFormVal[i].endTime = requiredMsg;
        setDynamicFormValidation(dynamicFormVal);
      }
      if (breakStatus=='Yes'){
        if (!breakStartTime) {
          isError = true;
          dynamicFormVal[i].breakStartTime = requiredMsg;
          console.log('breakStatus--',breakStatus)
          setDynamicFormValidation(dynamicFormVal);
        }
        if (!breakEndTime) {
          isError = true;
          dynamicFormVal[i].breakEndTime = requiredMsg;
          setDynamicFormValidation(dynamicFormVal);
        }
      }

      if (startTime && endTime) {
        let currencyVal = currency < 10 ? currency * 60 : currency;
        let slotDuration = '0:' + currencyVal;
        let startTimeSec = getSeconds(startTime);
        let endTimeSec = getSeconds(endTime);
        let startTimeSlotDurSec = startTimeSec + getSeconds(slotDuration);
        if (currencyVal) {
          if (endTimeSec <= startTimeSlotDurSec) {
            isError = true;
            dynamicFormVal[i].endTime = 'End Time must be grater than addition of Start Time & Slot Duration';
            setDynamicFormValidation(dynamicFormVal);
          }
        }

        if (breakStatus == 'Yes' && breakEndTime && breakStartTime) {
          let breakStartTimeSec = getSeconds(breakStartTime);
          let breakEndTimeSec = getSeconds(breakEndTime);

          if (
            breakEndTimeSec < startTimeSec ||
            breakEndTimeSec > endTimeSec
          ) {
            isError = true;
            dynamicFormVal[i].breakEndTime = 'Please select break time between above Start Time and End Time';
            setDynamicFormValidation(dynamicFormVal);
          }

          if(breakStartTimeSec < startTimeSec || breakStartTimeSec > endTimeSec){
            isError = true;
            dynamicFormVal[i].breakStartTime = 'Please select break time between above Start Time and End Time';
            setDynamicFormValidation(dynamicFormVal);
          }
          
          if (breakEndTimeSec <= breakStartTimeSec) {
            isError = true;
            dynamicFormVal[i].breakEndTime = 'End Time must be grater than Start Time';
            setDynamicFormValidation(dynamicFormVal);
          }
        }
      }
    }

    return isError;
  };

  const getSeconds = (hms) => {
    let hrs = 1;
    let mins = 1;

    if (typeof hms == 'object') {
      hms = moment(hms).format('HH:mm');

      let [hours, minutes] = hms.split(':');

      hrs = hours * 3600;
      mins = minutes * 60;
    } else {
      let [hours, minutes] = hms.split(':');
      hrs = hours * 3600;
      mins = minutes * 60;
    }

    return hrs + mins;
  };

  const handleReset = () => {
    console.log('formValue==', formValue);

    setFormValue({
      ...formValue,
      EventForm_to_group: '',
      allow_parents: '',
      category: '',
      dynaminc_field: '',
      eventForm_to: '',
      message: '',
      subject: '',
      subcategory_id: 157,
      category: 'Appointment',
    });
    setCategoryVal('Appointment');
    setDateChange(moment(new Date()));
    setGroupname_membersname([]);
    setMemberchecked([]);
    setChecked([]);
    setGroup_members([]);

    setSaveInputList([
      {
        meetingDate: new Date(),
        currency: '15',
        startTime: '',
        endTime: '',
        breakStatus: '0',
        breakStartTime: '',
        breakEndTime: '',
      },
    ]);
    setInputList([
      {
        meetingDate: new Date(),
        currency: '15',
        startTime: new Date(),
        endTime: new Date(),
        breakStatus: '0',
        breakStartTime: new Date(),
        breakEndTime: new Date(),
        isbooked_check: 0,
      },
    ]);
    setDynamicFormValidation([
      {
        meetingDate: '',
        currency: '',
        startTime: '',
        endTime: '',
        breakStatus: '',
        breakStartTime: '',
        breakEndTime: '',
      },
    ]);
  };
  const handleToSubmit = () => {
    if (validate()) return false;
    if (dynamicValidate()) return false;

    const formFeilds = { ...formValue };
    formFeilds.dynaminc_field = saveInputList;
    // if (validate()) return false
    const EventFormField = { ...formFeilds };

    let tempChecked = [];
    let tempMemberChecked = [];

    checked.map((data, i) => {
      if (!isNaN(data)) {
        tempChecked.push(data);
      }
    });

    // if(ID != null) {
    //   if(bookdetails !==null){
    //     EventFormField.id = ID
    //   }
    // }
    EventFormField.allow_parents = formValue.allow_parents;
    EventFormField.EventForm_to_group = tempChecked.join();
    EventFormField.EventForm_group_members_to = [...new Set(group_members)].join();
    EventFormField.user_id = user_id;
    EventFormField.user_name = first_name;

    memberchecked.map((data, i) => {
      if (!isNaN(data)) {
        tempMemberChecked.push(data);
      }
    });

    EventFormField.eventForm_to =
      matched_contact !== null ? tempMemberChecked.join() + ',' + matched_contact.user_id : tempMemberChecked.join();
    EventFormField.subcategory_id = EventFormField.category ? EventFormField.subcategory_id : '157';

    const unmatch = matched_contact ? matched_contact.mobile_no : '';
    console.log('EventFormField=====', EventFormField);

    // return false;
    const sendAttachment = '';
    console.log('EventFormField=====', EventFormField);
    createEventbook(EventFormField, unmatch, history, sendAttachment);
  };

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  useMemo(() => {
    sucessEvent && enqueueSnackbar(sucessEvent, { variant: 'success' });
  }, [sucessEvent]);

  useMemo(() => {
    if (!ID) {
      const newChecked = [...checked];

      if (member_id != 0 || group_id != 0) {
        const groupname = [];
        const membername = [];
        if (group_id != '0') {
          if (groups.length > 0) {
            groups.forEach((element) => {
              if (element.group_id == group_id) {
                groupname.push(element.group_name);
              }
            });
          } else {
            groupname.push(get_name);
          }

          newChecked.push(group_id);
          setChecked(newChecked);
        } else if (member_id != '0') {
          if (businessusers.length > 0) {
            businessusers.forEach((element) => {
              if (element.user_id == member_id) {
                membername.push(`${element.first_name} ${element.last_name}`);
              }
            });
          } else {
            membername.push(get_name);
          }

          newChecked.push(member_id);
          setMemberchecked(newChecked);
        }

        setGroupname_membersname(groupname.concat(membername));
      }
      if (member_id == undefined && group_id == undefined) {
        const membername = [];
        const members = [];
        setMemberchecked(members);
        setGroupname_membersname(membername);
      }
    }
  }, [groups, businessusers]);

  return (
    <>
      {<FullscreenSpinner open={isPageLoading} />}
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
            group_members={group_members}
          />
        </ConfirmationDialogRaw>

        <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
          <Grid item xs={7}>
            <TypoHeadStyled variant="h4">
              New <TypoHeadInnerStyled component="span"> Booking</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Grid>
          <Grid item xs={5}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleReset} size="large" startIcon={<Replay />}>
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
        <PaperStyled className="main-wrap-body book-cont-wrap">
          <GridStyled className="booking-content" container spacing={5}>
            <Grid item xs={6}>
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

                    if (getNewList) {
                      user_id_arr.push(getNewList.user_id);
                    } else {
                      //FOR GROUPS
                      let getNewGroupList = groups.find((ele) => ele.group_name == getArray[i]);
                      group_id_arr.push(getNewGroupList.group_id);
                    }
                  }

                  setGroup_members(group_id_arr);
                  setGroupname_membersname(newValue);

                  //const formdata = { ...formvalue }

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
                  EventFormField.eventForm_to =*/
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
                    name="eventForm_to"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Subject"
                fullWidth
                variant="outlined"
                name="subject"
                value={formValue.subject}
                onChange={subjectHandleinput}
                error={!!formValidation.subject}
                helperText={formValidation.subject}
                className="mb-40"
              />

              <TextField
                select
                label="Category"
                name="category"
                value={categoryVal}
                fullWidth
                onChange={handleCategoryChange}
                variant="outlined"
              >
                {category.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <img src={option.img} className={classes.categoryIon} />
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {inputList.map((x, i) => (
              <>
                <Grid className="comfort-brkCard" item xs={12}>
                  <GridVioletStyled className="comfort-brkBox" container spacing={5}>
                    {inputList.length > 1 && i > 0 && (
                      <IconButtonStyled
                        color="primary"
                        component="span"
                        size="large"
                        onClick={() => handleRemoveAnotherClick(i)}
                      >
                        {x.isbooked_check ? true : <Cancel />}
                      </IconButtonStyled>
                    )}

                    <Grid item xs={3}>
                      <DatePicker
                        label="Meeting Date"
                        inputVariant="outlined"
                        value={x.meetingDate}
                        onChange={(event) => handleInputChange('meetingDate', event, i)}
                        animateYearScrolling
                        format="DD/MM/YYYY"
                        fullWidth
                        error={!!dynamicFormValidation[i].meetingDate}
                        helperText={dynamicFormValidation[i].meetingDate}
                        disabled={x.isbooked_check ? true : false}
                        disablePast={true}
                      />
                    </Grid>

                    <Grid item xs={3}>
                      <TextField
                        select
                        label="Slot Duration"
                        fullWidth
                        value={x.currency}
                        disabled={x.isbooked_check ? true : false}
                        onChange={(event) => handleInputChange('currency', event, i)}
                        variant="outlined"
                        error={!!dynamicFormValidation[i].currency}
                        helperText={dynamicFormValidation[i].currency}
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={3}>
                      <TimePicker
                        inputVariant="outlined"
                        label="Start Time"
                        value={x.startTime}
                        disabled={x.isbooked_check ? true : false}
                        onChange={(event) => handleInputChange('startTime', event, i)}
                        fullWidth
                        ampm={false}
                        error={!!dynamicFormValidation[i].startTime}
                        helperText={dynamicFormValidation[i].startTime}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        inputVariant="outlined"
                        label="End Time"
                        value={x.endTime}
                        disabled={x.isbooked_check ? true : false}
                        onChange={(event) => handleInputChange('endTime', event, i)}
                        fullWidth
                        ampm={false}
                        error={!!dynamicFormValidation[i].endTime}
                        helperText={dynamicFormValidation[i].endTime}
                      />
                    </Grid>
                    <Grid className="comfort-opt" item xs={6}>
                      <Box display="flex"  alignItems="center">
                        <Typography className="break-txt">
                          Would you like to create a comfort break for this session?
                        </Typography>

                        <Box className="break-status" style={{marginLeft:'20px'}}>
                          <RadioGroup
                            className="inline-radio"
                            aria-label="breakStatus"
                            name="breakStatus"
                            value={x.breakStatus}
                          >
                            <FormControlLabel
                              className="radio-lbl"
                              disabled={x.isbooked_check ? true : false}
                              value="Yes"
                              control={<Radio onChange={(event) => handleInputChange('breakStatus', event, i)} />}
                              label="Yes"
                            />
                            <FormControlLabel
                              className="radio-lbl"
                              disabled={x.isbooked_check ? true : false}
                              value="No"
                              control={<Radio onChange={(event) => handleInputChange('breakStatus', event, i)} />}
                              label="No"
                              checked={x.breakStatus == 'No' ? 'checked' : ''}
                            />
                          </RadioGroup>
                        </Box>
                      </Box>
                    </Grid>
                    {x.breakStatus == 'Yes' ? (
                      <>
                        <Grid item xs={3}>
                          <TimePicker
                            inputVariant="outlined"
                            label="Start Time"
                            value={x.breakStartTime}
                            disabled={x.isbooked_check ? true : false}
                            onChange={(event) => handleInputChange('breakStartTime', event, i)}
                            fullWidth
                            ampm={false}
                            error={!!dynamicFormValidation[i].breakStartTime}
                            helperText={dynamicFormValidation[i].breakStartTime}
                          />
                        </Grid>
                        <Grid item xs={3}>
                          <TimePicker
                            inputVariant="outlined"
                            label="End Time"
                            value={x.breakEndTime}
                            disabled={x.isbooked_check ? true : false}
                            onChange={(event) => handleInputChange('breakEndTime', event, i)}
                            fullWidth
                            ampm={false}
                            error={!!dynamicFormValidation[i].breakEndTime}
                            helperText={dynamicFormValidation[i].breakEndTime}
                          />
                        </Grid>
                      </>
                    ) : null}
                  </GridVioletStyled>
                </Grid>

                <Grid className="block_gap" item xs={12}>
                  {inputList.length - 1 === i && i < 4 && (
                    <ButtonAddStyled startIcon={<AddCircle />} color="primary" onClick={handleAddAnotherClick}>
                      Add another day
                    </ButtonAddStyled>
                  )}
                  {inputList.length - 1 === i && i < 4 && <Divider className="mt-30 mb-20" />}
                </Grid>
              </>
            ))}

            <Grid item xs={4}>
              <DatePicker
                label="Booking deadline date"
                inputVariant="outlined"
                value={setDate}
                onChange={handleDateChange}
                animateYearScrolling
                name="set_date"
                format="DD/MM/YYYY"
                fullWidth
                error={!!formValidation.set_date}
                helperText={formValidation.set_date}
                disablePast={true}
              />
              <Typography className="mr-30 mt-10">Setting a deadline date helps contacts to book quickly.</Typography>
            </Grid>
            {/* <Grid className="comfort-opt" item xs={8}>
              <Box display='flex' alignItems='center'>
                <Typography className='mr-30'>Allow parents to add a comment to their booking?</Typography>
                <Box className="break-status">
                 <RadioGroup className="inline-radio"
                      aria-label="add_comment"
                      name="add_comment"
                      value={allowParentValue}>

                  <FormControlLabel className="radio-lbl"  value='Yes'   control={<Radio onClick={handleAllowparents} color='primary' />} label='Yes' />
                  <FormControlLabel className="radio-lbl"  value='No'   control={<Radio onClick={handleAllowparents} color='primary' />} label='No' />

                </RadioGroup>
                </Box>
              </Box>
            </Grid> */}

            <Grid item xs={12}>
              <CKEditor
                config={ckEditorConfig}
                editor={Editor}
                data={formValue.message}
                name="message"
                error={!!formValidation.message}
                onReady={(editor) => {
                  console.log('Editor is ready to use!', editor);
                }}
                // onChange={ ( event, editor ) => {
                //   const data = editor.getData();
                //   setMessage(data);
                //   //console.log('formValue====',formValue);
                //   // console.warn('dataert4545err', data);
                //   //setFormValue({ ...formValue, message: data })
                //   //messageHandleinput(data, true)
                // }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setMessage(data);
                }}
                // onBlur={ ( event, editor ) => {
                //     console.log( 'Blur.', editor );
                //     const data = editor.getData();
                //     setMessage(data);
                // }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
              />
              <p class="error">{formValidation.message}</p>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                {/*  <ButtonColor variant='contained' color='primary' size='large' className='mr-30 width180' startIcon={<Visibility />}>
                  Preview
                </ButtonColor> */}

                {/*<ButtonWarn variant='contained' color='primary' size='large' startIcon={<Send />}>
                  Send Rymindr
                </ButtonWarn>*/}

                <ButtonWarn
                  className="btn-booking"
                  onClick={handleToSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Send />}
                  disabled={loading}
                >
                  {loading && <CircularSpinner />}
                  {checkupdate == 1 ? 'Update Booking' : 'Create Booking'}
                </ButtonWarn>
              </Box>
            </Grid>
          </GridStyled>
        </PaperStyled>
      </MuiPickersUtilsProvider>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.bookevent.loading,
    error: state.bookevent.error,
    sucessEvent: state.bookevent.sucessEvent,
    groups: state.bookevent.groups,
    bookdetails: state.booklist.bookdetails,
    businessusers: state.bookevent.businessusers,
    matched_contact: state.bookevent.matched_contact,
    category: state.bookevent.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: (data) => dispatch(getGroups(data)),
    getBookListDetail: (data) => dispatch(getBookListDetail(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    createEventbook: (data, unmatch, history, sendAttachment) =>
      dispatch(createEventbook(data, unmatch, history, sendAttachment)),

    getCategory: () => dispatch(getCategory()),
  };
};

CreateEventbook.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createEventbook: PropTypes.func.isRequired,

  businessusers: PropTypes.array.isRequired,
  getBusinessUsers: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  getBookListDetail: PropTypes.func.isRequired,
  matched_contact: PropTypes.any.isRequired,
  getCategory: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(CreateEventbook));
