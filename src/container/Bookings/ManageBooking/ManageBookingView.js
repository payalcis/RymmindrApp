import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Axios from '../../../helper/axios';

import { makeStyles, styled, withStyles } from '@material-ui/core/styles';
import { Link, Route, BrowserRouter as Router, Switch, useParams, useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  IconButton,
  Hidden,
  MenuItem,
  Badge,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {
  Comment,
  Delete,
  Edit,
  Search,
  ArrowBack,
  Chat,
  Send,
  BeachAccess,
  Flag,
  MoreVert,
  ThumbUp,
  Message,
  Close,
} from '@material-ui/icons';

import { getBookListDetail } from '../../../store/actions/booklist';
import clsx from 'clsx';

import { PDFDownloadLink, Image } from '@react-pdf/renderer';
import { PdfDocument } from './userList';

import parse from 'html-react-parser';
import el from 'date-fns/esm/locale/el/index.js';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: 100 + '%',
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important',
    },
  },
}));

const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto',
  },
});

const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginBottom: 10,
}));

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
}));

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
});

const BoxStyled = styled(Box)({
  display: 'flex',
  '&>span': { marginRight: 10 },
});

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));

const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 20,
}));

const GridStyled = styled(Grid)({
  padding: '15px 15px 15px 30px',
});

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

const ButtonDanger = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  color: theme.palette.warning.contrastText,
}));

