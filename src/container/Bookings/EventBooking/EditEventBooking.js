import { Visibility, Replay, Send, AddCircle, Cancel } from '@material-ui/icons'
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
  RadioGroup, Divider,
  FormControl, FormLabel, IconButton
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'

import { makeStyles, styled } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import Autocomplete from '@material-ui/lab/Autocomplete'

import React, { useEffect, useMemo, useState } from 'react'

import { connect,useDispatch} from 'react-redux'
import {
  createEventbook,
  getBusinessUsers,
  getGroups,
} from '../../../store/actions/bookevent'

import {
  getBookListDetail,
} from '../../../store/actions/booklist'

import moment from 'moment'
import { withSnackbar } from 'notistack'
import PropTypes from 'prop-types'


import CircularSpinner from '../../../component/CircularSpinner/index'
import Tabmenu from './Modal/Memberlist'
import ConfirmationDialogRaw from './Modal'
import { Link, useHistory,useParams } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative'
  }
}))

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }))

  const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
    color: theme.palette.text.primary
  }))

  const PaperStyled = styled(Paper)({
    padding: '35px 15px',
    height: 100 + '%'
  })

  const GridStyled = styled(Grid)(({ theme }) => ({
    paddingLeft: '6rem',
    paddingRight: '6rem',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '5rem',
      paddingRight: '5rem'
    },

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2rem'
    }
  }))

  const GridVioletStyled = styled(Grid)({
    padding: '10px 0',
    height: 100 + '%',
    background: '#edf8fe',
    borderRadius: 15,
    minHeight: 210,
    position: 'relative'
  })

  const AutocompleteStyled = styled(Autocomplete)({
    height: 154,
    '&>div': {
      margin: 0,
      '&>div': { height: 154, alignItems: 'flex-start' }
    }
  })

  const ButtonAddStyled = styled(Button)({
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '2rem',
    '& svg': {
      fontSize: '28px !important'
    }
  })
  const currencies = [
  {
      value: '10',
      label: '10 Min'
    },
    {
      value: '15',
      label: '15 Min'
    },
    {
      value: '30',
      label: '30 Min'
    },
     {
      value: '45',
      label: '45 Min'
    },
      {
      value: '1',
      label: '1 Hour'
    },
    {
      value: '2',
      label: '2 Hour'
    },
  ]

  const category = [
    {
      value: 'Parents Evening',
      label: 'Parents Evening',
      category_id: 159
    },
    {
      value: 'Event',
      label: 'Event',
      category_id: 158
    },
    {
      value: 'Appointment',
      label: 'Appointment',
      category_id: 157
    }
  ]

 const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
    position: 'absolute',
    right: -15,
    top: -15,
    cursor: 'pointer',
    '& svg': {
      width: '2.3rem',
      height: '2.3rem'
    }
  }))


//form field
const FormFields = {
  
  message: '',
  EventForm_to_group: '',
  eventForm_to: '',
  user_id: '',
  user_name: '',
  subject:'',
  category:'',
  dynaminc_field: '',
  allow_parents:'',
  set_date:''
}


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
    createEventbook
  } = props


const [formValue, setFormValue] = useState(FormFields)
const [formValidation, setFormValidation] = useState(FormFields)
const [setDate, setDateChange]        = useState()
const [categoryVal, setCategoryVal]   = React.useState('Appointment')
const [allowParentValue, setAllowParent] = useState('');

const history = useHistory()
const date = new Date()
const [checked, setChecked] = useState([])
const [memberchecked, setMemberchecked] = useState([])
const [group_members, setGroup_members] = useState([])
const [groupname_membersname, setGroupname_membersname] = useState([])
const [eventForm_to, setEventForm_to] = useState('')
  




