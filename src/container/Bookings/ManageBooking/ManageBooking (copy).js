import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Axios from '../../../helper/axios';

import { makeStyles, styled, withStyles } from '@material-ui/core/styles'
import { Link, Route, BrowserRouter as Router, Switch, useParams, useHistory } from 'react-router-dom'

import { Box, Button, Divider, InputAdornment, TextField, IconButton, Hidden, MenuItem, Badge, Menu, Dialog, DialogTitle, DialogContent, Tooltip } from '@material-ui/core'
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Comment, Delete, Edit, Search, ArrowBack, Chat, Send, BeachAccess, Flag, MoreVert, ThumbUp, Message, Close } from '@material-ui/icons'
import CircularSpinner from '../../../component/CircularSpinner/index';
import PropTypes from 'prop-types'
import { withSnackbar } from 'notistack'
import ContactDialog from '../../Contacts/Modal/ContactDialog'
import { getBookListDetail } from '../../../store/actions/booklist'
import parse from 'html-react-parser';

import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: 100 + '%'
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important'
    }
  }

}))

const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto'
  }
})

const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginBottom: 10
}))

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary
}))

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50
})

const BoxStyled = styled(Box)({
  display: 'flex',
  '&>span': { marginRight: 10 }
})

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold'
}))

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary
}))

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText
}))

const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 20
}))

const GridStyled = styled(Grid)({
  padding: '15px 15px 15px 30px'
})

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20
})

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600'
}))

const ButtonDanger = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  color: theme.palette.warning.contrastText
}))

function Bookings (props) {
  const classes = useStyles()

  let { ID } = useParams();
  const history = useHistory()

  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  }

  const [bookedSlotDetails, setBookedSlotDetails] = useState({id: null, event_id: null, meeting_id: null, personName: null, category: null});
  const handleClickOpen2 = async () => {
    await Axios().post('bookevent/geteventslotdetails', {
        eventId: ID,
        meetingId: meetingDetails.meetingId,
        slotTime: meetingDetails.meetingTime,
    }).then((response) => {
        setBookedSlotDetails({id: response.data.data.id, event_id: response.data.data.event_id, meeting_id: response.data.data.meeting_id, personName: response.data.data.name});

        setAnchorEl(null);
        setOpen2(true);
    });
  }

  const handleCloseModal = () => {
    setOpen(false);
  }

  const handleCloseModal2 = () => {
    setOpen2(false);
  }

  const [currency, setCurrency] = React.useState('all')

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }

  const ListItemStyled = styled(ListItem)(({ theme }) => ({
    borderRadius: 8
  }))

  const [anchorEl, setAnchorEl] = useState(null)

  const [hideMenuBtn, updatehideMenuBtn] = useState(true);
  const [hideUnreserveMenuBtn, updateHideUnreserveMenuBtn] = useState(false);

  const [meetingDetails, updateMeetingDetails] = useState({meetingId: null, meetingDate: null, meetingDay: null, meetingTime: null, slotDuration: null, slotIndex: null});

  const showButtonMenu = Boolean(anchorEl)

  const handleClick = (event, btnType, meetingId, meetingDate, meetingDay, meetingTime, slotDuration, slotIndex) => {

    if( btnType == 'available' )
    {
        updatehideMenuBtn(true);
        updateHideUnreserveMenuBtn(false);

        updateMeetingDetails({meetingId: meetingId, meetingDate: meetingDate, meetingDay: meetingDay, meetingTime: meetingTime, slotDuration: slotDuration, slotIndex: slotIndex});

        setAnchorEl(event.currentTarget);
    }
    else if( btnType == 'reserved' )
    {
        updatehideMenuBtn(false);
        updateHideUnreserveMenuBtn(true);

        updateMeetingDetails({meetingId: meetingId, meetingDate: meetingDate, meetingDay: meetingDay, meetingTime: meetingTime, slotDuration: slotDuration, slotIndex: slotIndex});

        setAnchorEl(event.currentTarget);
    }
    else
    {
        updatehideMenuBtn(false);
    	updateHideUnreserveMenuBtn(false);

        updateMeetingDetails({meetingId: meetingId, meetingDate: meetingDate, meetingDay: meetingDay, meetingTime: meetingTime, slotDuration: slotDuration, slotIndex: slotIndex});

        setAnchorEl(event.currentTarget);
    }
    setAnchorEl(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl(null)
  }

  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));

const {
  enqueueSnackbar,
    getBookListDetail,
    bookdetails
} = props