function Bookings(props) {
  const history = useHistory();
  if (!props.location.customNameData) {
    history.push(`/bookings`);
  }
  const classes = useStyles();

  let { ID } = useParams();

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [tempBookedSlotArr, setTempBookedSlotArr] = React.useState([]);
  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const [bookedSlotDetails, setBookedSlotDetails] = useState({
    id: null,
    event_id: null,
    meeting_id: null,
    personName: null,
  });
  const handleClickOpen2 = async () => {
    await Axios()
      .post('bookevent/geteventslotdetails', {
        eventId: ID,
        meetingId: meetingDetails.meetingId,
        slotTime: meetingDetails.meetingTime,
      })
      .then((response) => {
        setBookedSlotDetails({
          id: response.data.data.id,
          event_id: response.data.data.event_id,
          meeting_id: response.data.data.meeting_id,
          personName: response.data.data.name,
        });

        setAnchorEl(null);
        setOpen2(true);
      });
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCloseModal2 = () => {
    setOpen2(false);
  };

  const [currency, setCurrency] = React.useState('all');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const [hideMenuBtn, updatehideMenuBtn] = useState(true);
  const [hideUnreserveMenuBtn, updateHideUnreserveMenuBtn] = useState(false);

  const [meetingDetails, updateMeetingDetails] = useState({
    meetingId: null,
    meetingDate: null,
    meetingDay: null,
    meetingTime: null,
    slotDuration: null,
    slotIndex: null,
  });

  const showButtonMenu = Boolean(anchorEl);

  const handleClick = (event, btnType, meetingId, meetingDate, meetingDay, meetingTime, slotDuration, slotIndex) => {
    if (btnType == 'available') {
      updatehideMenuBtn(true);
      updateHideUnreserveMenuBtn(false);

      updateMeetingDetails({
        meetingId: meetingId,
        meetingDate: meetingDate,
        meetingDay: meetingDay,
        meetingTime: meetingTime,
        slotDuration: slotDuration,
        slotIndex: slotIndex,
      });

      setAnchorEl(event.currentTarget);
    } else if (btnType == 'reserved') {
      updatehideMenuBtn(false);
      updateHideUnreserveMenuBtn(true);

      updateMeetingDetails({
        meetingId: meetingId,
        meetingDate: meetingDate,
        meetingDay: meetingDay,
        meetingTime: meetingTime,
        slotDuration: slotDuration,
        slotIndex: slotIndex,
      });

      setAnchorEl(event.currentTarget);
    } else {
      updatehideMenuBtn(false);
      updateHideUnreserveMenuBtn(false);

      updateMeetingDetails({
        meetingId: meetingId,
        meetingDate: meetingDate,
        meetingDay: meetingDay,
        meetingTime: meetingTime,
        slotDuration: slotDuration,
        slotIndex: slotIndex,
      });

      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const { user_id, business_code, first_name, last_name,sc_bessi_name,profile_image } = JSON.parse(localStorage.getItem('userData'));

  const { getBookListDetail, bookdetails } = props;

  useEffect(() => {
    if (ID != undefined) {
      getBookListDetail({ ID, user_id });
    }
  }, []);

  const [eventSlots, setEventSlots] = useState({});
  const [bookingStatus, setBookingStatus] = useState('');
  const [isSlotBooked, setIsSlotBooked] = useState(false);
  const [isSlotReleased, setIsSlotReleased] = useState(false);
  const [isSlotReserved, setIsSlotReserved] = useState(false);

  const [userStatus, setUserStatus] = useState([]);

  const [downloadThisData, setDownloadThisData] = useState(null);

  const [state, setState] = useState({
    name: 'Param',
    email: 'param@gmail.com',
  });

  useEffect(() => {
    async function fetchEventSlots() {
      const result = await Axios().post('bookevent/geteventslots', { event_id: ID });
      setEventSlots(result.data.data);
      let tempSlotArr = [];

      console.log('result.data.data.slots=-=====', result.data.data.slots);

      if (result.data.data.slots && result.data.data.slots.length > 0) {
        result.data.data.slots.map((slots, index) => {
          slots.booked_slots.map((booked_slots, i) => {
            tempSlotArr.push({ [slots.meeting_id]: booked_slots.slot });
          });
          setTempBookedSlotArr(tempSlotArr);
        });
      } else {
        setTempBookedSlotArr([]);
      }
    }
    fetchEventSlots();
    async function fetchUserStatus() {
      const result = await Axios().post('bookevent/userslot', { event_id: ID });

      setUserStatus(result.data.data);
      setState({
        name: 'Vennila',
        email: 'vennila@gmail.com',
      });
    }
    fetchUserStatus();
  }, []);

  useEffect(() => {
    if (bookdetails && bookdetails.length > 0 && userStatus && userStatus.slots) {
      let meeting_data = [];
      const bookingDetails = bookdetails[0];
      bookingDetails.meeting_data.map(function (meeting) {
        let getD = userStatus.slots.filter((a) => a.meeting_id == meeting.meet_id);
        if (getD && getD.length > 0) {
          meeting.slotsDetail = getD[0];
        } 
      });
      bookingDetails.school_name = sc_bessi_name;

      // bookingDetails.category
      let cat_img = '/assets/images/school_images/parent.png';
      if(bookingDetails.category == '157'){
        cat_img = '/assets/images/school_images/event_blue.png';
      } else if(bookingDetails.category == '158'){
        cat_img = '/assets/images/school_images/event.png';
      } else {
        cat_img = '/assets/images/school_images/parent.png';
      }
      bookingDetails.cat_img = cat_img;
      setDownloadThisData(bookingDetails);
      console.log('bookingDetails---------', bookingDetails);
    }

    //const bookingDetails = ( bookdetails != null && bookdetails.length ) ? bookdetails[0]: null;
    console.log('userStatus---------', userStatus);
  }, [bookdetails, userStatus]);

  useEffect(() => {
    if (eventSlots && eventSlots.slots && eventSlots.slots.length > 0) {
      let allCount = 0;
      eventSlots.slots.map((slots, index) => {
        if (slots.all_slots && slots.all_slots.length > 0) {
          allCount = allCount + slots.all_slots.length;
        }
      });

      let remainingBooked = allCount - tempBookedSlotArr.length;
      setBookingStatus(tempBookedSlotArr.length + ' slots booked and ' + remainingBooked + ' slots available');
    }
  }, [tempBookedSlotArr]);

  useEffect(() => {
    if (isSlotBooked) {
      // Get the existing slots
      let existingSlots = { ...eventSlots };

      // Update the specific slot
      existingSlots.slots[meetingDetails.slotIndex].booked_slots.push(meetingDetails.meetingTime);

      // Call the function to update state
      setEventSlots(existingSlots);

      // Set the flag to its initial value
      setIsSlotBooked(false);
    }

    if (isSlotReleased) {
      // Get the existing slots
      let existingSlots = { ...eventSlots };

      let elemIndex = existingSlots.slots[meetingDetails.slotIndex].booked_slots.indexOf(meetingDetails.meetingTime);

      if (elemIndex) {
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

    if (isSlotReserved) {
      // Get the existing slots
      let existingSlots = { ...eventSlots };

      // Update the specific slot
      existingSlots.slots[meetingDetails.slotIndex].reserved_slots.push(meetingDetails.meetingTime);

      // Call the function to update state
      setEventSlots(existingSlots);

      // Set the flag to its initial value
      setIsSlotBooked(false);

      setIsSlotReserved(false);
    }
  }, [isSlotBooked, isSlotReleased, isSlotReserved]);

  if (bookdetails && bookdetails.length > 0 && bookdetails[0]) {
    bookdetails[0].meeting_data.sort(function compare(a, b) {
      var dateA = new Date(a.meeting_date);
      var dateB = new Date(b.meeting_date);
      return dateA - dateB;
    });
  }

  const bookingDetails = bookdetails != null && bookdetails.length ? bookdetails[0] : null;

  // From validation & hold the form values in state
  const FormFields = { message: '' };
  const [bookSlotFormValues, setBookSlotFormValues] = useState({ fullname: '', contact: '', notes: '' });
  const [formValidation, setFormValidation] = useState(FormFields);

  const handleSlotBookingChange = (event) => {
    const formdata = { ...bookSlotFormValues };
    const { name, value } = event.target;
    const formvalidation = { ...formValidation };

    if (name === 'fullname') {
      formdata.message = value;
      formvalidation.message = '';
      setFormValidation(formvalidation);
    }

    let formValues = { ...bookSlotFormValues, [event.target.name]: event.target.value };
    setBookSlotFormValues(formValues);
  };

  const validate = () => {
    const formvalidation = { ...formValidation };
    let isError = false;

    if (!bookSlotFormValues.fullname) {
      isError = true;
      formvalidation.message = 'Please enter name';
      setFormValidation(formvalidation);
    }

    return isError;
  };

  const handleSlotBooking = async () => {
    if (validate()) return false;

    await Axios()
      .post('bookevent/bookeventslot', {
        eventId: ID,
        meetingId: meetingDetails.meetingId,
        fullname: bookSlotFormValues.fullname,
        contact: bookSlotFormValues.contact,
        notes: bookSlotFormValues.notes,
        slotTime: meetingDetails.meetingTime,
        slotDuration: meetingDetails.slotDuration,
      })
      .then(() => {
        // Close the modal
        setOpen(false);
        setIsSlotBooked(true);
      });
  };

  const [releaseReason, setReleaseReason] = useState('');

  const handleEventSlotRelease = async (slotId, time, event_id) => {
    await Axios()
      .post('bookevent/releaseeventslot', {
        slotId: slotId,
        time: time,
        event_id: event_id,
        reason: releaseReason,
      })
      .then(() => {
        // Close the modal
        setOpen2(false);

        setIsSlotReleased(true);
      });
  };

  const handleReserveSlot = async () => {
    await Axios()
      .post('bookevent/reserveeventslot', {
        eventId: ID,
        meetingId: meetingDetails.meetingId,
        slotTime: meetingDetails.meetingTime,
        slotDuration: meetingDetails.slotDuration,
      })
      .then(() => {
        // Hide the btn menu
        setAnchorEl(null);

        setIsSlotReserved(true);
      });
  };

  const [movieDetails, setDetails] = useState([]);
  const [show, setHide] = useState(false);

  const category = [
    {
      value: 'Parents Evening',
      label: 'Parents Evening',
    },
    {
      value: 'Event',
      label: 'Event',
    },
    {
      value: 'Appointment',
      label: 'Appointment',
    },
  ];

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            <TypoHeadStyled variant="h4">
              Manage <TypoHeadInnerStyled component="span">Booking</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body mng-book-wrap" container alignItems="stretch">
        <Grid className="mng-book-cont" item xs={12} md={12}>
          <Paper className={clsx(classes.paper, 'mng-book-inrCont')}>
            <GridStyled container alignItems="center">
              <Grid xs={12}>
                <BoxStyled alignItems="center">
                  <AvatarShareStyled
                    alt="semy Sharp"
                    className="mr-0"
                    src={require('../../../assets/images/event_rymindr.png')}
                  />
                  <Typography noWrap>
                    <Box fontWeight="fontWeightBold" m={1}>
                      {bookingDetails != null ? bookingDetails.category : null} |{' '}
                      {bookingDetails != null ? bookingDetails.subject : null}
                    </Box>
                  </Typography>
                </BoxStyled>
              </Grid>
            </GridStyled>
            <ListStyled>
              {bookingDetails != null
                ? bookingDetails.meeting_data.map((booking, bookingIndex) => {
                    var meeting_time_start = booking.meeting_time_start;
                    var H = +meeting_time_start.substr(0, 2);
                    var h = H % 12 || 12;
                    var ampm = H < 12 ? 'AM' : 'PM';
                    meeting_time_start = h + meeting_time_start.substr(2, 3) + ampm;

                    var meeting_time_start1 = booking.meeting_time_start1;
                    var H = +meeting_time_start1.substr(0, 2);
                    var h = H % 12 || 12;
                    var ampm = H < 12 ? 'AM' : 'PM';
                    meeting_time_start1 = h + meeting_time_start1.substr(2, 3) + ampm;

                    var meeting_time_end = booking.meeting_time_end;
                    var H = +meeting_time_end.substr(0, 2);
                    var h = H % 12 || 12;
                    var ampm = H < 12 ? 'AM' : 'PM';
                    meeting_time_end = h + meeting_time_end.substr(2, 3) + ampm;

                    var meeting_time_end1 = booking.meeting_time_end1;
                    var H = +meeting_time_end1.substr(0, 2);
                    var h = H % 12 || 12;
                    var ampm = H < 12 ? 'AM' : 'PM';
                    meeting_time_end1 = h + meeting_time_end1.substr(2, 3) + ampm;

                    return (
                      <ListItem alignItems="flex-start" key={bookingIndex}>
                        <ListItemAvatar>
                          <AvatarStyled
                            alt="semy Sharp"
                            variant="square"
                            src={require('../../../assets/images/calendar_icon.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Box display="flex">
                              <Box width="30%">
                                <TypoTitleStyled>Meeting Date</TypoTitleStyled>
                                <TypoContentStyled>{booking.meeting_date}</TypoContentStyled>
                              </Box>
                              <Box width="17%">
                                <TypoTitleStyled>Start Time</TypoTitleStyled>
                                <TypoContentStyled>{meeting_time_start}</TypoContentStyled>
                              </Box>
                              <Box width="17%">
                                <TypoTitleStyled>End Time</TypoTitleStyled>
                                <TypoContentStyled>{meeting_time_end}</TypoContentStyled>
                              </Box>
                              <Box width="18%">
                                <TypoTitleStyled>Break Start Time</TypoTitleStyled>
                                <TypoContentStyled>{meeting_time_start1}</TypoContentStyled>
                              </Box>
                              <Box width="18%">
                                <TypoTitleStyled>Break End Time</TypoTitleStyled>
                                <TypoContentStyled>{meeting_time_end1}</TypoContentStyled>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    );
                  })
                : null}

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <AvatarStyled alt="semy Sharp" variant="square" src={require('../../../assets/images/email.png')} />
                </ListItemAvatar>
                <ListItemText
                  primary={<TypoTitleStyled>Message</TypoTitleStyled>}
                  secondary={
                    <TypoContentStyled>
                      {bookingDetails != null ? parse(bookingDetails.message) : null}
                    </TypoContentStyled>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />

              <ListItem alignItems="flex-start participants-sec">
                <ListItemAvatar />
                <ListItemText
                  secondary={
                    <>
                      <Box display="flex" className="mt-20 participants-status">
                        <Box className="partic-status" width="40%">
                          <TypoContentStyled>
                            Status:{' '}
                            <Box fontWeight="bold" component="span">
                              {bookingStatus}
                            </Box>
                          </TypoContentStyled>
                        </Box>
                        <Box className="partic-deadline" width="40%">
                          <TypoContentStyled>
                            Deadline:{' '}
                            <Box fontWeight="bold" component="span">
                              {eventSlots != null ? eventSlots.remaining_days : null}{' '}
                              {eventSlots.remaining_days === '1' ? 'day' : 'days'}
                            </Box>
                          </TypoContentStyled>
                        </Box>
                        <Box className="download-pdf" width="20%">
                          {downloadThisData ? (
                            <PDFDownloadLink
                              document={<PdfDocument eventData={downloadThisData} />}
                              fileName="event_data.pdf"
                              className="MuiButtonBase-root MuiButton-root MuiButton-contained btn-download MuiButton-containedPrimary MuiButton-containedSizeLarge MuiButton-sizeLarge"
                            >
                              Download Pdf
                            </PDFDownloadLink>
                          ) : null}
                          {/* <PDFDownloadLink
                              document={<PdfDocument  eventData={bookingDetails} />}
                              fileName="event_data.pdf"
                              className='MuiButtonBase-root MuiButton-root MuiButton-contained btn-download MuiButton-containedPrimary MuiButton-containedSizeLarge MuiButton-sizeLarge'
                              >
                              Download Pdf
                            </PDFDownloadLink> */}
                        </Box>
                      </Box>

                      <div className="main-head-ttl">Participants List</div>
                      <Grid container className="mt-30 participants-list">
                        {userStatus.hasOwnProperty('slots')
                          ? userStatus.slots.map((slot, slotIndex) => {
                              return (
                                <Grid className="table-wrap" item xs={4} key={slotIndex}>
                                  <TypoContentStyled className="table-head">
                                    {slot.day} {slot.date}
                                  </TypoContentStyled>
                                  <Box className="table-wrap-blk">
                                    <table className="app-tblWrap">
                                      {slot.hasOwnProperty('all_slots')
                                        ? slot.all_slots.map((meetingSlot, meetingSlotIndex) => (
                                            <tbody>
                                              <tr>
                                                <td>{meetingSlotIndex + 1}</td>
                                                <td>{meetingSlot.name !== '' ? meetingSlot.name : '--'}</td>
                                                <td>{meetingSlot.time}</td>
                                              </tr>
                                            </tbody>
                                          ))
                                        : null}
                                    </table>
                                  </Box>
                                </Grid>
                              );
                            })
                          : null}
                      </Grid>
                    </>
                  }
                />
              </ListItem>
            </ListStyled>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.bookevent.loading,
    error: state.bookevent.error,
    bookdetails: state.booklist.bookdetails,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBookListDetail: (data) => dispatch(getBookListDetail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
