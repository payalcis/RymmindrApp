import { Attachment, Replay, Send, Headset, Videocam, Description } from '@material-ui/icons';
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
} from '@material-ui/core';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers';
import React, { useEffect, useMemo, useState } from 'react';
import {
  createRymindr,
  getBusinessUsers,
  getCategories,
  getGroups,
  getSubCategories,
  inviteAndAddMobile,
} from '../../../store/actions/rymidr';
import { makeStyles, styled } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularSpinner from '../../../component/CircularSpinner/index';
// import ConfirmationDialogRaw from './Modal'
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
// import Tabmenu from './Modal/Memberlist'
import { connect } from 'react-redux';
import moment from 'moment';
import { withSnackbar } from 'notistack';
import FileBase64 from 'react-file-base64';
import CancelIcon from '@material-ui/icons/Cancel';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import ckEditorConfig from '../../../helper/ckEditorConfig';

import ConfirmationDialogRaw from '../../Bookings/EventBooking/Modal';
import Tabmenu from '../../Bookings/EventBooking/Modal/Memberlist';

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
  iconAttach: {
    color: theme.palette.primary.dark,
    background: theme.palette.primary.light,
    height: 32,
    width: 32,
    borderRadius: 60,
    padding: 5,
    float: 'left',
    marginTop: -5,
    marginRight: '10px',
  },
  fileName: {
    maxWidth: 140,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));
const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
  marginTop: 10,
  marginBottom: 20,
  cursor: 'pointer',
  marginRight: 30,
  display: 'flex',
}));

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const PaperStyled = styled(Paper)({
  padding: '10px 15px',
});
const SlideBoxStyled = styled(Box)(() => ({
  textAlign: 'center',
  display: 'inline-block',

  padding: 20,
  borderRadius: 10,
  '& img': {
    display: 'inline-block',
    height: 75,
    width: 75,
  },
}));

const SlideType = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: 16,
}));

const GridStyled = styled(Grid)(({ theme }) => ({
  paddingLeft: '10rem',
  paddingRight: '10rem',
  [theme.breakpoints.down('md')]: {
    paddingLeft: '8rem',
    paddingRight: '8rem',
  },

  [theme.breakpoints.down('sm')]: {
    paddingLeft: '2rem',
  },
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  background: '#FFA502',
}));

const Recurring = ['Daily', 'Weekly', 'Monthly', 'Yearly'];

// const FormFields = {
//   rymindr_date: '2020-05-02',
//   note: 'test',
//   is_shareable: true,
//   rymindr_to_group: '125,126',
//   rymindr_group_members_to: '2892,2954,2',
//   category_id: '1',
//   rymindr_time: '12:38',
//   rymindr_to: '3032,2924,2892',
//   rymindr_type: 'Energy (Gas & Electric)',
//   qiscus_id: '14805940',
//   user_id: '2891',
//   user_name: 'demo data H',
//   subcategory_id: '22',
//   appointment: true,
//   is_qrcode: true,
//   no_of_time: '',
// };

// const FormFields = {
//   rymindr_date: '',
//   note: '',
//   is_shareable: true,
//   rymindr_to_group: '',
//   rymindr_group_members_to: '',
//   category_id: '',
//   rymindr_time: '',
//   rymindr_to: '',
//   rymindr_type: '',
//   qiscus_id: '',
//   user_id: '',
//   user_name: '',
//   rymindr_recurring_type: '',
//   subcategory_id: '',
//   appointment: true,
//   is_qrcode: ''
// }