useEffect(() => {
    if(ID != undefined){
        getBookListDetail({ID, user_id});
    }
}, []);



const [eventSlots, setEventSlots] = useState({});

const [isSlotBooked, setIsSlotBooked] = useState(false);
const [isSlotReleased, setIsSlotReleased] = useState(false);
const [isSlotReserved, setIsSlotReserved] = useState(false);

const [bookingStatus, setBookingStatus] = useState('');

const [mobileVal, setMobileVal]   = React.useState()
const [nameVal, setNameVal]   = React.useState()
const [open3, setOpen3] = useState(false)
const [tootlTipUserName, setTootlTipUserName] = React.useState()
const [tempBookedSlotArr, setTempBookedSlotArr] = React.useState([])
const [tempReservedSlotArr, setTempReservedSlotArr] = React.useState([])

const handleToopen3 = () => {
  console.warn('open3open3open3open3', open3);
    setOpen3(true)
  }
const handleClose3 = (newValue3) => {
    setOpen3(newValue3)
  }

useEffect(() => {
    async function fetchEventSlots() {
        const result = await Axios().post('bookevent/geteventslots', {event_id: ID});
        setEventSlots(result.data.data);

        let tempSlotArr = [];
        let tempSlotArr1 = [];
      console.log('result.data.data========',result.data.data);
        result.data.data.slots.map((slots, index) => {
            slots.booked_slots.map((booked_slots, i) => {
                tempSlotArr.push({[slots.meeting_id]: booked_slots.slot})
            })
        })

        result.data.data.slots.map((slots, index) => {
            slots.reserved_slots.map((booked_slots, i) => {
                tempSlotArr1.push({[slots.meeting_id]: booked_slots.slot})
            })
        })
       
        setTempBookedSlotArr(tempSlotArr)
        setTempReservedSlotArr(tempSlotArr1)
    }
    fetchEventSlots();
}, []);

useEffect(() => {
    if(eventSlots && eventSlots.slots && eventSlots.slots.length>0){
      let allCount = 0;
      eventSlots.slots.map((slots, index) => {
        if(slots.all_slots && slots.all_slots.length>0){
          allCount = allCount+slots.all_slots.length;
        }
      })

      let remainingBooked = allCount-tempBookedSlotArr.length;
      setBookingStatus(tempBookedSlotArr.length+' slots booked and '+remainingBooked+' slots available')
    }
}, [tempBookedSlotArr]);

useEffect(() => {
    if( isSlotBooked )
    {
        // Get the existing slots
        let existingSlots = {...eventSlots};

        // Update the specific slot
        existingSlots.slots[meetingDetails.slotIndex].booked_slots.push(meetingDetails.meetingTime);

        // Call the function to update state
        setEventSlots(existingSlots);

        // Set the flag to its initial value
        setIsSlotBooked(false);
    }

    if( isSlotReleased )
    {
       // Get the existing slots
        let existingSlots = {...eventSlots};

        let elemIndex = existingSlots.slots[meetingDetails.slotIndex].booked_slots.indexOf(meetingDetails.meetingTime);

        if(elemIndex){
        	// Remove the specific slot
          existingSlots.slots[meetingDetails.slotIndex].reserved_slots.splice(elemIndex, 1);
        }

  // Remove the specific slot
        existingSlots.slots[meetingDetails.slotIndex].booked_slots.splice(elemIndex, 1);



        // Call the function to update state
        setEventSlots(existingSlots);

        // Set the flag to its initial value
        setIsSlotReleased(false);
    }

    if( isSlotReserved )
    {
        // Get the existing slots
        let existingSlots = {...eventSlots};

        // Update the specific slot
        existingSlots.slots[meetingDetails.slotIndex].reserved_slots.push(meetingDetails.meetingTime);

        // Call the function to update state
        setEventSlots(existingSlots);

        // Set the flag to its initial value
        setIsSlotBooked(false);

        setIsSlotReserved(false);
    }

}, [isSlotBooked, isSlotReleased, isSlotReserved]);




let bookingDetails = ( bookdetails != null && bookdetails.length ) ? bookdetails[0]: null;

// From validation & hold the form values in state
const FormFields = { message: ''}
const [bookSlotFormValues, setBookSlotFormValues] = useState({});
const [formValidation, setFormValidation] = useState(FormFields)
const [isLoading, setIsLoading] = useState(false);
// const handleSlotBookingChange = (event) => {
//     const formdata = {...bookSlotFormValues};
//     const { name, value }   = event.target;
//     const formvalidation    = {...formValidation};
//     if (name === 'fullname')
//     {
//         formdata.message = value;
//         formvalidation.message = '';
//         setFormValidation(formvalidation);
//     }
//     let formValues = {...bookSlotFormValues, [event.target.name]: event.target.value};
//     console.log('formValues===',formValues);
//     setBookSlotFormValues(formValues);
// }