let { ID } = useParams();
  useEffect(() => {
    const dataToSend = {
      user_id,
      category_id: ''
    }
   // props.getcategories(dataToSend)
    getGroups({ user_id })
    const SendToBusiness = {
      user_id,
      business_code
    }
    getBusinessUsers(SendToBusiness);

  if(ID != undefined){
       getBookListDetail({ID,user_id});
  }
 
    //setFormValue([...formValue, { message:bookdetails[0].message}] )
    
   
  }, [])

 useEffect(() => {
  if(ID != undefined){
 if(bookdetails !==null){
         setFormValue({message:bookdetails[0].message,subject:bookdetails[0].subject,})
         setCategoryVal(bookdetails[0].category);
          setDateChange(moment(bookdetails[0].event_date));
          setAllowParent(bookdetails[0].add_comment);

          //this is for popoup

 const newChecked = [];
 const mem_checked=[];
 const groupname = [];
 const mobile_name = [];
bookdetails[0].event_to_group.split(',').forEach((element, index) => {
        newChecked.push(parseInt(element))
});
bookdetails[0].event_to.split(',').forEach((element, index) => {
        mem_checked.push(parseInt(element))
});



bookdetails[0].event_group_name.split(',').forEach((element, index) => {
  if(groupname.indexOf(element) === -1) {groupname.push(element)};
        
});
bookdetails[0].event_mobile_no.split(',').forEach((element, index) => {
        
        if(mobile_name.indexOf(element) === -1) {mobile_name.push(element)};
});

setChecked(newChecked)
setMemberchecked(mem_checked)
setGroupname_membersname(groupname.concat(mobile_name))
  
var new_meet_data=[];
          bookdetails[0].meeting_data.forEach((element, index) => {
             var innerObj = {};
             var tm=element.meeting_date+' '+element.meeting_time_start;
             innerObj['meetingDate'] = moment(element.meeting_date);
              innerObj['startTime'] = moment(tm);
             new_meet_data.push(innerObj)
});
setInputList(new_meet_data);
        //setFormValue({ ...formValue, set_date:moment(bookdetails[0].event_date)  })
    }
  }
 },[bookdetails])



console.log('ajeet',formValue)

 const handleinput = (e) => {
    const formdata = { ...formValue}
    const { name, value } = e.target;
    const formvalidation = { ...formValidation }
        if (name === 'message') {
        formdata.message = value
        formvalidation.message = ''
        setFormValidation(formvalidation)
        }else if(name === 'subject'){
        formdata.subject = value
        formvalidation.subject = ''
        setFormValidation(formvalidation)
        }
        else {
          formdata[name] = value
        }
    setFormValue(formdata)
  }

const handleCategoryChange = (event) => {
    console.log(event.target.value)
    setCategoryVal(event.target.value)
    setFormValue({ ...formValue, category: event.target.value })
  }


//start cloneing field
 // Add remove fields
  const [inputList, setInputList] = useState([{ 
    meetingDate:new Date(), 
    currency: '',
    startTime: new Date(), 
    endTime : new Date(),
    breakStatus: 'No',
    breakStartTime: new Date(),
    breakEndTime: new Date(), 
  }]);

  // Save data array value 
  const [saveInputList, setSaveInputList] = useState([{ 
      meetingDate:'', 
      currency: '',
      startTime: '', 
      endTime : '',
      breakStatus: 'No',
      breakStartTime: '',
      breakEndTime: '', 
  }]);
  // handle input change
  const handleInputChange = (fieldName, event, index) => {
    const list = [...inputList]
    const saveList = [...saveInputList]
    const fieldsArr = ['startTime', 'endTime', 'breakStartTime', 'breakEndTime']
    var fieldVal     = ''
    var saveFieldVal = ''
    if(fieldName=='meetingDate'){
      fieldVal = event
      const date = new Date(event)
      saveFieldVal = moment(date).format('YYYY-MM-DD')
    } else if(fieldsArr.indexOf(fieldName)>=0) {
      fieldVal     = event
      const date = new Date(event)
      saveFieldVal = moment(date).format('HH:mm')
    } else if(fieldName=='breakStatus') {
       
      let prevValue  = list[index][fieldName];
      let currentVal = (prevValue!==event.target.value) ? event.target.value : '';
      fieldVal      = currentVal
      saveFieldVal  = currentVal
    } else {
      fieldVal      = event.target.value
      saveFieldVal  = event.target.value
    }

    list[index][fieldName]    = fieldVal
    saveList[index][fieldName]= saveFieldVal
    setInputList(list);
    setSaveInputList(saveList);
  };

  // handle click event of the Add button
  // handle click event of the Add button
const handleAddAnotherClick = () => {
setInputList([...inputList, {
 meetingDate:new Date(), 
    currency: '',
    startTime: new Date(), 
    endTime : new Date(),
    breakStatus: '0',
    breakStartTime: new Date(),
    breakEndTime: new Date(), 
}]);

setSaveInputList([...saveInputList, {
meetingDate:'',
currency: '',
startTime: '',
endTime : '',
breakStatus: '0',
breakStartTime: '',
breakEndTime: '',
}]);
}

  // handle click event of the Remove button
  const handleRemoveAnotherClick = index => {
    const list     = [...inputList];
    const saveList = [...saveInputList]
    list.splice(index, 1);
    saveList.splice(index, 1);
    setInputList(list);
    setSaveInputList(saveList);
  };