const CreateRymindr = (props) => {
  const classes = useStyles();

  const { user_id, business_code, first_name, last_name, default_category } = JSON.parse(
    localStorage.getItem('userData')
  );
  console.log('default Category -- ', default_category);
  const FormFields = {
    rymindr_date: '',
    note: '',
    is_shareable: true,
    rymindr_to_group: '',
    rymindr_group_members_to: '',
    category_id: default_category,
    rymindr_time: '',
    rymindr_to: '',
    rymindr_type: '',
    qiscus_id: '',
    user_id: '',
    user_name: '',
    rymindr_end_date: '',
    rymindr_recurring_type: '',
    rymindr_period_type: '',
    subcategory_id: '',
    appointment: true,
    is_qrcode: '',
  };

  const {
    enqueueSnackbar,
    error,
    categories,
    subcategories,
    getSubCategories,
    getGroups,
    groups,
    businessusers,
    getBusinessUsers,
    createRymindr,
    inviteAndAddMobile,
    matched_contact,
    loading,
    DetailView,
    success_message,
  } = props;

  const [state, setState] = useState({
    checkedB: true,
    switch: true,
    switchrecuring: false,
  });
  const history = useHistory();
  const { member_id, group_id, get_name } = useParams();

  const date = new Date();
  const [selectedDate, sethandleDateChange] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedTime, sethandleTimeChange] = useState(moment(new Date()).format('YYYY-MM-DD HH:mm'));

  // const [selectedEndDate, sethandleEndDateChange] = useState(moment(new Date()).format('YYYY-MM-DD'))
  const [selectedEndDate, sethandleEndDateChange] = useState(moment(new Date(), 'YYYY-MM-DD').add(1, 'days'));

  const [loaded, setLoaded] = useState(false);
  const [subcategory, setSubCategory] = useState(0);
  const [checked, setChecked] = useState([]);
  const [memberchecked, setMemberchecked] = useState([]);
  const [checkOnSelectAllMembers, setcheckOnSelectAllMembers] = useState(false);
  const [checkOnSelectAllGroup, setcheckOnSelectAllGroup] = useState(false);

  const [group_members, setGroup_members] = useState('');
  const [groupname_membersname, setGroupname_membersname] = useState([]);
  const [formvalue, setFormvalue] = useState(FormFields);
  const [formValidation, setFormValidation] = useState(FormFields);
  const [open, setOpen] = useState(false);
  const [timeErr, setTimeErr] = useState('');
  const [toErr, settoErr] = useState('');

  const [categories_listing, set_categories_listing] = useState([]);

  const [dateErr, setdateErr] = useState('');
  const [endDateErr, setEndDateErr] = useState('');
  const [phoneNumber, setPhoneNumber] = useState([]);
  const [files, setFiles] = useState([]);
  const [data, setData] = useState(window.location.href.split('/:')[1]);

  const [slider, setSlider] = useState(null);
  const [editorValue, setEditorValue] = useState(null);

  const handleChange = (e) => {
    const formdata = { ...formvalue };
    const formvalidation = { ...formValidation };
    const value = e.target.value;
    const name = e.target.name;
    if (name === 'rymindr_type') {
      const found = subcategories.find((element) => element.id === value);
      formdata.rymindr_type = found.category_name;
      formdata.subcategory_id = value;
      formvalidation.subcategory_id = '';
      setFormValidation(formvalidation);
    } else if (name === 'note') {
      formvalidation.note = '';
      setFormValidation(formvalidation);
      formdata[name] = value;
    } else if (name === 'rymindr_recurring_type') {
      formvalidation.rymindr_recurring_type = '';
      setFormValidation(formvalidation);
      formdata[name] = value;
    } else {
      formdata[name] = value;
    }
    setFormvalue(formdata);
  };

  const handleDateChange = (e) => {
    const date = new Date(e);
    const selectedstartdate = moment(date).format('YYYY-MM-DD');
    const selectedEndDate1 = moment(selectedEndDate).format('YYYY-MM-DD');
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    if (currentDate <= selectedstartdate) {
      setdateErr('');
      sethandleDateChange(selectedstartdate);
      setFormvalue({ ...formvalue, rymindr_date: selectedstartdate });
      // const new_select = moment(date).format('YYYY-MM-DD HH:mm')
      // sethandleTimeChange(new_select)
    } else {
      setdateErr('You can not choose a date before the current date.');
      sethandleDateChange(selectedstartdate);
    }
    console.log('date--', selectedstartdate, '\n', selectedEndDate1);
    if (state.switchrecuring) {
      if (selectedEndDate1 < selectedstartdate) {
        console.log('err--');
        setEndDateErr('You can not choose a date before the start date.');
        sethandleDateChange(selectedstartdate);
      } else if (selectedEndDate1 == selectedstartdate) {
        setEndDateErr('End date must be greater than start date');
        sethandleDateChange(selectedstartdate);
      } else {
        setEndDateErr('');
        sethandleDateChange(selectedstartdate);
      }
    }
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e);
    const selectedenddate = moment(date).format('YYYY-MM-DD');
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const startDate = moment(selectedDate).format('YYYY-MM-DD');
    console.log('startDate===', startDate);
    console.log('selectedenddate===', selectedenddate);
    if (currentDate >= selectedenddate) {
      setEndDateErr('You can not choose a date before the current date.');
      sethandleEndDateChange(selectedenddate);
    } else if (startDate >= selectedenddate) {
      setEndDateErr('End date must be greater than start date');
      sethandleEndDateChange(selectedenddate);
    } else {
      setEndDateErr('');
      sethandleEndDateChange(selectedenddate);
      setFormvalue({ ...formvalue, rymindr_end_date: selectedenddate });
    }
  };

  const handleTimeChange = (e) => {
    const date = new Date(e);
    const selectedtime = moment(date);

    const selecteddate = moment(new Date(selectedtime).getTime()).format('YYYY-MM-DD HH:mm');
    const currentDate = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm');

    const new_select = moment(selectedDate).format('YYYY-MM-DD') + ' ' + moment(new Date(e).getTime()).format('HH:mm');

    const time = moment(new Date(e).getTime()).format('HH:mm:ss');
    if (currentDate <= new_select) {
      setTimeErr('');
      sethandleTimeChange(new_select);
      setFormvalue({ ...formvalue, rymindr_time: new_select });
    } else {
      setTimeErr('You can not choose a time before the current time.');
      sethandleTimeChange(new_select);
      setFormvalue({ ...formvalue, rymindr_time: new_select });
    }
    console.log('formvalue1', formvalue);
    console.log('new_select', new_select);
    console.log('selectedTime', time);
  };

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setFormvalue({ ...formvalue, [event.target.name]: event.target.checked });
  };
  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClose = (newValue) => {
    setOpen(newValue);
    const membername = [];
    const groupname = [];
    if (groups.length > 0) {
      groups.forEach((element) => {
        const checkvalue = checked.indexOf(element.group_id);
        if (checkvalue !== -1) {
          groupname.push(element.group_name);
        } else if (element.group_id == group_id) {
          groupname.push(element.group_name);
        }
      });
    }

    if (businessusers.length > 0) {
      businessusers.forEach((element) => {
        const checkvalue = memberchecked.indexOf(element.user_id);
        if (checkvalue !== -1) {
          if (element.user_id == user_id) {
            membername.push('You');
          } else {
            membername.push(
              element.first_name !== '' ? `${element.first_name} ${element.last_name}` : element.mobile_no
            );
          }
        } else if (element.user_id == member_id) {
          if (element.user_id == user_id) {
            membername.push('You');
          } else {
            membername.push(
              element.first_name !== '' ? `${element.first_name} ${element.last_name}` : element.mobile_no
            );
          }
        }

        settoErr('');
      });

      if (membername == '') {
        membername.push('You');
      }

      setGroupname_membersname(groupname.concat(membername));
      if (checked.length == 0 && memberchecked.length == 0) {
        setGroupname_membersname([]);
      }
      const dataToSend = {
        mobile_no: phoneNumber.join(),
      };
      if (phoneNumber.length > 0) {
        inviteAndAddMobile(dataToSend);
      }

      if (newValue) {
        // setValue(newValue);
      }
    }
  };
  console.log('groups--', groups);
  const handleGroupToggle = (value) => {
    console.log('value--', value);
    setcheckOnSelectAllGroup(false);
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
    setChecked(newChecked);
    setGroup_members(selectedmember);
  };

  const handleMemberToggle = (value) => {
    const currentIndex = memberchecked.indexOf(value.user_id);
    const newChecked = [...memberchecked];
    if (group_id != '0') {
      newChecked.push(group_id);
    }
    if (member_id != '0') {
      newChecked.push(member_id);
    }

    if (currentIndex === -1) {
      newChecked.push(value.user_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    const removeLoginUser = newChecked.indexOf(user_id.toString());
    const removeUndefinedIndex = newChecked.indexOf(undefined);

    if (removeLoginUser > -1) {
      newChecked.splice(removeLoginUser, 1);
    }
    if (removeUndefinedIndex > -1) {
      for (var i = 0; i < newChecked.length; i++) {
        if (newChecked[i] == undefined) {
          newChecked.splice(newChecked.indexOf(undefined), 1);
          i--;
        }
      }
      if (newChecked.length < 1) {
        newChecked.push(user_id);
        var temp = [];
        temp.push('You');
      }
    }

    setMemberchecked(newChecked);
    setGroupname_membersname(temp);

    const groupname = [];
    const membername = [];

    if (value == 0) {
      businessusers.forEach((element) => {
        membername.push(element.first_name !== '' ? `${element.first_name} ${element.last_name}` : element.mobile_no);

        newChecked.push(element.user_id);
      });
      setcheckOnSelectAllMembers(true);
      setMemberchecked(newChecked);
    } else if (value == 1) {
      groups.forEach((element) => {
        groupname.push(element.group_name);
        newChecked.push(element.group_id);
      });
      setcheckOnSelectAllGroup(true);
      setChecked(newChecked);
    } else if (value == 3) {
      setcheckOnSelectAllMembers(false);
      setMemberchecked([]);
    } else if (value == 4) {
      setcheckOnSelectAllGroup(false);
      setChecked([]);
    } else {
      setcheckOnSelectAllMembers(false);
    }
    setGroupname_membersname(groupname.concat(membername));
  };

  const location = useLocation(); // FOR SELECTED DATE FROM CALENDAR
  useEffect(() => {
    // SELECTED VALUE FROM CALENDAR
    if (location.state) {
      sethandleDateChange(location.state.selectedDate);
    } else {
      sethandleDateChange(new Date());
    }
    // SELECTED VALUE FROM CALENDAR
    const dataToSend = {
      user_id,
      category_id: '',
    };
    props.getcategories(dataToSend);

    getGroups({ user_id });
    const SendToBusiness = {
      user_id,
      business_code,
    };

    getBusinessUsers(SendToBusiness);

    /// ///////////////////////////////////////
  }, []);

  useEffect(() => {
    // let get_category = []
    if (categories.length > 0) {
      const get_category = categories.filter((item) => item.is_message_center === 0);
      set_categories_listing(get_category);
      get_category.map((data, index) => {
        if (default_category == data.id) {
          setSubCategory(index);
          setLoaded(true);
        }
      });
    }
  }, [categories]);

  useEffect(() => {
    if (slider) {
      slider.slickGoTo(subcategory);
    }
  }, [slider]);

  const settings = {
    accessibility: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    initialSlide: subcategory,
    afterChange: (index) => {
      if (categories_listing.length > 0) {
        const formdata = { ...formvalue };
        setSubCategory(index);
        const parent_cat_id = categories_listing[index].id;
        console.log('subcategory---');
        formdata.category_id = parent_cat_id;
        formdata.subcategory_id = '';
        formdata.rymindr_type = '';
        setFormvalue(formdata);
        const dataToSend = {
          user_id,
          category_id: parent_cat_id,
        };

        getSubCategories(dataToSend);
      }
    },
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };
  
  const validate = () => {
    const formvalidation = { ...formValidation };
    let isError = false;
    const selectedstartdate = moment(selectedDate).format('YYYY-MM-DD');
    const selectedEndDate1 = moment(selectedEndDate).format('YYYY-MM-DD');
    const selectedTime1 = moment(selectedTime).format('HH:mm');
    const currentDate = moment(new Date()).format('YYYY-MM-DD');
    const currentTime = moment(new Date()).format('HH:mm')
    if (!formvalue.subcategory_id) {
      isError = true;
      formvalidation.subcategory_id = 'Please select a sub category';
      setFormValidation(formvalidation);
    }

    if (!formvalue.rymindr_time) {
        isError = true;
        setTimeErr('Please select a Time');
      } else {
        setTimeErr('');
      }
    

    if (selectedstartdate== currentDate && selectedTime1<= currentTime){
      isError = true;
        setTimeErr('You can not choose a time before the current time.');
    }
    if (!formvalue.note) {
      isError = true;
      formvalidation.note = 'Please write rymindr';
      setFormValidation(formvalidation);
    } else if (formvalue.note.length > 1500) {
      isError = true;
      formvalidation.note = 'Rymindr should not be more than 1500 characters';
      setFormValidation(formvalidation);
    }
    if (dateErr !== '') {
      isError = true;
      setdateErr('You can not choose a date before the current date.');
    }
    // if (timeErr !== '') {
    //   isError = true;
    //   setTimeErr('You can not choose a time before the current time.');
    // }
    if (groupname_membersname.length == 0) {
      isError = true;
      settoErr('This field should not be empty.');
    }

    // if (state.switchrecuring) {
    //   if (formvalue.rymindr_recurring_type == 'Daily') {
    //     if ((!formvalue.rymindr_period_type) || !(parseInt(formvalue.rymindr_period_type) > 1 && parseInt(formvalue.rymindr_period_type) <= 2000)) {
    //       isError = true
    //       formvalidation.rymindr_period_type = 'This should not be zero or blank or more than 2000'
    //       setFormValidation(formvalidation)
    //     }
    //   } else if (formvalue.rymindr_recurring_type == 'Weekly') {
    //     if ((!formvalue.rymindr_period_type) || !(parseInt(formvalue.rymindr_period_type) > 1 && parseInt(formvalue.rymindr_period_type) <= 500)) {
    //       isError = true
    //       formvalidation.rymindr_period_type = 'This should not be zero or blank or more than 500'
    //       setFormValidation(formvalidation)
    //     }
    //   } else if (formvalue.rymindr_recurring_type == 'Monthly') {
    //     if ((!formvalue.rymindr_period_type) || !(parseInt(formvalue.rymindr_period_type) > 1 && parseInt(formvalue.rymindr_period_type) <= 500)) {
    //       isError = true
    //       formvalidation.rymindr_period_type = 'This should not be zero or blank or more than 500'
    //       setFormValidation(formvalidation)
    //     }
    //   } else if (formvalue.rymindr_recurring_type == 'Yearly') {
    //     if ((!formvalue.rymindr_period_type) || !(parseInt(formvalue.rymindr_period_type) > 1 && parseInt(formvalue.rymindr_period_type) <= 15)) {
    //       isError = true
    //       formvalidation.rymindr_period_type = 'This should not be zero or blank or more than 15'
    //       setFormValidation(formvalidation)
    //     }
    //   }
    //   if (!formvalue.rymindr_recurring_type) {
    //     isError = true
    //     formvalidation.rymindr_recurring_type = 'Please select the period'
    //     setFormValidation(formvalidation)
    //   }
    // }

    if (state.switchrecuring) {
      if (endDateErr !== '') {
        isError = true;
        setEndDateErr(endDateErr);
      }
      if (!formvalue.rymindr_recurring_type) {
        isError = true;
        formvalidation.rymindr_recurring_type = 'Please select the period';
        setFormValidation(formvalidation);
      }
      if (selectedEndDate1 < selectedstartdate) {
        console.log('err--');
        setEndDateErr('You can not choose a date before the start date.');
        sethandleDateChange(selectedstartdate);
      } else if (selectedEndDate1 == selectedstartdate) {
        setEndDateErr('End date must be greater than start date');
        sethandleDateChange(selectedstartdate);
      } else {
        setEndDateErr('');
        sethandleDateChange(selectedstartdate);
      }
    }
    return isError;
  };

  const handleToTagvalue = (value) => {
    setPhoneNumber(value);
  };
  const handleReset = () => {
    setFormvalue(FormFields);
    sethandleDateChange(new Date());
    sethandleTimeChange(date.getTime());
    sethandleEndDateChange(moment(new Date(), 'YYYY-MM-DD').add(1, 'days'));
    setFormValidation(FormFields);
    setTimeErr('');
    setEndDateErr('');
    // setGroupname_membersname([])
    // setMemberchecked([])
    setChecked([]);
    setcheckOnSelectAllMembers(false);
    setcheckOnSelectAllGroup(false);

    const membername = [];
    const members = [];
    membername.push(`You`);
    members.push(user_id);
    setMemberchecked(members);
    setGroupname_membersname(membername);
  };

  // const handleToSubmit = () => {
  //   if (validate()) return false
  //   const FormFields11 = { ...formvalue }
  //   if (FormFields11.category_id == '') {
  //     const parent_cat_id = default_category
  //     FormFields11.category_id = parent_cat_id
  //   }
  //   let temp_time = selectedTime.split(' ');
  //   FormFields11.rymindr_to_group = checked.join()
  //   FormFields11.rymindr_group_members_to = [...new Set(group_members)].join()
  //   FormFields11.user_id = user_id
  //   FormFields11.user_name = first_name
  //   FormFields11.rymindr_date = moment(selectedDate).format('YYYY-MM-DD')
  //   FormFields11.rymindr_time = temp_time[1]
  //   FormFields11.rymindr_to =
  //     matched_contact !== null ? memberchecked.join() + ',' + matched_contact.user_id : memberchecked.join()
  //   if (!state.switchrecuring) {
  //     delete FormFields11.rymindr_period_type
  //     delete FormFields11.rymindr_recurring_type
  //   }
  //   const sendAttachment = files
  //   const unmatch = matched_contact ? matched_contact.mobile_no : ''
  //   console.warn('FormFields11123', FormFields11, unmatch, history, sendAttachment);
  //   createRymindr(FormFields11, unmatch, history, sendAttachment)
  // }
  console.log('group_members--', group_members);
  const handleToSubmit = () => {
    if (validate()) return false;
    const FormFields11 = { ...formvalue };
    if (FormFields11.category_id == '') {
      const parent_cat_id = default_category;
      FormFields11.category_id = parent_cat_id;
    }
    let temp_time = selectedTime.split(' ');
    FormFields11.rymindr_to_group = checked.join();
    FormFields11.rymindr_group_members_to = group_members;
    // FormFields11.rymindr_group_members_to = [...new Set(group_members)].join()
    FormFields11.user_id = user_id;
    FormFields11.user_name = first_name;

    const startDate = moment(selectedDate).format('YYYY-MM-DD');
    const endDate = moment(selectedEndDate).format('YYYY-MM-DD');

    FormFields11.rymindr_date = startDate;
    FormFields11.rymindr_end_date = endDate;
    FormFields11.rymindr_time = temp_time[1];
    FormFields11.rymindr_to =
      matched_contact !== null ? memberchecked.join() + ',' + matched_contact.user_id : memberchecked.join();
    if (state.switchrecuring) {
      console.log('startDate====', startDate);
      console.log('endDate====', endDate);
      FormFields11.rymindr_period_type = getPeriod_type(startDate, endDate, FormFields11.rymindr_recurring_type);
    } else {
      delete FormFields11.rymindr_period_type;
      delete FormFields11.rymindr_end_date;
      delete FormFields11.rymindr_recurring_type;
    }
    const sendAttachment = files;
    const unmatch = matched_contact ? matched_contact.mobile_no : '';

    //console.log('sendAttachment=========',sendAttachment);

    //console.warn('FormFields11123', FormFields11, unmatch, history, sendAttachment);
    console.log('FormFields11-', FormFields11);
    history.push('/rymindrs');
    createRymindr(FormFields11, unmatch, history, sendAttachment);
  };

  const getPeriod_type = (d1, d2, recurring_type) => {
    const secondsDiff = (d1, d2) => {
      let millisecondDiff = d2 - d1;
      let secDiff = Math.floor((d2 - d1) / 1000);
      return secDiff;
    };

    const minutesDiff = (d1, d2) => {
      let seconds = secondsDiff(d1, d2);
      let minutesDiff = Math.floor(seconds / 60);
      return minutesDiff;
    };

    const hoursDiff = (d1, d2) => {
      let minutes = minutesDiff(d1, d2);
      let hoursDiff = Math.floor(minutes / 60);
      return hoursDiff;
    };

    const daysDiff = (d1, d2) => {
      let hours = hoursDiff(d1, d2);
      let daysDiff = Math.floor(hours / 24);
      return daysDiff;
    };
    const weeksDiff = (d1, d2) => {
      let days = daysDiff(d1, d2);
      let weeksDiff = Math.floor(days / 7);
      return weeksDiff;
    };
    const yearsDiff = (d1, d2) => {
      let date1 = new Date(d1);
      let date2 = new Date(d2);
      let yearsDiff = date2.getFullYear() - date1.getFullYear();
      return yearsDiff;
    };
    const monthsDiff = (d1, d2) => {
      let date1 = new Date(d1);
      let date2 = new Date(d2);
      let years = yearsDiff(d1, d2);
      let months = years * 12 + (date2.getMonth() - date1.getMonth());
      return months;
    };

    let numbers = '';
    if (recurring_type == 'Daily') {
      numbers = daysDiff(new Date(d1).getTime(), new Date(d2).getTime());
    } else if (recurring_type == 'Weekly') {
      numbers = weeksDiff(new Date(d1).getTime(), new Date(d2).getTime());
    } else if (recurring_type == 'Monthly') {
      numbers = monthsDiff(new Date(d1).getTime(), new Date(d2).getTime());
    } else if (recurring_type == 'Yearly') {
      numbers = yearsDiff(new Date(d1).getTime(), new Date(d2).getTime());
    }
    return numbers;
  };

  const handleAllMembersToggle = (value) => {
    const newChecked = [...value];
    setMemberchecked(newChecked);
    console.log('memberchecked-', memberchecked);
  };

  const handleAllGroupMembersToggle = (value) => {
    const newChecked = [...value];
    setChecked(newChecked);
    console.log('checked', checked);
    let members = '';
    const groupMembers = groups.forEach((item) => {
      members = members + ',' + item.group_members;
    });
    setGroup_members(members);
    console.log('members-', members);
  };

  useMemo(() => {
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
              if (element.first_name !== '') {
                membername.push(`${element.first_name} ${element.last_name}`);
              } else {
                membername.push(`${element.mobile_no}`);
              }
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
      membername.push('You');
      members.push(user_id);
      setMemberchecked(members);
      setGroupname_membersname(membername);
    }
  }, [groups, businessusers]);
  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  // useMemo(() => {
  //   success_message && enqueueSnackbar(success_message, { variant: 'success' })
  // }, [success_message])

  const handleToopen = () => {
    setOpen(true);
  };

  const deleteImage2 = (index, file) => {
    files.splice(index, 1);
    if (files.length == 0) {
      setFiles([]);
    } else {
      setFiles([...files]);
    }
  };

  const deleteImage = (index, file) => {
    if (file && file.name) {
      var removeIndex = files
        .map(function (item) {
          return item.name;
        })
        .indexOf(file.name);
      files.splice(removeIndex, 1);
    }
    if (files.length == 0) {
      setFiles([]);
    } else {
      setFiles([...files]);
      console.log('files===', files);
    }
  };

  const getFiles = (inputfile) => {
    const file_Array = [...files];
    inputfile.map((files1) => {
      var extn = files1.name.split('.');
      var etn = ['docx', 'doc', 'pdf', 'jpg', 'jpeg', 'png'];

      var low = extn[1].toLowerCase();

      files.push(files1);
    });

    setFiles([...files]);
  };

  const handleChangeEditor = (data) => {
    setFormValidation(data);
    setFormvalue({ ...formvalue, note: data });
  };

  // const { member_id, group_id, get_name } = useParams()
  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <ConfirmationDialogRaw open={open} onClose={handleClose} groupdata={groups} memberdata={businessusers}>
          <Tabmenu
            groupdata={groups}
            memberdata={businessusers}
            handleToggles={handleGroupToggle}
            checked={checked}
            handleMemberToggle={handleMemberToggle}
            memberchecked={memberchecked}
            handleAllMembersToggle={handleAllMembersToggle}
            handleAllGroupMembersToggle={handleAllGroupMembersToggle}
            handleToTagvalue={handleToTagvalue}
          />
        </ConfirmationDialogRaw>
        <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
          <Grid item xs={7}>
            <TypoHeadStyled variant="h4">
              Create <TypoHeadInnerStyled component="span">Rymindr</TypoHeadInnerStyled>
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

        <PaperStyled className="main-wrap-body create-ray-cont">
          <Grid className="article-content">
            <div className="slideContainer">
              {categories.length > 0 && loaded ? (
                <Slider ref={(slider) => setSlider(slider)} {...settings}>
                  {categories.map((item, key) => {
                    return item.is_message_center == 0 ? (
                      <SlideBoxStyled key={key} data={item}>
                        <img src={item.category_image} className="SlideIcon" />
                        <SlideType>{item.category_name}</SlideType>
                      </SlideBoxStyled>
                    ) : (
                      ''
                    );
                  })}
                </Slider>
              ) : (
                <div>Loading...</div>
              )}
            </div>

            <GridStyled container spacing={5}>
              <Grid item xs={4}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Sub Category"
                  value={formvalue.subcategory_id}
                  fullWidth
                  onChange={handleChange}
                  name="rymindr_type"
                  variant="outlined"
                  error={!!formValidation.subcategory_id}
                  helperText={formValidation.subcategory_id}
                >
                  {subcategories.length > 0
                    ? subcategories.map((option, key) => (
                        <MenuItem key={key} value={option.id}>
                          {option.category_name}
                        </MenuItem>
                      ))
                    : loading && <CircularSpinner />}
                </TextField>
              </Grid>
              {console.log('formvalue', formvalue)}
              <Grid item xs={4}>
                <DatePicker
                  label="Set Date"
                  inputVariant="outlined"
                  value={selectedDate}
                  onChange={handleDateChange}
                  animateYearScrolling
                  format="DD/MM/YYYY"
                  fullWidth
                  name="rymindr_date"
                  error={!!dateErr}
                  helperText={dateErr}
                  disablePast={true}
                />
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  inputVariant="outlined"
                  label="Set Time"
                  value={selectedTime}
                  onChange={handleTimeChange}
                  fullWidth
                  ampm={false}
                  error={!!timeErr}
                  helperText={timeErr}
                />
              </Grid>
              {console.log('groupname_membersname-',groupname_membersname)}
              <Grid item xs={4}>
                <Autocomplete
                  multiple
                  limitTags={1}
                  id="tags-filled"
                  filterSelectedOptions={false}
                  options={groupname_membersname}
                  freeSolo
                  value={groupname_membersname}
                  freeSolo
                  onChange={(event, newValue) => {
                    console.log('newValue++', newValue);
                    const newVal = newValue.toString();
                    const getArray = newVal.split(',');
                    
                    const user_id_arr = [];
                    const group_id_arr = [];
                    
                    for (let i = 0; i < getArray.length; i++) {
                      const getNewList = businessusers.find(
                        (ele) => ele.first_name + ' ' + ele.last_name == getArray[i]
                      );
                      console.log('getArray', getArray);
                      console.log('getNewList', getNewList);

                      if (getNewList) {
                        if (getNewList == undefined) {
                        } else {
                          user_id_arr.push(getNewList.user_id);
                          setcheckOnSelectAllMembers(false);
                        }

                        // break;
                      } else {
                        // FOR GROUPS
                        const getNewGroupList = groups.find((ele) => ele.group_name == getArray[i]);
                        console.log('getNewGroupList', getNewGroupList);
                        console.log('groups', groups);
                        console.log('getArray', getArray);
                        if (getNewGroupList == undefined) {
                        } else {
                          group_id_arr.push(getNewGroupList.group_id);
                          setcheckOnSelectAllGroup(false);
                        }
                      }
                      console.log('user_id_arr', user_id_arr);
                      console.log('group_id_arr', group_id_arr);
                    }
                    
                    // console.log('user_id_arr',user_id_arr)
                    // const data1 = user_id_arr[0];
                    // const index1 = memberchecked.indexOf(data1);
                    // if (index1 > -1) {
                      //   memberchecked.splice(index1, 1);
                      // }
                    // // newChecked.push(group_id);
                    // const data2 = group_id_arr[0];
                    // const index2 = checked.indexOf(data2);
                    // if (index2 > -1) {
                      //   checked.splice(index2, 1);
                      // }
                      // console.log('getArray-',getArray)
                      // setGroupname_membersname(newValue);
                      // setMemberchecked(user_id_arr);
                      // setChecked(group_id_arr);


                    if (getArray.length>0 &&  getArray[0] != ''){
                      setGroupname_membersname(newValue);
                      setMemberchecked(user_id_arr);
                      setChecked(group_id_arr);
                    }
                    else{
                      setGroupname_membersname(['You'])
                      setMemberchecked([user_id])
                    }
                    console.log('newValue', newValue);
                    console.log('memberchecked', memberchecked);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="To"
                      onChange={handleToopen}
                      onClick={handleToopen}
                      error={!!toErr}
                      helperText={toErr}
                    />
                  )}
                />
              </Grid>
              {state.switchrecuring && (
                <Grid item xs={4}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    label="Period"
                    value={formvalue.rymindr_recurring_type}
                    fullWidth
                    onChange={handleChange}
                    variant="outlined"
                    name="rymindr_recurring_type"
                    error={!!formValidation.rymindr_recurring_type}
                    helperText={formValidation.rymindr_recurring_type}
                  >
                    {Recurring.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}

              <Grid item xs={4}>
                {state.switchrecuring && (
                  // <TextField
                  //   id='outlined-select-currency'
                  //   label='No. of Time'
                  //   value={formvalue.rymindr_period_type}
                  //   fullWidth
                  //   name='rymindr_period_type'
                  //   onChange={handleChange}
                  //   variant='outlined'
                  //   error={!!formValidation.rymindr_period_type}
                  //   helperText={formValidation.rymindr_period_type}
                  // />
                  <DatePicker
                    label="Set End Date"
                    inputVariant="outlined"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    animateYearScrolling
                    format="DD/MM/YYYY"
                    fullWidth
                    name="rymindr_end_date"
                    error={!!endDateErr}
                    helperText={endDateErr}
                    disablePast={true}
                  />
                )}
                <FormControlLabel
                  style={{ position: 'static', marginLeft: 6, marginTop: 8 }}
                  control={
                    <Switch
                      checked={state.switchrecuring}
                      onChange={handleSwitchChange}
                      name="switchrecuring"
                      color="primary"
                    />
                  }
                  label="Recurring"
                />
              </Grid>
              <Grid item xs={12}>
                <CKEditor
                  id="editor1"
                  config={ckEditorConfig}
                  editor={Editor}
                  data={formvalue.note}
                  name="note"
                  onReady={(editor) => {
                    console.log('Editor is ready to use!', editor);
                  }}
                  // onChange={ ( event, editor ) => {
                  //     const data = editor.getData();
                  //     handleChangeEditor(data)
                  // }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                    const data = editor.getData();
                    handleChangeEditor(data);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}
                />
                <p style={{ color: 'red', marginLeft: '1rem', fontSize: '12px', marginTop: '4px' }}>
                  {formValidation.note}
                </p>

                {/* <TextField
                id='outlined-multiline-static'
                label='What’s the rymindr'
                fullWidth
                multiline
                rows={4}
                rowsMax={100}
                variant='outlined'
                name='note'
                value={formvalue.note}
                error={!!formValidation.note}
                helperText={formValidation.note}
                onChange={handleChange}
              /> */}
              </Grid>

              <Grid item xs={12}>
                <Box display="flex">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={state.is_qrcode}
                        onChange={handleChangeCheck}
                        name="is_qrcode"
                        color="primary"
                      />
                    }
                    label="Generate QR code"
                  />

                  <FormControlLabel
                    className="attachement"
                    control={
                      <FileBase64
                        multiple
                        onDone={getFiles}
                        onClick={(e) => (e.target.value = null)}
                        className="displayNone"
                        style={{ display: 'none' }}
                      />
                    }
                    label={
                      <Typography variant="subtitle1" component="span" style={{ marginLeft: 50 }}>
                        <Attachment style={{ marginBottom: -6, marginRight: 10 }} color="primary" /> Attachments
                      </Typography>
                    }
                  />
                </Box>
                <Box alignItems="center" display="flex">
                  {files &&
                    files.map((file, index) => {
                      // alert(files.length+'----'+index+'----'+file);
                      const extension_arr = file.name.split('.');
                      const extension = extension_arr[1];

                      if (extension == 'jpeg' || extension == 'jpg' || extension == 'png' || extension == 'gif') {
                        return (
                          <TypoStyled variant="subtitle1" component="p" key={index}>
                            <img src={file.base64} width="32" height="32" className={classes.iconAttach} />{' '}
                            <Box className={classes.fileName}>{file.name}</Box>{' '}
                            <CancelIcon onClick={() => deleteImage(index, file)} />
                          </TypoStyled>
                        );
                      } else if (extension == 'mp3') {
                        return (
                          <TypoStyled variant="subtitle1" component="p" key={index}>
                            <Headset className={classes.iconAttach} /> {file.name}{' '}
                            <CancelIcon onClick={() => deleteImage(index, file)} />
                          </TypoStyled>
                        );
                      } else if (extension == 'mp4') {
                        return (
                          <TypoStyled variant="subtitle1" component="p" key={index}>
                            <Videocam className={classes.iconAttach} /> {file.name}{' '}
                            <CancelIcon onClick={() => deleteImage(index, file)} />
                          </TypoStyled>
                        );
                      } else if (extension == 'doc' || extension == 'docx' || extension == 'pdf') {
                        return (
                          <TypoStyled variant="subtitle1" component="p" key={index}>
                            <Description className={classes.iconAttach} /> {file.name}{' '}
                            <CancelIcon onClick={() => deleteImage(index, file)} />
                          </TypoStyled>
                        );
                      } else {
                        return (
                          <TypoStyled variant="subtitle1" component="p" key={index}>
                            <Description className={classes.iconAttach} /> {file.name}{' '}
                            <CancelIcon onClick={() => deleteImage(index, file)} />
                          </TypoStyled>
                        );
                      }
                    })}
                </Box>
              </Grid>

              <Grid item xs={5} />
              <Grid item xs={7}>
                <Box display="flex" justifyContent="flex-end">
                  <ButtonStyled
                    onClick={handleToSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<Send />}
                    disabled={loading}
                  >
                    {loading && <CircularSpinner />}
                    Send Rymindr
                  </ButtonStyled>
                </Box>
              </Grid>
            </GridStyled>
          </Grid>
        </PaperStyled>
      </MuiPickersUtilsProvider>
    </>
  );
};
const mapStateToProps = (state) => {
  console.log('State - ', state);
  return {
    loading: state.rymidr.loading,
    error: state.rymidr.error,
    categories: state.rymidr.categories,
    subcategories: state.rymidr.subcategories,
    groups: state.rymidr.groups,
    businessusers: state.rymidr.businessusers,
    matched_contact: state.rymidr.matched_contact,
    success_message: state.rymidr.success_message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getcategories: (data) => dispatch(getCategories(data)),
    getSubCategories: (data) => dispatch(getSubCategories(data)),
    getGroups: (data) => dispatch(getGroups(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    createRymindr: (data, unmatch, history, sendAttachment) =>
      dispatch(createRymindr(data, unmatch, history, sendAttachment)),
    inviteAndAddMobile: (data) => dispatch(inviteAndAddMobile(data)),
  };
};

CreateRymindr.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getcategories: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired,
  getSubCategories: PropTypes.func.isRequired,
  getGroups: PropTypes.func.isRequired,
  groups: PropTypes.array.isRequired,
  businessusers: PropTypes.array.isRequired,
  getBusinessUsers: PropTypes.func.isRequired,
  createRymindr: PropTypes.func.isRequired,
  inviteAndAddMobile: PropTypes.func.isRequired,
  matched_contact: PropTypes.any.isRequired,
  success_message: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(CreateRymindr));