// useEffect(() => {
//   console.log('bookSlotFormValues=====',bookSlotFormValues);
// }, [bookSlotFormValues]);

const handleSlotBookingChange = async (event) => {
  const formdata = {...bookSlotFormValues};
  //console.log('formdata===',formdata);
  if(event.target.name=='contact'){
    let enteredNumber = event.target.value;

    const formvalidation    = {...formValidation};


    if(event.target.value.length==0){
      formvalidation.contactNumber = 'Please enter a contact number.';
      setFormValidation(formvalidation);
    }
    if(event.target.value.length>10){
      setIsLoading(true);
      await Axios().post('users/searchUserByNumber', {"mobile_no" : enteredNumber}).then((result) => {
        
        setIsLoading(false);
        if(result.data.data){
          formdata.fullname= result.data.data.first_name+' '+result.data.data.last_name;
          formdata.contact= result.data.data.mobile_no;
          formdata.notes= '';
          formdata.contact_not_found= 0;
          formdata.enteredNumber= enteredNumber;
          
          setBookSlotFormValues(formdata);
        } else{
          formdata.fullname= ''
          formdata.contact= ''
          formdata.notes= '';
          formdata.contact_not_found= 1;
          formdata.enteredNumber= enteredNumber;
          setBookSlotFormValues(formdata);
        }
      }).catch((error) => {
        setIsLoading(false);
        setBookSlotFormValues({});
      });
    } else {
      setIsLoading(false);
      setBookSlotFormValues({});
    }


    if (!(formdata.contact_not_found==1 || formdata.contact_not_found==0)) {
        formvalidation.contactNumber = 'Please enter a valid contact number.';
        setFormValidation(formvalidation)
    } else {
      formvalidation.contactNumber = ''
        setFormValidation(formvalidation)
    }

    
  } else if(event.target.name=='notes'){
    console.log('event.target.value====',event.target.value);
    formdata.notes= event.target.value;
    setBookSlotFormValues(formdata);
  }
  // await Axios().post('bookevent/bookeventslot', dataToSend).then(() => {
    //     setOpen(false);
    //   fetchEventSlots();
    //   setIsSlotBooked(true);
    // });


  // const formdata = {...bookSlotFormValues};
  // const { name, value }   = event.target;
  // const formvalidation    = {...formValidation};
  // if (name === 'fullname')
  // {
  //     formdata.message = value;
  //     formvalidation.message = '';
  //     setFormValidation(formvalidation);
  // }
  // let formValues = {...bookSlotFormValues, [event.target.name]: event.target.value};
  // console.log('formValues===',formValues);
  // setBookSlotFormValues(formValues);
}

const validate = () => {
    const formvalidation = { ...formValidation }
    let isError = false

    if (!(bookSlotFormValues.contact_not_found==1 || bookSlotFormValues.contact_not_found==0)) {
        isError = true
        formvalidation.contactNumber = 'Please enter a valid contact number.';
        setFormValidation(formvalidation)
    }

    // console.log('bookSlotFormValues.enteredNumber===',bookSlotFormValues.enteredNumber);
    // if (!bookSlotFormValues.enteredNumber) {
    //     isError = true
    //     formvalidation.contactNumber = 'Please enter a contact number.'
    //     setFormValidation(formvalidation)
    // }

    return isError
}


const fetchEventSlots = async() => {
  const result = await Axios().post('bookevent/geteventslots', {event_id: ID});
  setEventSlots(result.data.data);

  let tempSlotArr = [];
  let tempSlotArr1 = [];

  result.data.data.slots.map((slots, index) => {
      slots.booked_slots.map((booked_slots, i) => {
          tempSlotArr.push({[slots.meeting_id]: booked_slots.slot})
      })
  })

  result.data.data.slots.map((slots, index) => {
      slots.reserved_slots.map((booked_slots, i) => {
          tempSlotArr1.push({[slots.meeting_id]: booked_slots.slot})
      })
  })

  setTempBookedSlotArr(tempSlotArr)
  setTempReservedSlotArr(tempSlotArr1)
}