//end cloning

const handleAllowparents = (event) => {
    if (event.target.value === allowParentValue) {
      setAllowParent("");
    } else {
      setAllowParent(event.target.value);
    }
    setFormValue({ ...formValue, allow_parents: event.target.value })
  }



 
  const [phoneNumber, setPhoneNumber] = useState([])
  const handleTag = (e) => {
    const newNumber = [...phoneNumber, e.target.value]
    setPhoneNumber(Array.from(new Set(newNumber)))
  }
const handleDateChange = (e) => {
    const date = new Date(e)
    const selecteddate = moment(date).format('YYYY-MM-DD')
    setDateChange(selecteddate)
    const formvalidation = { ...formValidation }
     formvalidation.set_date = ''
        setFormValidation(formvalidation)
    setFormValue({ ...formValue, set_date: selecteddate })
  }


  //const [selectedDate, handleDateChange] = useState(new Date())
  //const [selectedTime, handleTimeChange] = useState(new Date())

  

  const [currency, setCurrency] = React.useState('EUR')
   const [note, setNote] = React.useState('')

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }
const handlenoteChange = (e) => {
    setNote(e.target.value)
    console.log(note);
  }


  const ButtonColor = styled(Button)(({ theme }) => ({
    background: theme.palette.props.main,
    color: theme.palette.props.contrastText
  }))

  const ButtonWarn = styled(Button)(({ theme }) => ({
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText
  }))


const [open, setOpen] = useState(false);
const handleToopen = () => {
    setOpen(true)
  }

 

  

  
  

  const handleClose = (newValue) => {
    setOpen(newValue)
    const membername = []
    const groupname = []
    groups.forEach((element) => {
      const checkvalue = checked.indexOf(element.group_id)
      if (checkvalue !== -1) {
        groupname.push(element.group_name)
      }
    })
    businessusers.forEach((element) => {
      const checkvalue = memberchecked.indexOf(element.user_id)
      if (checkvalue !== -1) {
        membername.push(`${element.first_name} ${element.last_name}`)
      }
    })

    setGroupname_membersname(groupname.concat(membername))
    const dataToSend = {
      mobile_no: phoneNumber.join()
    }
    if (newValue) {
      // setValue(newValue);
    }
  }



  console.log('groupname_membersname',groupname_membersname)

  const handleGroupToggle = (value) => {
    const groupMembers = value.group_member_list
    const currentIndex = checked.indexOf(value.group_id)
    const newChecked = [...checked]
    const selectedmember = [...group_members]

    if (currentIndex === -1) {
      newChecked.push(value.group_id)
      groupMembers.forEach((element) => {
        selectedmember.push(element.user_id)
      })
    } else {
      newChecked.splice(currentIndex, 1)
      groupMembers.forEach((element) => {
        const remomeitem = selectedmember.indexOf(element.user_id)
        selectedmember.splice(remomeitem, 1)
      })
    }
 const formvalidation = { ...formValidation }
    formvalidation.eventForm_to = ''
    setFormValidation(formvalidation)
     setFormValue({ ...formValue, eventForm_to: '@' })
    setChecked(newChecked)
    setGroup_members(selectedmember)
  }
  const handleMemberToggle = (value) => {
    const currentIndex = memberchecked.indexOf(value.user_id)
    const newChecked = [...memberchecked]

    if (currentIndex === -1) {
      newChecked.push(value.user_id)
    } else {
      newChecked.splice(currentIndex, 1)
    }
     const formvalidation = { ...formValidation }
     setFormValue({ ...formValue, eventForm_to: '@' })
    formvalidation.eventForm_to = ''
    setFormValidation(formvalidation)

    setMemberchecked(newChecked)
  }
console.log('checked',checked);

console.log('checked member',memberchecked);


