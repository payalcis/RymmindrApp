import { Attachment, Replay, Send,Headset, Videocam,Description } from '@material-ui/icons';
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
import { Link, useHistory,useParams, useLocation } from 'react-router-dom';
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
import ConfirmationDialogRaw from './Modal';
import MomentUtils from '@date-io/moment';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Tabmenu from './Modal/Memberlist';
import { connect } from 'react-redux';
import moment from 'moment';
import { withSnackbar } from 'notistack';
import FileBase64 from 'react-file-base64';
import CancelIcon from '@material-ui/icons/Cancel'

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
  marginRight: 30
}))

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const PaperStyled = styled(Paper)({
  padding: '10px 15px',
  height: 100 + '%',
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

const FormFields = {
  rymindr_date: '',
  note: '',
  is_shareable: true,
  rymindr_to_group: '',
  rymindr_group_members_to: '',
  category_id: '',
  rymindr_time: '',
  rymindr_to: '',
  rymindr_type: '',
  qiscus_id: '',
  user_id: '',
  user_name: '',
  rymindr_period_type: '',
  rymindr_recurring_type: '',
  subcategory_id: '',
  appointment: true,
  is_qrcode: '',
};

const CreateRymindr = (props) => {
  const classes = useStyles()

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
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
  const [state, setState] = useState({
    checkedB: true,
    switch: true,
  });
  const history = useHistory();
  const {member_id,group_id} = useParams();

  const date = new Date();
  const [selectedDate, sethandleDateChange] = useState(moment(new Date()).format('YYYY-MM-DD'));
  const [selectedTime, sethandleTimeChange] = useState(date.getTime() + 5 * 60000);
  const [subcategory, setSubCategory] = useState(0);
  const [checked, setChecked] = useState([]);
  const [memberchecked, setMemberchecked] = useState([]);
  const [checkOnSelectAllMembers, setcheckOnSelectAllMembers] =useState(false);
  const [checkOnSelectAllGroup, setcheckOnSelectAllGroup] =useState(false);

  const [group_members, setGroup_members] = useState([]);
  const [groupname_membersname, setGroupname_membersname] = useState([]);
  const [formvalue, setFormvalue] = useState(FormFields);
  const [formValidation, setFormValidation] = useState(FormFields);
  const [open, setOpen] = useState(false);
  const [timeErr, setTimeErr] = useState('');
  const [categories_listing , set_categories_listing] = useState([])

  const [dateErr, setdateErr] = useState('');

  const [phoneNumber, setPhoneNumber] = useState([]);
  const [files, setFiles] = useState([]);
  const [data , setData] = useState(window.location.href.split('/:')[1]);
  
  const handleChange = (e) => {
    const formdata = { ...formvalue };
    const formvalidation = { ...formValidation };
    const value = e.target.value;
    const name = e.target.name;
    
    if (name === 'rymindr_type') {
      // console.log(value)
      const found = subcategories.find((element) => element.id === value);
      formdata.rymindr_type = found.category_name;
      formdata.subcategory_id = value;
      formvalidation.subcategory_id = '';
      setFormValidation(formvalidation);
      
      // debugger
    }
    else if (name === 'note') {
      
      formvalidation.note = '';
      setFormValidation(formvalidation);
      formdata[name] = value;
    }
    else if(name === "rymindr_period_type"){
      formvalidation.rymindr_period_type = '';
      setFormValidation(formvalidation);
      formdata[name] = value;
    }
    else if(name === "rymindr_recurring_type"){
      formvalidation.rymindr_recurring_type = '';
      setFormValidation(formvalidation);
      formdata[name] = value;
    }
    
    else {
      formdata[name] = value;
    }
    setFormvalue(formdata);
  };

  const handleDateChange = (e) => {
    const date = new Date(e);
    const selecteddate = moment(date).format('YYYY-MM-DD');
    const currentDate = moment(new Date()).format('YYYY-MM-DD')
    
    
    if(currentDate <= selecteddate){
      setdateErr('');
      sethandleDateChange(selecteddate);
      setFormvalue({ ...formvalue, rymindr_date: selecteddate });
      sethandleTimeChange((new Date()).getTime() + 5 * 60000)
      
    }
    else{
      setdateErr('You can not choose a date before the current date.');
    }    
    
  };
  console.log(selectedDate)
  const handleTimeChange = (e) => {
    const date = new Date(e);
    const selectedtime = moment(date);
    
    const selecteddate = moment((new Date(selectedtime)).getTime()).format('YYYY-MM-DD HH:mm');
    const currentDate = moment((new Date()).getTime()).format('YYYY-MM-DD HH:mm')
    
    const new_select= moment(selectedDate).format('YYYY-MM-DD') + ' '+ moment((new Date(e)).getTime()).format('HH:mm')

    if(currentDate <= new_select){
        const time = moment((new Date(e)).getTime()).format('HH:mm');
        setTimeErr('');
        sethandleTimeChange(new_select);  
        setFormvalue({ ...formvalue, rymindr_time: new_select });
    }
    
    else{
      setTimeErr('You can not choose a time before the current time.');
    }
    
    
  };

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    setFormvalue({ ...formvalue, [event.target.name]: event.target.checked });
  };
  const handleSwitchChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

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
        
        formdata.category_id = parent_cat_id;
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
  
  const handleClose = (newValue) => {
    setOpen(newValue);
    const membername = [];
    const groupname = [];
    if(groups.length > 0){
      groups.forEach((element) => {
        const checkvalue = checked.indexOf(element.group_id);
        if (checkvalue !== -1) {
          groupname.push(element.group_name);
        }
        else if (element.group_id == group_id) {
          groupname.push(element.group_name);
        }
      });
    }
    
    if(businessusers.length > 0){
      businessusers.forEach((element) => {
        const checkvalue = memberchecked.indexOf(element.user_id);
        if (checkvalue !== -1) {
          if(element.user_id == user_id){
            membername.push(`You`);
          }else{
            membername.push(`${element.first_name} ${element.last_name}`);
          }
          
        }
        else if (element.user_id == member_id) {
          if(element.user_id == user_id){
            membername.push(`You`);
          }else{
            membername.push(`${element.first_name} ${element.last_name}`);
          }
        }
        
      });
      setGroupname_membersname(groupname.concat(membername));
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

  const handleGroupToggle = (value) => {
    setcheckOnSelectAllGroup(false)
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
    if(group_id != "0"){
      newChecked.push(group_id);
    }
    if(member_id != "0"){
      newChecked.push(member_id);
    }
    
    if (currentIndex === -1) {
      newChecked.push(value.user_id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    
    setMemberchecked(newChecked);

    
    let groupname = [];
    let membername = [];
    
    if(value == 0){
      
      businessusers.forEach((element) => {
        
          membername.push(`${element.first_name} ${element.last_name}`);
        
          newChecked.push(element.user_id);
        });
        setcheckOnSelectAllMembers(true)
      setMemberchecked(newChecked);
    }
    else if(value == 1){
        
      groups.forEach((element) => {
        
        groupname.push(element.group_name);
        newChecked.push(element.group_id);
        
      });
      setcheckOnSelectAllGroup(true)
      setChecked(newChecked)
    }
    else if(value == 3){
      setcheckOnSelectAllMembers(false)
      setMemberchecked([])
    }
    else if(value == 4){
      setcheckOnSelectAllGroup(false)
      setChecked([])
    }
    else{
      setcheckOnSelectAllMembers(false)
    }
    setGroupname_membersname(groupname.concat(membername));

  };

  const location = useLocation(); //FOR SELECTED DATE FROM CALENDAR
  useEffect(() => {
    //SELECTED VALUE FROM CALENDAR
    if(location.state){
      sethandleDateChange(location.state.selectedDate)
    }
    else{
      sethandleDateChange(new Date())
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


  }, []);
  
  useEffect(() =>{
    
    // let get_category = []
    if(categories.length > 0){
      //  categories.map(item =>{
      //    console.log(item)
      //   if(item.is_message_center === "0")
      //     {
      //       get_category.push(item)
      //     }
      // })
      const get_category = categories.filter((item) => item.is_message_center === "0" )
      set_categories_listing(get_category)
    }
    
    
  }, [categories])
  
  const validate = () => {
    const formvalidation = { ...formValidation };
    let isError = false;

    if (!formvalue.subcategory_id) {
      isError = true;
      formvalidation.subcategory_id = 'Please select a sub category';
      setFormValidation(formvalidation);
    }

    if (!formvalue.rymindr_time) {
      // var now = moment(new Date().getTime()).format('HH:mm');
      // if (now.toString() > formvalue.rymindr_time.toString()) {
      //   isError = true;
      //   setTimeErr('You can not choose a time before the current time.');
      // } else {
      //   setTimeErr('');
      // }
    }
    if (!formvalue.note) {
      isError = true;
      formvalidation.note = 'Please write rymindr';
      setFormValidation(formvalidation);
      
    }
    if(dateErr !==''){
      isError = true;      
      setdateErr('You can not choose a date before the current date.');

    } 
    if(timeErr !== ''){
      isError = true;      
      setTimeErr('You can not choose a time before the current time.');

    }
    if(state.switchrecuring){
      if((!formvalue.rymindr_period_type) || !(parseInt(formvalue.rymindr_period_type) > 1 && parseInt(formvalue.rymindr_period_type) <= 1500)){
        isError = true;
        formvalidation.rymindr_period_type = 'This should not be zero or blank or more than 1500';
        setFormValidation(formvalidation);
      }
      console.log(parseInt(formvalue.rymindr_period_type) <= 0 && parseInt(formvalue.rymindr_period_type) >= 1500)
      if(!formvalue.rymindr_recurring_type){
        isError = true;
        formvalidation.rymindr_recurring_type = 'Please select the period';
        setFormValidation(formvalidation);
      }
    }
    
    return isError;
  };

  const handleToTagvalue = (value) => {
    setPhoneNumber(value);
  };
  const handleReset = ()=>{
    setFormvalue(FormFields)
    sethandleDateChange(new Date());
    sethandleTimeChange(date.getTime())
    setGroupname_membersname([])
 
  }
  const handleToSubmit = () => {
    
    if (validate()) return false;
    const FormFields11 = { ...formvalue };
    FormFields11.rymindr_to_group = checked.join();
    FormFields11.rymindr_group_members_to = [...new Set(group_members)].join();
    FormFields11.user_id = user_id;
    FormFields11.user_name = first_name;
    FormFields11.rymindr_to =
      matched_contact !== null ? memberchecked.join() + ',' + matched_contact.user_id : memberchecked.join();
    if (!state.switchrecuring) {
      delete FormFields11.rymindr_period_type;
      delete FormFields11.rymindr_recurring_type;
    }
    const sendAttachment = files;
    const unmatch = matched_contact ? matched_contact.mobile_no : '';
    createRymindr(FormFields11, unmatch, history, sendAttachment);
  };
  useMemo(() => {
    const newChecked = [...checked];
    
    if(member_id != 0 || group_id !=0){
      let groupname = [];
      let membername = [];
      if(group_id != "0"){
        
        
        groups.forEach((element) => {
          
          if (element.group_id == group_id) {
            groupname.push(element.group_name);
          }
        });
        
        newChecked.push(group_id);
        setChecked(newChecked)
        
      }
      else if(member_id != "0"){
        
        businessusers.forEach((element) => {
          
          if (element.user_id == member_id) {
            membername.push(`${element.first_name} ${element.last_name}`);
          }
        });
        
        newChecked.push(member_id);
        setMemberchecked(newChecked);
      }
      
      setGroupname_membersname(groupname.concat(membername));
      

      
    }
    if(member_id == undefined && group_id == undefined){
      let membername = [];
      let members = []
      membername.push(`You`);
      members.push(user_id);
      setMemberchecked(members);
      setGroupname_membersname(membername)
      
    }


  }, []);
  useMemo(() => {

    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);
  useMemo(() => {
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);

  const handleToopen = () => {
    setOpen(true);
  };
  const deleteImage = (index, file) => {
   files.splice(index, 1); 
   
    if(files.length== 0){   
     setFiles([])
    }
    else{
     setFiles([...files])
    } 
    
 }
  const getFiles = (inputfile) => {
    
    let file_Array = []
    inputfile.map((files)=>{

      var extn = files.name.split('.');
      var etn = ['docx', 'doc', 'pdf', 'jpg', 'jpeg', 'png'];

      var low = extn[1].toLowerCase();
      
      // if (etn.includes(low)) {
        
        file_Array.push(files)
        
      // } else {
      // }
    })
    setFiles(file_Array);
  };
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
            handleToTagvalue={handleToTagvalue}
            checkOnSelectAllMembers={checkOnSelectAllMembers}
            checkOnSelectAllGroup={checkOnSelectAllGroup}
          />
        </ConfirmationDialogRaw>
        <Grid container style={{ marginBottom: 20 }} alignItems="center">
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

        <PaperStyled>
          <div className="slideContainer">
            <Slider {...settings}>
              {categories.map((item, key) => {
                return (
                  (item.is_message_center == 0)?
                  <SlideBoxStyled key={key} data={item}>
                    <img src={item.category_image} className="SlideIcon" />
                    <SlideType>{item.category_name}</SlideType>
                  </SlideBoxStyled>
                  :''
                );
              })}
            </Slider>
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
                {subcategories.length>0 ? subcategories.map((option, key) => (
                  <MenuItem key={key} value={option.id}>
                    {option.category_name}
                  </MenuItem>
                )):loading && <CircularSpinner />}
              </TextField>
            </Grid>
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
            <Grid item xs={4}>
              <Autocomplete
                multiple
                limitTags={1}
                id="tags-filled"
                filterSelectedOptions={false}
                options={[]}
                freeSolo
                value={groupname_membersname}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="To" onChange={handleToopen} onClick={handleToopen} />
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
                <TextField
                  id="outlined-select-currency"
                  label="No. of Time"
                  value={formvalue.rymindr_period_type}
                  fullWidth
                  name="rymindr_period_type"
                  onChange={handleChange}
                  variant="outlined"
                  error={!!formValidation.rymindr_period_type}
                  helperText={formValidation.rymindr_period_type}
                />
              )}
              <FormControlLabel
                style={{ position: 'absolute', marginLeft: 6, marginTop: 8 }}
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
              <TextField
                id="outlined-multiline-static"
                label="What’s the rymindr"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                name="note"
                value={formvalue.note}
                error={!!formValidation.note}
                helperText={formValidation.note}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={5}>
              <Box display="flex" justifyContent="space-between">
                <FormControlLabel
                  control={
                    <Checkbox checked={state.is_qrcode} onChange={handleChangeCheck} name="is_qrcode" color="primary" />
                  }
                  label="Generate QR code"
                />

                <FormControlLabel
                  className="attachement"
                  control={
                    <FileBase64
                      multiple
                      onDone={getFiles}
                      onClick={e => (e.target.value = null)}
                      className="displayNone"
                      style={{ display: 'none' }}
                    />
                  }
                  label={
                    <Typography variant="subtitle1" component="span">
                      <Attachment style={{ marginBottom: -6, marginRight: 10 }} color='primary'/> Attachments
                    </Typography>
                  }
                />
              </Box>
              <Box alignItems='center' display='flex'>  
              {    
                                      
                  files && files.map((file, index) => {
                    //alert(files.length+'----'+index+'----'+file);
                    let extension_arr = file.name.split('.');
                    let extension = extension_arr[1];                  

                    if(extension == 'jpeg' || extension == 'jpg' || extension == 'png' || extension == 'gif') {
                       return (
                          <TypoStyled variant='subtitle1' component='p' key={index}>
                           <img src={file.base64} width="32" height="32" /> {file.name} <CancelIcon onClick={() => deleteImage(index, file)}></CancelIcon>
                           </TypoStyled>
                           )
                    } 
                    else if(extension == 'mp3') {
                      return (
                         <TypoStyled variant='subtitle1' component='p' key={index}>
                         <Headset className={classes.iconAttach} /> {file.name} <CancelIcon onClick={() => deleteImage(index, file)}></CancelIcon>
                          </TypoStyled>
                          )
                   } 
                   else if(extension == 'mp4') {
                    return (
                       <TypoStyled variant='subtitle1' component='p' key={index}>
                       <Videocam className={classes.iconAttach} /> {file.name} <CancelIcon onClick={() => deleteImage(index, file)}></CancelIcon>
                        </TypoStyled>
                        )
                   }     
                   else if(extension == 'doc' || extension == 'docx' || extension == 'pdf') {
                    return (
                       <TypoStyled variant='subtitle1' component='p' key={index}>
                       <Description className={classes.iconAttach} /> {file.name} <CancelIcon onClick={() => deleteImage(index, file)}></CancelIcon>
                        </TypoStyled>
                        )
                   }                        
                  })
              }
              </Box>



            </Grid>

            <Grid item xs={7}>
              <Box display="flex" justifyContent="flex-end">
                <Button
                  onClick={handleToSubmit}
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<Send />}
                  disabled={loading}
                >
                  {loading && <CircularSpinner />}
                  Send Rymindr
                </Button>
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