const handleSlotBooking = async () => {
    if (validate()) return false;

    let dataToSend = {
      eventId: ID,
      meetingId: meetingDetails.meetingId,
      slotTime: meetingDetails.meetingTime,
      slotDuration: meetingDetails.slotDuration,
      is_web : 1
    };


    if(bookSlotFormValues.contact_not_found==0){
      dataToSend.fullname= bookSlotFormValues.fullname;
      dataToSend.contact= bookSlotFormValues.contact;
      dataToSend.notes= bookSlotFormValues.notes;
      dataToSend.contact_not_found= 0;
    } else if(bookSlotFormValues.contact_not_found==1){
      dataToSend.contact_not_found= 1;
      dataToSend.contact= bookSlotFormValues.enteredNumber;
      dataToSend.notes= bookSlotFormValues.notes;
    }
    
    console.log('dataToSend====',dataToSend);
    await Axios().post('bookevent/bookeventslot', dataToSend).then((result) => {
      
      setOpen(false);
      fetchEventSlots();
      setIsSlotBooked(true);
      if(result.data.status==1 && result.data.message){
        enqueueSnackbar(result.data.message, { variant: 'success' })
      } else{
        enqueueSnackbar('something went wrong', { variant: 'error' })
      }
    });
}

// const setMobileNumber = (number, name, user_id) => {

//   let formValues = {...bookSlotFormValues, ['contact']: number, ['user_id']: user_id};
//   setBookSlotFormValues(formValues);
//   setMobileVal(number)
//   setNameVal(name)
// }

const [releaseReason, setReleaseReason] = useState('');

const handleEventSlotRelease = async (slotId,time,event_id) => {
    await Axios().post('bookevent/releaseeventslot', {
        slotId: slotId,
        time:time,
        event_id:event_id,
        reason: releaseReason,
        meeting_id: meetingDetails.meetingId
    }).then((result) => {
      console.log('result===',result);
        setOpen2(false);
        setIsSlotReleased(true);
        fetchEventSlots();
        if(result.data.status==1 && result.data.message){
          enqueueSnackbar(result.data.message, { variant: 'success' })
        } else{
          enqueueSnackbar('something went wrong', { variant: 'error' })
        }
    });
}

const handleReserveSlot = async () => {
    await Axios().post('bookevent/reserveeventslot', {
        eventId: ID,
        meetingId: meetingDetails.meetingId,
        slotTime: meetingDetails.meetingTime,
        slotDuration: meetingDetails.slotDuration
    }).then((result) => {
        setAnchorEl(null);
        fetchEventSlots();
        // setTempReservedSlotArr([...tempReservedSlotArr, meetingDetails.meetingTime])
        setIsSlotReserved(true);
        if(result.data.status==1 && result.data.message){
          enqueueSnackbar(result.data.message, { variant: 'success' })
        } else{
          enqueueSnackbar('something went wrong', { variant: 'error' })
        }
    });
}

var contactList = [];