/*
 useMemo(() => {
    alert('sddd');
     console.log('ajeet',bookdetails[0]);
      setFormValue({ ...formValue, message:bookdetails[0].message  })

  }, [bookdetails])
*/



  const validate = () => {

    const formvalidation = { ...formValidation }
    console.log('akaka',);
    let isError = false
     if (!formValue.message) {
      isError = true
      formvalidation.message = 'Please add some message'
      setFormValidation(formvalidation)
    }
     if (!formValue.subject) {
      isError = true
      formvalidation.subject = 'Please add some subject'
      setFormValidation(formvalidation)
    }
console.log(formValue);
    if (!formValue.eventForm_to) {
      isError = true
      formvalidation.eventForm_to = 'Please add contact'
      setFormValidation(formvalidation)
    }
    if (!formValue.set_date) {
      isError = true
      formvalidation.set_date = 'Please Select valid Date'
      setFormValidation(formvalidation)
    }

    

   /*
    if (formvalue.EventForm_time) {
      var now = moment(new Date().getTime() + 5 * 60000).format('HH:mm')
      if (now.toString() > formvalue.EventForm_time.toString()) {
        isError = true
        setmessageError('You can not choose a time before the current time.')
      } else {
        setmessageError('')
      }
    }
*/
    return isError
  }

  const handleToTagvalue = (value) => {
    setPhoneNumber(value)
  }
console.log('ajeet mobile_no',phoneNumber)

  const handleToSubmit = () => {

 console.log(validate())
    if (validate()) return false

    const formFeilds = { ...formValue }
    formFeilds.dynaminc_field=saveInputList;
   // console.log('form validation',validate())
   // if (validate()) return false
    const EventFormField = { ...formFeilds }


    EventFormField.EventForm_to_group = checked.join()
    EventFormField.EventForm_group_members_to = [...new Set(group_members)].join()
    EventFormField.user_id = user_id
    EventFormField.user_name = first_name
    EventFormField.eventForm_to =
    matched_contact !== null ? memberchecked.join() + ',' + matched_contact.user_id : memberchecked.join()
   
    
    const unmatch = matched_contact ? matched_contact.mobile_no : ''
    console.log(EventFormField);
   // console.log('ssssssssss');
   // return false;
  //  alert('fffff');
  //return false;
  const sendAttachment='';
    createEventbook(EventFormField, unmatch, history, sendAttachment)
  }

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' })
  }, [error])

  useMemo(() => {
    sucessEvent && enqueueSnackbar(sucessEvent, { variant: 'success' })
  }, [sucessEvent])



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
          />
        </ConfirmationDialogRaw>



        <Grid container style={{ marginBottom: 20 }} alignItems='center'>
          <Grid item xs={7}>
            <TypoHeadStyled variant='h4'>
              Parents’ <TypoHeadInnerStyled component='span'>Evening booking</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Grid>
          <Grid item xs={5}>
            <Box display='flex' justifyContent='flex-end'>
              <Button variant='contained' color='primary' size='large' startIcon={<Replay />}>
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>

 

        <PaperStyled>

          <GridStyled container spacing={5}>
            <Grid item xs={6}>

              <AutocompleteStyled
                multiple
                 limitTags={4}
                id='tags-filled'
                filterSelectedOptions={false}
                options={[]}
                freeSolo
                value={groupname_membersname}
                 renderInput={(params) => (
                  <TextField {...params} 
                      variant='outlined' 
                      label='To' 
                      onChange={handleToopen} 
                      onClick={handleToopen}  
                      error={!!formValidation.eventForm_to}
                      helperText={formValidation.eventForm_to}

                       />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Subject'
                fullWidth
                variant='outlined'
                name='subject'
                value={formValue.subject}
                onChange={handleinput}
                error={!!formValidation.subject}
                helperText={formValidation.subject}
                className='mb-40'
              />

              <TextField
                select
                label='Category'
                name='category'
                value={categoryVal}
                fullWidth
                onChange={handleCategoryChange}
                variant='outlined'
              >
                {category.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
           


 {inputList.map((x, i) => (
              <>
                <Grid item xs={12}>
                  <GridVioletStyled container spacing={5}>
                    {inputList.length > 1 && i > 0 && <IconButtonStyled color='primary' component='span' size='large' onClick={() => handleRemoveAnotherClick(i)}>
                      <Cancel /> 
                    </IconButtonStyled>}

                    <Grid item xs={3}>
                      <DatePicker
                        label='Meeting Date'
                        inputVariant='outlined'
                        value={x.meetingDate}
                        onChange={ event =>  handleInputChange("meetingDate", event, i)}
                        animateYearScrolling
                        format='MM/DD/YYYY'
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        select
                        label='Slot Duration'
                        fullWidth
                        value={x.currency}
                        onChange={ event =>  handleInputChange("currency", event, i)}
                        variant='outlined'
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
                        inputVariant='outlined'
                        label='Start Time'
                        value={x.startTime}
                        onChange={ event =>  handleInputChange("startTime", event, i)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        inputVariant='outlined'
                        label='End Time'
                        value={x.endTime}
                        onChange={ event =>  handleInputChange("endTime", event, i)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Typography>Would you like to create a comfort break for this session?</Typography>
                        
                        <Box>
                        <RadioGroup
                          aria-label="breakStatus"
                          name="breakStatus"
                          value={x.breakStatus}>
                          <FormControlLabel value='YES' control={<Radio onChange={ event =>  handleInputChange("breakStatus", event, i)} />} label='Yes' />
                          <FormControlLabel value='No'  control={<Radio onChange={ event =>  handleInputChange("breakStatus", event, i)} />} label='No' />
                        </RadioGroup>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        inputVariant='outlined'
                        label='Start Time'
                        value={x.breakStartTime}
                        onChange={ event =>  handleInputChange("breakStartTime", event, i)}
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TimePicker
                        inputVariant='outlined'
                        label='End Time'
                        value={x.breakEndTime}
                        onChange={ event =>  handleInputChange("breakEndTime", event, i)}
                        fullWidth
                      />
                    </Grid>
                  </GridVioletStyled>
                </Grid>

                <Grid item xs={12}>
                 {inputList.length - 1 === i && i < 4 && <ButtonAddStyled startIcon={<AddCircle />} color='primary' onClick={handleAddAnotherClick}  >Add another day</ButtonAddStyled>}
                 {inputList.length - 1 === i && i < 4 && <Divider className='mt-30 mb-20' />}
                </Grid>
              </>
            ))}


          

           <Grid item xs={4}>
              <DatePicker
                label='Set Date'
                inputVariant='outlined'
                value={setDate}
                onChange={handleDateChange}
                animateYearScrolling
                name='set_date'
                format='MM/DD/YYYY'
                fullWidth
                error={!!formValidation.set_date}
                helperText={formValidation.set_date}
              />
            </Grid>
            <Grid item xs={8}>
              <Box display='flex' alignItems='center'>
                <Typography className='mr-30'>Allow parents to add a comment to their booking?</Typography>
                <Box >
                 <RadioGroup
                      aria-label="add_comment"
                      name="add_comment"
                      value={allowParentValue}>

                  <FormControlLabel value='Yes'   control={<Radio onClick={handleAllowparents} color='primary' />} label='Yes' />
                  <FormControlLabel value='No'   control={<Radio onClick={handleAllowparents} color='primary' />} label='No' />
                
                </RadioGroup>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
                <TextField label='Message'  
                name="message" 
                rows={4}
                rowsMax={100}
                multiline
                fullWidth variant='outlined' 
                value={formValue.message} 
                onChange={handleinput}
                error={!!formValidation.message}
                helperText={formValidation.message}

                fullWidth
                />
            </Grid>

            <Grid item xs={12}>
              <Box display='flex' justifyContent='flex-end'>
                <ButtonColor variant='contained' color='primary' size='large' className='mr-30 width180' startIcon={<Visibility />}>
                  Preview
                </ButtonColor>

               
             {/*<ButtonWarn variant='contained' color='primary' size='large' startIcon={<Send />}>
                  Send Rymindr
                </ButtonWarn>*/}

                <ButtonWarn
                  onClick={handleToSubmit}
                  variant='contained'
                  color='primary'
                  size='large'
                  startIcon={<Send />}
                  disabled={loading}
                >
                  {loading && <CircularSpinner />}
                  Send Rymindr
                </ButtonWarn>


              </Box>
            </Grid>
          </GridStyled>
        </PaperStyled>
      </MuiPickersUtilsProvider>
    </>
  )
}


const mapStateToProps = (state) => {
  return {
          loading: state.bookevent.loading,
          error: state.bookevent.error,
          sucessEvent: state.bookevent.sucessEvent,
          groups: state.bookevent.groups,
          bookdetails: state.booklist.bookdetails,
          businessusers: state.bookevent.businessusers,
          matched_contact: state.bookevent.matched_contact,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    getGroups: (data) => dispatch(getGroups(data)),
    getBookListDetail: (data)=> dispatch(getBookListDetail(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    createEventbook: (data, unmatch, history, sendAttachment) =>
      dispatch(createEventbook(data, unmatch, history, sendAttachment)),
   
  }
}

CreateEventbook.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createEventbook: PropTypes.func.isRequired,
   businessusers: PropTypes.array.isRequired,
  getBusinessUsers: PropTypes.func.isRequired,
  
   getGroups: PropTypes.func.isRequired,
   getBookListDetail:PropTypes.func.isRequired,
    matched_contact: PropTypes.any.isRequired

}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(CreateEventbook))