// const temp_mobile = bookingDetails != null ? bookingDetails.event_mobile_no : null;
console.warn('bookingDetails454545', bookingDetails);
const temp_mobile = bookingDetails != null ? bookingDetails.user : null;
if(temp_mobile) {
  // const temp_mobile_split = temp_mobile.split(',');

  temp_mobile.map((item, index) => {
    contactList.push({
      value: item.mobile_no,
      label: item.user_name,
      user_id: item.number
    });
  });
}

    let cate = 'Appointment';

    if(bookingDetails && bookingDetails.category == '157')
        cate = 'Appointment';
    else if(bookingDetails && bookingDetails.category == '158')
        cate = 'Event';
    else
        cate = 'Parents Evening';


   const handleBookedSlot = (slot, meetingSlot) => {
      if(slot.booked_slots.length > 0) {
        slot.booked_slots.map((data, i) => {
          if(data.slot == meetingSlot) {
           setTootlTipUserName({
              'user_name': data.username,
              'mobile_no' : data.mobile_no
            })
          }
        })
      }
      else {
        console.warn('hello else')
        }
    }

    let tempValue=false;
    let tempIndex=0;

    console.warn('open3open3open3open322222', open3, contactList);

  return (
    <>
      {/* {
      contactList.length > 0 ?

      <ContactDialog open={open3} onClose={handleClose3} isBooking={true} contactList={contactList} setMobileNumber={setMobileNumber} /> :
      null
      } */}
      <Grid container style={{ marginBottom: 20 }} alignItems='center'>
        <Grid item xs={5}>
          <Box display='flex' alignItems='center'>
            <IconButton
              color='inherit'
              onClick={()=> history.goBack()}
            >
              <ArrowBack />
            </IconButton>
            <TypoHeadStyled variant='h4'>
              Manage <TypoHeadInnerStyled component='span'>Booking</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid container alignItems='stretch'>

        <Grid item xs={12} md={12}>
          <Paper className={classes.paper}>
            <GridStyled container alignItems='center'>
              <Grid xs={12}>
                <BoxStyled alignItems='center'>
                  <AvatarShareStyled alt='semy Sharp' className='mr-0' src={require('../../../assets/images/event_rymindr.png')} />
                  <Typography noWrap>
                    <Box fontWeight='fontWeightBold' m={1}>
                        { ( bookingDetails != null ) ? cate: null } | { ( bookingDetails != null ) ? bookingDetails.subject: null }
                    </Box>
                  </Typography>
                </BoxStyled>
              </Grid>
            </GridStyled>

            <ListStyled>
                {
                    ( bookingDetails != null )
                    ?
                    bookingDetails.meeting_data.map((booking, bookingIndex) => {

                        var meeting_time_start = booking.meeting_time_start;
                        var H = +meeting_time_start.substr(0, 2);
                        var h = (H % 12) || 12;
                        var ampm = H < 12 ? "AM" : "PM";
                        meeting_time_start = h + meeting_time_start.substr(2, 3) + ampm;

                        var meeting_time_start1 = booking.meeting_time_start1;
                        var H = +meeting_time_start1.substr(0, 2);
                        var h = (H % 12) || 12;
                        var ampm = H < 12 ? "AM" : "PM";
                        meeting_time_start1 = h + meeting_time_start1.substr(2, 3) + ampm;

                        var meeting_time_end = booking.meeting_time_end;
                        var H = +meeting_time_end.substr(0, 2);
                        var h = (H % 12) || 12;
                        var ampm = H < 12 ? "AM" : "PM";
                        meeting_time_end = h + meeting_time_end.substr(2, 3) + ampm;

                        var meeting_time_end1 = booking.meeting_time_end1;
                        var H = +meeting_time_end1.substr(0, 2);
                        var h = (H % 12) || 12;
                        var ampm = H < 12 ? "AM" : "PM";
                        meeting_time_end1 = h + meeting_time_end1.substr(2, 3) + ampm;

                        return(
                            <ListItem alignItems='flex-start' key={bookingIndex}>
                                <ListItemAvatar>
                                <AvatarStyled alt='semy Sharp' variant='square' src={require('../../../assets/images/calendar_icon.png')} />
                                </ListItemAvatar>
                                <ListItemText
                                primary={
                                    <Box display='flex'>
                                    <Box width='30%'>
                                        <TypoTitleStyled>Meeting Date</TypoTitleStyled>
                                        <TypoContentStyled>{booking.meeting_date}</TypoContentStyled>
                                    </Box>
                                    <Box width='17%'>
                                        <TypoTitleStyled>Start Time</TypoTitleStyled>
                                        <TypoContentStyled>

                                        {meeting_time_start}

                                        </TypoContentStyled>
                                    </Box>
                                    <Box width='17%'>
                                        <TypoTitleStyled>End Time</TypoTitleStyled>
                                        <TypoContentStyled>{meeting_time_end}</TypoContentStyled>
                                    </Box>
                                    <Box width='18%'>
                                        <TypoTitleStyled>Break Start Time</TypoTitleStyled>
                                        <TypoContentStyled>{meeting_time_start1}</TypoContentStyled>
                                    </Box>
                                    <Box width='18%'>
                                        <TypoTitleStyled>Break End Time</TypoTitleStyled>
                                        <TypoContentStyled>{meeting_time_end1}</TypoContentStyled>
                                    </Box>
                                    </Box>
                                }
                                />
                            </ListItem>
                        )
                    })
                    :
                    null
                }

              <Divider variant='inset' component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <AvatarStyled alt='semy Sharp' variant='square' src={require('../../../assets/images/email.png')} />
                </ListItemAvatar>
                <ListItemText
                  primary={<TypoTitleStyled>Message</TypoTitleStyled>}
                  secondary={
                    <TypoContentStyled>
                        { ( bookingDetails != null ) ? parse(bookingDetails.message): null }
                    </TypoContentStyled>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />

              <ListItem alignItems='flex-start'>
                <ListItemAvatar />
                <ListItemText
                  secondary={
                    <>
                        <Box display='flex' className='mt-20'>
                            <Box width='50%'>
                            <TypoContentStyled>
                                Status: <Box fontWeight='bold' component='span'>{bookingStatus}</Box>
                            </TypoContentStyled>
                            </Box>
                            <Box>
                            <TypoContentStyled>
                                Deadline: <Box fontWeight='bold' component='span'>{ ( eventSlots != null ) ? eventSlots.remaining_days: null } { ( eventSlots.remaining_days === '1' ) ? 'day': 'days' }</Box>
                            </TypoContentStyled>
                            </Box>
                        </Box>
                        <Grid container className='mt-30'>
                            {
                                ( eventSlots.hasOwnProperty('slots') )
                                ?
                                eventSlots.slots.map((slot, slotIndex) => {
                                    return (
                                        <Grid item xs={4} key={slotIndex}>
                                            <TypoContentStyled>{slot.day} {slot.date}</TypoContentStyled>
                                            <div className='timeSlot mt-20'>
                                                {
                                                    slot.all_slots.map((meetingSlot, meetingSlotIndex) =>
                                                    {
                                                      if(tempValue==true)
                                                      {
                                                        tempIndex=tempIndex+1
                                                      }
                                                      tempValue=false
                                                      if(tempBookedSlotArr&&tempBookedSlotArr.length-1>tempIndex
                                                        &&(Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id)&&Object.values(tempBookedSlotArr[tempIndex]) == meetingSlot)
                                                      {
                                                        tempValue=true
                                                      }

                                                      // let tempArr = Object.values(tempReservedSlotArr)

                                                      // console.warn('hellochecking 454545454', (tempReservedSlotArr.length > 0 && (Object.values(tempReservedSlotArr[tempIndex])[0] == meetingSlot), (tempReservedSlotArr.length > 0 && Object.keys(tempReservedSlotArr[tempIndex])[0] == slot.meeting_id)), tempReservedSlotArr.length > 0 && (Object.values(tempReservedSlotArr[tempIndex])[0], meetingSlot));

                                                        return(
                                                          (tempBookedSlotArr && tempBookedSlotArr.length>0&& (Object.values(tempBookedSlotArr[tempIndex]) == meetingSlot) && (Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id)) ?
                                                              <Tooltip arrow placement={"bottom"}  TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} onOpen={() => handleBookedSlot(slot, meetingSlot)}  title={(tempBookedSlotArr && (Object.values(tempBookedSlotArr[tempIndex]) == meetingSlot) && (Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id)) ?
                                                              <>
                                                            <Typography color="inherit">{tootlTipUserName && tootlTipUserName.user_name}</Typography>
                                                                {tootlTipUserName && tootlTipUserName.mobile_no}
                                                            </> : null}>
                                                              <Button key={meetingSlotIndex} aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true"
                                                                onClick={(e) =>
                                                                  {
                                                                  handleClick(e, (
                                                                    (Object.values(tempBookedSlotArr[tempIndex]) == (meetingSlot) && (Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id))
                                                                      ? 'booked'
                                                                      : (tempReservedSlotArr.length > 0 && (Object.values(tempReservedSlotArr[tempIndex])[0] == meetingSlot) && (Object.keys(tempReservedSlotArr[tempIndex])[0] == slot.meeting_id))
                                                                      ? 'reserved'
                                                                      : 'available'
                                                                    ),
                                                                    slot.meeting_id,
                                                                    slot.date,
                                                                    slot.day,
                                                                    meetingSlot,
                                                                    slot.slot_duration,
                                                                    slotIndex
                                                                  )
                                                                }}
                                                              disabled={ ( slot.break_slots.includes(meetingSlot) ) }
                                                              className={`btn ${ ( slot.break_slots.includes(meetingSlot) || ((tempReservedSlotArr.length > 0 && Object.values(tempReservedSlotArr[tempIndex])[0] == meetingSlot) && (tempReservedSlotArr.length > 0 && Object.keys(tempReservedSlotArr[tempIndex])[0] == slot.meeting_id)) ) ? 'disable': ( tempBookedSlotArr.length > 0 && (Object.values(tempBookedSlotArr[tempIndex]) == meetingSlot) && (Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id)) ? 'active': null }`}>{meetingSlot}</Button>
                                                              </Tooltip>
                                                          :
                                                              <Button key={meetingSlotIndex} aria-label="more"
                                                                aria-controls="long-menu"
                                                                aria-haspopup="true"
                                                                onClick={(e) =>
                                                                  {
                                                                  handleClick(e, (
                                                                    (tempBookedSlotArr.length > 0 && (Object.values(tempBookedSlotArr[tempIndex])[0] == meetingSlot) && (Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id))
                                                                      ? 'booked'
                                                                      : (tempReservedSlotArr.length > 0 && (Object.values(tempReservedSlotArr[tempIndex])[0] == meetingSlot) && (Object.keys(tempReservedSlotArr[tempIndex])[0] == slot.meeting_id))
                                                                      // : Object.values(slot.reserved_slots).includes(meetingSlot)
                                                                      ? 'reserved'
                                                                      : 'available'
                                                                    ),
                                                                    slot.meeting_id,
                                                                    slot.date,
                                                                    slot.day,
                                                                    meetingSlot,
                                                                    slot.slot_duration,
                                                                    slotIndex
                                                                  )
                                                                }}
                                                              disabled={ ( slot.break_slots.includes(meetingSlot) ) }
                                                              className={`btn ${ ( slot.break_slots.includes(meetingSlot) || (tempReservedSlotArr.length > 0 && Object.values(tempReservedSlotArr[tempIndex])[0] == meetingSlot) && (tempReservedSlotArr.length > 0 && Object.keys(tempReservedSlotArr[tempIndex])[0] == slot.meeting_id) ) ? 'disable': (tempBookedSlotArr.length > 0 && (Object.values(tempBookedSlotArr[tempIndex]) == meetingSlot) && (Object.keys(tempBookedSlotArr[tempIndex]) == slot.meeting_id)) ? 'active': null }`}>{meetingSlot}</Button>
                                                        )

                                                      }
                                                    )
                                                }

                                                <Menu
                                                    id='long-menu'
                                                    anchorEl={anchorEl}
                                                    keepMounted
                                                    open={showButtonMenu}
                                                    onClose={handleClose1}
                                                    // elevation={0}
                                                    // getContentAnchorEl={null}
                                                    // anchorOrigin={{
                                                    //   vertical: 'bottom',
                                                    //   horizontal: 'center',
                                                    // }}
                                                    // transformOrigin={{
                                                    //   vertical: 'top',
                                                    //   horizontal: 'center',
                                                    // }}
                                                    >
                                                    <MenuItem style={{ display: ( !hideMenuBtn ) ? 'none': null }} onClick={handleClickOpen}>Book</MenuItem>
                                                    <MenuItem style={{ display: ( !hideMenuBtn ) ? 'none': null }} onClick={handleReserveSlot}>Reserve</MenuItem>

                                                    {
                                                    	( !hideUnreserveMenuBtn )
                                                    	?
                                                    	<MenuItem style={{ display: ( hideMenuBtn ) ? 'none': null }} onClick={handleClickOpen2}>Release</MenuItem>
                                                    	:
                                                    	<MenuItem style={{ display: 'none' }} onClick={handleClickOpen2}>Release</MenuItem>
                                                    }

                                                    <MenuItem style={{ display: ( !hideUnreserveMenuBtn ) ? 'none': null }} onClick={handleClickOpen2}>Unreserve</MenuItem>
                                                </Menu>
                                            </div>
                                        </Grid>
                                    )
                                })
                                :
                                null
                            }
                        </Grid>
                    </>
                  }
                />
              </ListItem>

            </ListStyled>
          </Paper>
        </Grid>

        {/* Dialog to book a slot */}
        <Dialog open={open} onClose={handleCloseModal} aria-labelledby='form-dialog-title' maxWidth='sm'>
          <DialogTitleStyled id='form-dialog-title'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <TypoPopHeadStyled>Book A Slot</TypoPopHeadStyled>
              <IconButton color='default' onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>
          <DialogContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <ListItem alignItems='flex-start' className='mb-30'>
                  <ListItemAvatar>
                    <AvatarStyled alt='semy Sharp' variant='square' src={require('../../../assets/images/calendar_icon.png')} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box display='flex' justifyContent='space-between'>
                        <Box>
                          <TypoTitleStyled>Meeting Date</TypoTitleStyled>
                          <TypoContentStyled>{meetingDetails.meetingDay} {meetingDetails.meetingDate}</TypoContentStyled>
                        </Box>
                        <Box>
                          <TypoTitleStyled>Start Time</TypoTitleStyled>
                          <TypoContentStyled>{meetingDetails.meetingTime}</TypoContentStyled>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>

              </Grid>

              {/* <Grid item xs={12}>
                <TextField
                  // label='Name'
                  // error={formValidation.message}
                  // helperText={formValidation.message}
                  fullWidth
                  value={nameVal}
                  variant='outlined'
                  placeholder="Name"
                  name="fullname"
                  // onChange={handleSlotBookingChange}
                  autoComplete="off" />
              </Grid> */}

              <Grid item xs={12}>
                {/*<Button
                  variant='contained'
                  color='primary'
                  size='large'
                  className='mr-10'
                  onClick={handleToopen3}
                >
                  Mobile Number
                </Button>*/}
                <TextField
                  placeholder="Mobile Number"
                  // label={mobileVal ? 'Mobile Number' : null}
                  fullWidth
                  //value={bookSlotFormValues.enteredNumber}
                  error={formValidation.contactNumber}
                  helperText={formValidation.contactNumber}
                  variant='outlined'
                  name="contact"
                  onChange={handleSlotBookingChange}
                  autoComplete="off"
                  // onFocus={handleToopen3}
                  // onBlur={handleClose3}
                >

                </TextField>
                

                {/*<TextField
                  select
                  label='Mobile Number'
                  fullWidth
                  value={mobileVal}
                  variant='outlined'
                  name="contact"
                  onChange={handleSlotBookingChange}
                  autoComplete="off"
                >
                   {contactList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>*/}
              </Grid>
              
              {bookSlotFormValues && bookSlotFormValues.contact_not_found==1  ? (
                <Grid item xs={12}>
                  <div>
                    <b>Note: 
                      </b>
                      <span>
                      This contact is not registered with Rymindr. You can still book the slot, however you need to manually manage this slot. If the contact wishes to cancel, this will need to be done from your side by releasing the time slot.
                      <p>
                      A text message will be sent to the contact confirming date and time.  If the contact downloads Rymindr,  the booking will be available in their app. 
                        </p>
                        </span>
                  </div>
                </Grid>
              ) : null}


              {isLoading && <CircularSpinner />}
              {!isLoading && bookSlotFormValues && bookSlotFormValues.contact  ? (
              <Grid item xs={12}>
                <ListItem alignItems='flex-start' className='mb-30' button>
                  <ListItemText
                    primary={
                      <Box display='flex' justifyContent='space-between'>
                        <Box>
                          <TypoTitleStyled>Contact Name</TypoTitleStyled>
                    <TypoContentStyled>{bookSlotFormValues.fullname}</TypoContentStyled>
                        </Box>
                        <Box>
                          <TypoTitleStyled>Number</TypoTitleStyled>
                          <TypoContentStyled>{bookSlotFormValues.contact}</TypoContentStyled>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              </Grid>
              ) : null}

              {bookSlotFormValues && bookSlotFormValues.enteredNumber && bookSlotFormValues.enteredNumber.length>10  ? (
              <Grid item xs={12}>
                <TextField label='Note' fullWidth multiline rows={4} variant='outlined' value={bookSlotFormValues.notes} name="notes" onChange={handleSlotBookingChange}/>
              </Grid>
              ) : null}
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Button color='primary' variant='contained' className='mb-20 width180' onClick={handleSlotBooking}>Book</Button>
              </Grid>

            </Grid>
          </DialogContent>
        </Dialog>

        {/* Dialog to release a slot */}
        <Dialog open={open2} onClose={handleCloseModal2} aria-labelledby='form-dialog-title' maxWidth='sm'>
          <DialogTitleStyled id='form-dialog-title'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
              <TypoPopHeadStyled>Release Booking</TypoPopHeadStyled>
              <IconButton color='default' onClick={handleCloseModal2}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>
          <DialogContent>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <Box fontWeight="fontWeightMedium">
                        This slot has been reserved by {bookedSlotDetails.personName} for {meetingDetails.meetingDay} {meetingDetails.meetingDate} at {meetingDetails.meetingTime}
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField label='Reason' fullWidth multiline rows={4} variant='outlined' onChange={(event) => setReleaseReason(event.target.value) } />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <ButtonDanger color='primary' variant='contained' className='mb-20 width180' onClick={() => handleEventSlotRelease(bookedSlotDetails.id,meetingDetails.meetingTime,bookedSlotDetails.event_id)}>Confirm</ButtonDanger>
                </Grid>
            </Grid>
          </DialogContent>
        </Dialog>

      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
    return {
        loading: state.bookevent.loading,
        error: state.bookevent.error,
        bookdetails: state.booklist.bookdetails,
    }
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        getBookListDetail: (data)=> dispatch(getBookListDetail(data)),
    }
  }


  Bookings.propTypes = {
    enqueueSnackbar: PropTypes.func.isRequired,
   
  }
//export default connect(mapStateToProps, mapDispatchToProps)(Bookings)


export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Bookings))