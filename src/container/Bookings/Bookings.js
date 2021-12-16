import { makeStyles, styled, withStyles } from '@material-ui/core/styles';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import {
  Box,
  Button,
  Divider,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  InputAdornment,
  TextField,
  IconButton,
  Hidden,
  MenuItem,
  Badge,
  Menu,
  Dialog,
  DialogContent,
  DialogTitle,
  AppBar,
  Tabs,
  Tab,
  CardMedia,
} from '@material-ui/core';

import {
  Comment,
  Description,
  Delete,
  Edit,
  Search,
  ArrowBack,
  Chat,
  Send,
  Videocam,
  Headset,
  Print,
  Drafts,
  MoreVert,
  ThumbUp,
  Message,
  Close,
  FiberManualRecord,
  Check,
  Update,
} from '@material-ui/icons';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import React, { useEffect, useMemo, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { SuccessEvent } from '../../store/actions/bookevent';

import { getUpcommingBookList, delete_booklist, acceptStatus, pendingStatus } from '../../store/actions/booklist';
import moment from 'moment';
import { withSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import FullscreenSpinner from '../../component/FullscreenSpinner';
import ResponsiveDialog from './Modal/RymindrModalDelete';
import Deleteevent from './Modal/BookingModelDelete';
import Comments from '../../container/Comments/Comments';
import RymindrOriginal from '../../assets/images/rymindr_original.png';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import clsx from 'clsx';
import Axios from '../../helper/axios';
import ReactDOM from 'react-dom';
import Pdf from 'react-to-pdf';
import parse from 'html-react-parser';
import io from 'socket.io-client';
import { getBusinessUsers } from '../../store/actions/rymidr';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={'simple-tabpanel-${index}'}
      aria-labelledby={'simple-tab-${index}'}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
  icon: {
    width: 150,
    marginBottom: 40,
  },
  content: {
    textAlign: 'center',
    textAlign: '-webkit-center',
    paddingTop: '15%',
    height: '80vh',
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

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  paddingBottom: 10,
  textAlign: 'left',
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

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      height: 20,
      width: 20,
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadgeReject = withStyles((theme) => ({
  badge: {
    backgroundColor: '#e50214',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledBadgePending = withStyles((theme) => ({
  badge: {
    backgroundColor: '#1773bf',
    color: '#1773bf',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    padding: 0,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const AvatarComntStyled = styled(Avatar)({
  height: 42,
  width: 42,
  marginRight: 20,
});

const TextComntFieldStyled = styled(TextField)({
  width: 100 + '%',
  height: 100,
});

const TypoCmntName = styled(Typography)({
  color: '#757575',
  fontWeight: 'bold',
  fontSize: 12,
  '& span': {
    fontWeight: 'normal',
    marginLeft: 20,
  },
});

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.text.primary,
  marginTop: 10,
  marginBottom: 10,
  marginRight: 10,
  cursor: 'pointer',
}));

const TypoCmntTxt = styled(Typography)({
  color: '#3d3d3d',
  fontSize: 14,
});

const ButtonStyled = styled(Button)({
  color: '#757575',
  fontSize: 12,
});

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));

const TypoTimeStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

const TypoStatusStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  // color: theme.palette.secondary.contrastText,
  color: '#1773bf',
  fontWeight: '600',
}));

const TypoStatusStyledAccept = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#44b700',
  fontWeight: '600',
}));

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center',
  },
}));

const Bookings = (props) => {
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
  const {
    enqueueSnackbar,
    error,
    success_message,
    sucessEvent,
    SuccessEvent,
    booklistdata1,
    getUpcommingBookList,
    delete_booklist,
    loading,
    businessusers,
    getBusinessUsers,
    acceptStatusList,
    pendingStatusList,
    acceptStatus,
    pendingStatus,
    ...other
  } = props;

  const [userStatus, setUserStatus] = useState({});
  const [booklistdata, setBooklistdata] = useState([]);
  const [allBooklistdata, setAllBooklistdata] = useState([]);
  const [defaultSelected, setDefaultSelected] = useState('');
  const [ContactList, setContactList] = useState([]);
  const [open1, setOpen1] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [AcceptStatusList, setAcceptStatusList] = useState([]);
  const [PendingStatusList, setPendingStatusList] = useState([]);
  const [accepted, setAccepted] = useState(true);
  var pageNumber = 1;
  var pageNumber1 = 1;
  useEffect(() => {
    setBooklistdata(booklistdata1);
    setAllBooklistdata(booklistdata1);
  }, [booklistdata1]);

  useEffect(() => {
    getUpcommingBookList({ user_id });
    if (!loading) {
      SuccessEvent(false);
    }
  }, [getUpcommingBookList]);

  useEffect(() => {
    const contactList = businessusers;
    setContactList(contactList);
    console.log('contactList---', contactList);
  }, [businessusers]);

  useEffect(() => {
    const dataTosend = {
      user_id,
      business_code,
    };
    getBusinessUsers(dataTosend);
  }, []);

  useEffect(() => {
    console.log('pendingStatusList1',pendingStatusList)
    if (acceptStatusList.data != undefined) {
      const newState = acceptStatusList.data;
      // console.log('newState',newState,state)
      if (
        !(
          JSON.stringify(newState)== JSON.stringify(AcceptStatusList)
        )
      ) {
        setAcceptStatusList([...AcceptStatusList, ...newState]);
      }
    }
    if (pendingStatusList.data != undefined) {
      const newState1 = pendingStatusList.data;
      console.log('newState2-', newState1, PendingStatusList);
      const list = newState1.filter((value, index) => value === PendingStatusList[index])
      console.log('return-',JSON.stringify(newState1)== JSON.stringify(PendingStatusList));

      if (
        !(
          PendingStatusList.length === newState1.length &&
          JSON.stringify(newState1)== JSON.stringify(PendingStatusList)
        )
      ) {
        console.log('exe--')
        setPendingStatusList([...PendingStatusList, ...newState1]);
      }
    }
  }, [acceptStatusList, pendingStatusList]);

  useEffect(() => {
    async function fetchUserStatus(ID, meeting_id) {
      const result = await Axios().post('bookevent/eventuserstatus', { event_id: ID, meeting_id: meeting_id });
      setUserStatus(result.data.data);
      console.log('result.data.data', result.data.data);
    }

    if (booklistdata != null) {
      if (booklistdata[0] == undefined) {
      } else if (
        props.location &&
        props.location.state &&
        props.location.state.post_id &&
        props.location.state.post_id != null
      ) {
        if (props.location.state.recr_post_id != 0) {
          setDefaultSelected(props.location.state.recr_post_id);
        } else {
          // setDefaultSelected(props.location.state.post_id)
          setSelectedIndex(booklistdata[0] && booklistdata[0].meeting_data && booklistdata[0].meeting_data[0].meet_id);
          fetchUserStatus(
            booklistdata[0] && booklistdata[0].meeting_data && booklistdata[0].id,
            booklistdata[0].meeting_data[0].meet_id
          );
        }
      } else {
        setSelectedIndex(booklistdata[0] && booklistdata[0].meeting_data && booklistdata[0].meeting_data[0].meet_id);
        fetchUserStatus(
          booklistdata[0] && booklistdata[0].meeting_data && booklistdata[0].id,
          booklistdata[0].meeting_data[0].meet_id
        );
        setSelectedIndex(booklistdata[0].meeting_data[0].meet_id);
        setEventId(booklistdata[0].id);
      }

    }
  }, [booklistdata]);

  // useEffect(() => {
  //   if(props.location.state.post_id != null) {
  //     setSelectedIndex(props.location.state.post_id)
  //   }
  // }, []);

  useEffect(() => {
    console.log('accepted--', accepted);
    if (accepted) {
      setTimeout(() => {
        let Ele = document.querySelector('#scrollAccepted');
        console.log('Ele-', Ele);
        if (Ele) {
          Ele.addEventListener('scroll', () => {
            if (Ele.offsetHeight + Ele.scrollTop >= Ele.scrollHeight) {
              pageNumber = pageNumber + 1;
              const Data = {
                event_id: eventId,
                meeting_id: selectedIndex,
                page: pageNumber,
              };
              console.log('Data1-', Data);
              acceptStatus(Data);
              console.log('Page-', pageNumber);
            }
          });
          // Ele.setAttribute('onscroll', 'fetchMoreData');
        }
      }, 1000);
    } else {
      setTimeout(() => {
        let Ele = document.querySelector('#scrollPending');
        console.log('Ele1-', Ele);
        if (Ele) {
          Ele.addEventListener('scroll', () => {
            if (Ele.offsetHeight + Ele.scrollTop >= Ele.scrollHeight) {
              pageNumber1 = pageNumber1 + 1;
              const Data = {
                event_id: eventId,
                meeting_id: selectedIndex,
                page: pageNumber1,
              };
              console.log('Data-', Data);
              pendingStatus(Data);

              console.log('Page-', pageNumber);
            }
          });
          // Ele.setAttribute('onscroll', 'fetchMoreData');
        }
      }, 1000);
    }
  }, [accepted]);
  const history = useHistory();

  console.log('history====', history);
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const [showPanel, setShowPanel] = useState(true);

  const [openRymindr, setOpenRymindr] = useState(false);

  const handleStatusData = (data) => {
    if (data == 'ACCEPTED') {
      setAccepted(true);
    } else {
      setAccepted(false);
    }
  };
  console.log('dt-', accepted);

  const handleCloseRymindr = (newValue) => {
    // alert('main'+newValue);
    setOpenRymindr(newValue);
  };

  const handleToopenRymindr = () => {
    setOpenRymindr(true);
  };

  const handleCancel = () => {
    setOpen1(false);
  };

  const handleDelete = (eventId, user_id) => {
    // alert(user_id);
    // setOpenDelete(true);
    setOpenRymindr(true);
    const setdata = {
      eventId,
      user_id,
    };
    setDeletebooklist(setdata);
  };

  const handleClickImageOpen = (file) => {
    setOpenImage(true);
    setSelectedImage(file);
  };

  const handleShowDetail = () => {
    // alert('ababa');
    setShowPanel(false);
  };

  const handleHideDetail = () => {
    setShowPanel(true);
  };

  const classes = useStyles();

  const currencies = [
    {
      value: 'all',
      label: 'All',
    },
    {
      value: 'Parents Evening',
      label: 'Parents Evening',
      category_id: 159,
      img: require('../../assets/images/parent.png'),
    },
    {
      value: 'Event',
      label: 'Event',
      category_id: 158,
      img: require('../../assets/images/event.png'),
    },
    {
      value: 'Appointment',
      label: 'Appointment',
      category_id: 157,
      img: require('../../assets/images/event_blue.png'),
    },
  ];
  const Currencies = [
    {
      value: 'Parents Evening',
      label: 'Parents Evening',
      category_id: 159,
      img: require('../../assets/images/parent.png'),
    },
    {
      value: 'Event',
      label: 'Event',
      category_id: 158,
      img: require('../../assets/images/event.png'),
    },
    {
      value: 'Appointment',
      label: 'Appointment',
      category_id: 157,
      img: require('../../assets/images/event_blue.png'),
    },
  ];

  const [currency, setCurrency] = React.useState('all');
  const [currencyValue, setCurrencyValue] = React.useState('all');

  const handleChange = (event) => {
    let selCategory = currencies.find((o) => o.value === event.target.value);
    setCurrency(selCategory.category_id);
    setCurrencyValue(selCategory.value);

    let temp = [];

    if (selCategory.value != 'all') {
      allBooklistdata.map((item, index) => {
        if (selCategory.category_id == item.category) {
          temp.push(item);
        }
      });
    } else {
      allBooklistdata.map((item, index) => {
        temp.push(item);
      });
    }
    setBooklistdata(temp);
  };

  const handleCreateBooking = () => {
    if (ContactList.length > 0) {
      history.push('/event-bookings');
    } else {
      setOpen1(true);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose1 = () => {
    setOpenDelete(false);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    if (eventId && selectedIndex) {
      const Data = {
        event_id: eventId,
        meeting_id: selectedIndex,
        page: 1,
      };
      console.log('Data-',Data)
      acceptStatus(Data);
      pendingStatus(Data);
    }
    setTimeout(() => {
      let Ele = document.querySelector('#scrollElement');
      console.log('Ele-', Ele);
      if (Ele) {
        Ele.addEventListener('scroll', () => {
          if (Ele.offsetHeight + Ele.scrollTop >= Ele.scrollHeight) {
            if (accepted) {
              pageNumber = pageNumber + 1;
              const Data = {
                event_id: eventId,
                meeting_id: selectedIndex,
                page: pageNumber,
              };
              console.log('Data1-', Data);
              acceptStatus(Data);
            } else {
              pageNumber1 = pageNumber1 + 1;
              const Data = {
                event_id: eventId,
                meeting_id: selectedIndex,
                page: pageNumber1,
              };
              console.log('Data-', Data);
              pendingStatus(Data);
            }

            console.log('Page-', pageNumber);
          }
        });
        // Ele.setAttribute('onscroll', 'fetchMoreData');
      }
    }, 1000);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setAccepted(true);
    setValue(0);
    setAcceptStatusList([]);
    setPendingStatusList([]);
  };
  console.log('AcceptStatusList-',AcceptStatusList)
  console.log('PendingStatusList-',PendingStatusList)
  const [eventId, setEventId] = React.useState(null);
  const [bookid, setBookid] = React.useState(0);

  useEffect(() => {
    let mounted = true;
    console.log('Changed=', eventId, selectedIndex);
    // if (eventId && selectedIndex) {
    //   const Data = {
    //     event_id: eventId,
    //     meeting_id: selectedIndex,
    //     page: 0,
    //   };
    //   acceptStatus(Data);
    //   pendingStatus(Data);
    // }
    var sock = io('https://app.rymindr.com:8081');
    sock.on('booking-status:App\\Events\\BookingStatus', function (data) {
      if (mounted) {
        if (data.res.post_id == eventId && data.res.meeting_id == selectedIndex) {
          async function fetchUserStatus(ID) {
            const result = await Axios().post('bookevent/eventuserstatus', { event_id: ID, meeting_id: selectedIndex });
            setUserStatus(result.data.data);
          }
          fetchUserStatus(eventId);
        }
      }
    });
    return function cleanup() {
      mounted = false;
    };
  }, [eventId, selectedIndex]);

  console.log('acceptStatusList', acceptStatusList);
  console.log('pendingStatusList', pendingStatusList);
  const handleInputChange = (event, index, tabindex) => {
    setDefaultSelected('');
    setEventId(index);
    setSelectedIndex(tabindex);
    async function fetchUserStatus(ID) {
      const result = await Axios().post('bookevent/eventuserstatus', { event_id: ID, meeting_id: tabindex });
      setUserStatus(result.data.data);
    }
    fetchUserStatus(index);
  };
  const handleCloseImageModal = () => {
    setOpenImage(false);
  };

  const [deletebooklist, setDeletebooklist] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const deleteRymindr = (data) => {
    const newItem = Object.assign({}, deletebooklist, data);
    // setOpenDelete(false);
    delete_booklist(newItem);
  };

  const StatusHead = (
    <Box display="flex">
      <Tab label="ACCEPTED" />
      <Tab label="DECLINE" />
    </Box>
  );
  const time12Hours = (time) => {
    var timeString = time;
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    var ampm = H < 12 || H === 24 ? 'AM' : 'PM';
    timeString = h + timeString.substr(2, 3) + ' ' + ampm;
    return timeString;
  };
  console.log('AcceptStatusList', AcceptStatusList);
  const StatusTab = (
    <>
      {acceptStatusList.data != undefined ? (
        accepted ? (
          <DialogContent id="scrollAccepted" style={{ minHeight: '27rem', maxHeight: '40rem' }}>
            <List>
              {AcceptStatusList && AcceptStatusList.length > 0 ? (
                AcceptStatusList.map((element) => (
                  <ListItem alignItems="center">
                    {console.log('execute', element)}
                    <ListItemAvatar>
                      <AvatarShareStyled alt="semy Sharp" src={element.profile_image} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between">
                          <Typography>{element.name}</Typography>
                          <Box display="flex" justifyContent="center" alignItems="center">
                            <>
                              <FiberManualRecord style={{ color: '#44b700', fontSize: 14 }} />
                              <TypoStatusStyledAccept className="ml-20 mr-20">Accepted</TypoStatusStyledAccept>
                              <TypoPopHeadStyled style={{fontSize: 16}}>{time12Hours(element.slot)}</TypoPopHeadStyled>
                            </>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Box style={{ textAlign: 'center' }}>
                  <Typography>No Accepted List</Typography>
                </Box>
              )}
            </List>
          </DialogContent>
        ) : (
          <DialogContent id="scrollPending" style={{ minHeight: '27rem', maxHeight: '40rem' }}>
            <List>
              <div>
                {PendingStatusList.length > 0 ? (
                  PendingStatusList.map((element) => (
                    <ListItem alignItems="center">
                      <ListItemAvatar>
                        {console.log('pro-',element.profile_image)}
                        <AvatarShareStyled alt="semy Sharp" src={element.profile_image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between">
                            <Typography>{element.first_name + ' ' + element.last_name}</Typography>
                            <Box display="flex" justifyContent="center" alignItems="center">
                              <>
                                <FiberManualRecord style={{ color: '#1773bf', fontSize: 14 }} />
                                <TypoStatusStyled className="ml-20 mr-20">Pending</TypoStatusStyled>
                              </>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    // <Divider variant="inset" component="li" />
                  ))
                ) : (
                  <Box style={{ textAlign: 'center' }}>
                    <Typography>No Pending List</Typography>
                  </Box>
                )}
              </div>
            </List>
          </DialogContent>
        )
      ) : null}
    </>
  );
  const EventBookList =
    // booklistdata !== null && booklistdata.length > 0 ? (booklistdata.filter(booklistdata1 => (currency == 'all') ? (booklistdata1.id > 0) : (parseInt(booklistdata1.category) == currency)).map((item, index) => (
    booklistdata !== null && booklistdata.length > 0 ? (
      booklistdata.map(
        (item, index) =>
          item.meeting_data.map((mdata, mindex) => (
            <>
              <Hidden mdUp implementation="css" key={mindex}>
                <ListItem button onClick={handleShowDetail}>
                  <ListItemAvatar>
                    <AvatarShareStyled alt="semy Sharp" src={require('../../assets/images/event_rymindr.png')} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Parent Evening"
                    secondary={<TypoListSubtext>1 April 2020 to 30 April 2020</TypoListSubtext>}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Hidden>

              <Hidden smDown implementation="css">
                <ListItem
                  button
                  selected={
                    eventId == null &&
                    props.location &&
                    props.location.state &&
                    props.location.state.recr_post_id &&
                    props.location.state.recr_post_id != 0
                      ? defaultSelected == mdata.meet_id
                      : defaultSelected
                      ? defaultSelected == item.id
                      : selectedIndex === mdata.meet_id
                  }
                  onClick={(event) => handleInputChange(event, item.id, mdata.meet_id)}
                >
                  <ListItemAvatar>
                    <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      (item && item.category == '157'
                        ? 'Appointment | '
                        : item && item.category == '158'
                        ? 'Event | '
                        : 'Parents Evening | ') + item.subject
                      //   <div class="text-container">
                      //   parse{(item.subject)}
                      // </div>
                    }
                    secondary={<TypoListSubtext>{mdata.meeting_date}</TypoListSubtext>}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Hidden>
            </>
          ))
        // )
      )
    ) : (
      <List>
        <Typography className={classes.commingSoonDesc}>No records Found</Typography>
      </List>
    );

  var chk_list_id = 0;

  if (booklistdata !== null) {
    if (eventId == null && props.location && props.location.state && props.location.state.post_id) {
      if (props.location && props.location.state && props.location.state.recr_post_id != 0) {
        var chk_list_id = booklistdata.findIndex((p) => p.id == props.location.state.post_id);
        if (chk_list_id == '-1') {
          chk_list_id = 0;
        } else {
          booklistdata[chk_list_id].meeting_data.map((data, i) => {
            if (data.meet_id == props.location.state.recr_post_id) {
              chk_list_id = chk_list_id;
            }
          });
        }
      } else {
        var chk_list_id = booklistdata.findIndex((p) => p.id == props.location.state.post_id);
        if (chk_list_id == '-1') {
          chk_list_id = 0;
        }
      }
    } else {
      if (eventId == null) {
        var chk_list_id = 0;
      } else {
        var chk_list_id = booklistdata.findIndex((p) => p.id == eventId);
        if (chk_list_id == '-1') {
          chk_list_id = 0;
        }
      }
    }
  }

  const getSelectedRymindr =
    booklistdata !== null && booklistdata.length > 0
      ? booklistdata[chk_list_id].meeting_data.map((item) => ({ value: item.meet_id, label: item.meeting_date }))
      : 0;

  const meetingList =
    booklistdata !== null && booklistdata.length > 0 ? (
      booklistdata[chk_list_id].meeting_data.map((item) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" variant="square" src={require('../../assets/images/calendar_icon.png')} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box display="flex">
                  <Box width="30%">
                    <TypoTitleStyled>Meeting Date</TypoTitleStyled>
                    <TypoContentStyled>{item.meeting_date}</TypoContentStyled>
                  </Box>
                  <Box width="17%">
                    <TypoTitleStyled>Start Time</TypoTitleStyled>
                    <TypoContentStyled>{item.meeting_time_start}</TypoContentStyled>
                  </Box>
                  <Box width="17%">
                    <TypoTitleStyled>End Time</TypoTitleStyled>
                    <TypoContentStyled>{item.meeting_time_end}</TypoContentStyled>
                  </Box>
                  <Box width="18%">
                    <TypoTitleStyled>Break Start Time</TypoTitleStyled>
                    <TypoContentStyled>{item.meeting_time_start1}</TypoContentStyled>
                  </Box>
                  <Box width="18%">
                    <TypoTitleStyled>Break End Time</TypoTitleStyled>
                    <TypoContentStyled>{item.meeting_time_end1}</TypoContentStyled>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </>
      ))
    ) : (
      <ListItem button>
        <ListItemText primary="No record found." secondary="" />
      </ListItem>
    );

  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      if (mounted) {
        error && enqueueSnackbar(error, { variant: 'error' });
      }
    }, 0);
    return function cleanup() {
      mounted = false;
    };
  }, [error]);

  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      if (mounted) {
        success_message && enqueueSnackbar(success_message, { variant: 'success' });
      }
    }, 0);
    return function cleanup() {
      mounted = false;
    };
  }, [success_message]);

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <ResponsiveDialog open={openDelete} handleClose={handleClose1} deleteRymindr={deleteRymindr} />
        <Dialog open={openImage} onClose={handleCloseImageModal} aria-labelledby="form-dialog-title" maxWidth="xl">
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box display="flex">
                <TypoPopHeadStyled>Attachment</TypoPopHeadStyled>
              </Box>
              <IconButton color="default" onClick={handleCloseImageModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>
          <DialogContent>
            <center>
              <img
                src={selectedImage}
                // style={{ maxWidth:'-webkit-fill-available' }}
              />{' '}
            </center>
          </DialogContent>
        </Dialog>
        <Deleteevent
          open={openRymindr}
          onClose={handleCloseRymindr}
          getRymindrListData={getSelectedRymindr}
          deleteRymindr={deleteRymindr}
        />

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

        <Grid item xs={5}>
          <Box display="flex" alignItems="center">
            {showPanel ? null : (
              <Hidden mdUp implementation="css">
                <IconButton color="inherit" onClick={handleHideDetail}>
                  <ArrowBack />
                </IconButton>
              </Hidden>
            )}
            <TypoHeadStyled variant="h4">Bookings</TypoHeadStyled>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="mr-10"
              startIcon={<Drafts />}
              onClick={() => handleCreateBooking()}
            >
              Create New Booking
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid className="main-wrap-body booking-cont-wrap" container alignItems="stretch">
        {showPanel ? (
          <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
            <Paper className={clsx(classes.paper, 'sideBar-scroll')}>
              <TextFieldStyled
                select
                value={currencyValue}
                fullWidth
                size="small"
                onChange={(e) => handleChange(e)}
                variant="outlined"
              >
                <MenuItem key="all" value="all" style={{ paddingLeft: '2rem' }}>
                  All
                </MenuItem>
                {Currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <img src={option.img} style={{ width: '13%', marginRight: '1.5rem' }} /> {option.label}
                  </MenuItem>
                ))}
              </TextFieldStyled>

              <List style={{ maxHeight: 650 }}>{EventBookList}</List>
            </Paper>
          </Grid>
        ) : null}

        <Grid
          item
          xs={12}
          md={8}
          className={clsx(classes.rightPanel, 'rightSide-cont')}
          style={{ display: showPanel ? 'none' : 'block' }}
        >
          <Paper className={clsx(classes.paper, 'sideBar-scroll')}>
            {booklistdata !== null && booklistdata.length > 0 ? (
              <>
                <GridStyled container alignItems="center">
                  <Grid xs={6}>
                    <BoxStyled alignItems="center">
                      <AvatarShareStyled
                        alt="semy Sharp"
                        className="mr-0"
                        src={booklistdata[chk_list_id].category_image}
                      />
                      <Typography noWrap>
                        <Box fontWeight="fontWeightBold" m={1}>
                          {(booklistdata[chk_list_id].category == '157'
                            ? 'Appointment | '
                            : booklistdata[chk_list_id].category == '158'
                            ? 'Event | '
                            : 'Parents Evening | ') +
                            (booklistdata !== null && booklistdata.length > 0
                              ? booklistdata[chk_list_id].subject
                              : '--')}
                        </Box>
                      </Typography>
                    </BoxStyled>
                  </Grid>
                  <Grid xs={6}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        variant="outlined"
                        color="primary"
                        className="mr-10"
                        onClick={() => history.push(`/manage-booking/${booklistdata[chk_list_id].id}`)}
                      >
                        Manage booking
                      </Button>

                      {/* <ButtonPlain
                     disableRipple
                     onClick={() => history.push(`/booking-view/${booklistdata[chk_list_id].id}`)}
                     startIcon={<Print style={{ color: '#1976d2'}} />}
                   >
                      Print
                  </ButtonPlain> */}

                      <ButtonPlain
                        disableRipple
                        onClick={() =>
                          history.push({
                            pathname: `/booking-view/${booklistdata[chk_list_id].id}`,
                            customNameData: 'yourData',
                          })
                        }
                        startIcon={<Print style={{ color: '#1976d2' }} />}
                      >
                        Print
                      </ButtonPlain>

                      <ButtonPlain
                        disableRipple
                        onClick={() => history.push(`/event-bookings-duplicate/${booklistdata[chk_list_id].id}`)}
                        startIcon={<FileCopyIcon style={{ color: '#1872c0' }} />}
                      >
                        Duplicate
                      </ButtonPlain>

                      <ButtonPlain
                        disableRipple
                        onClick={() => history.push(`/event-bookings/${booklistdata[chk_list_id].id}`)}
                        startIcon={<Edit style={{ color: '#1872c0' }} />}
                      >
                        Edit
                      </ButtonPlain>

                      <ButtonPlain
                        disableRipple
                        startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                        onClick={() => handleDelete(booklistdata[chk_list_id].id, user_id)}
                      >
                        Delete
                      </ButtonPlain>
                    </Box>
                  </Grid>
                </GridStyled>

                <ListStyled>
                  {meetingList}

                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled alt="semy Sharp" variant="square" src={require('../../assets/images/email.png')} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Message</TypoTitleStyled>}
                      secondary={
                        <Typography>
                          {booklistdata !== null && booklistdata.length > 0
                            ? parse(booklistdata[chk_list_id].message)
                            : '--'}
                        </Typography>
                      }
                    />
                    {console.log('booking-', booklistdata[chk_list_id].message)}
                  </ListItem>

                  {userStatus && userStatus[0] && userStatus[0].length > 0 ? (
                    <>
                      <Divider variant="inset" component="li" />
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <AvatarStyled
                            alt="semy Sharp"
                            variant="square"
                            src={require('../../assets/images/user_icon.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<TypoTitleStyled>Contacts</TypoTitleStyled>}
                          secondary={
                            <Box display="flex" justifyContent="space-between">
                              <BoxStyled>
                                {userStatus[0].map((data, i) =>
                                  data.status == 'pending' ? (
                                    <StyledBadgePending
                                      overlap="circle"
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                      }}
                                      // variant='dot'
                                      badgeContent={<Update style={{ color: 'white', fontSize: 10 }} />}
                                    >
                                      <AvatarShareStyled alt="semy Sharp" src={data.profile_image} />
                                    </StyledBadgePending>
                                  ) : data.status == 'accept' ? (
                                    <StyledBadge
                                      overlap="circle"
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                      }}
                                      // variant='dot'
                                      badgeContent={<Check style={{ color: 'white', fontSize: 10 }} />}
                                    >
                                      <AvatarShareStyled alt="semy Sharp" src={data.profile_image} />
                                    </StyledBadge>
                                  ) : (
                                    <StyledBadgeReject
                                      overlap="circle"
                                      anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                      }}
                                      // variant='dot'
                                      badgeContent={<Close style={{ color: 'white', fontSize: 10 }} />}
                                    >
                                      <AvatarShareStyled alt="semy Sharp" src={data.profile_image} />
                                    </StyledBadgeReject>
                                  )
                                )}
                                <Box style={{ fontSize: 18, color: '#1abaff', padding: '10px 2px 0px 15px' }}>
                                  {console.log('userStatus-', userStatus)}
                                  {userStatus.remaining_count ? ' + ' + userStatus.remaining_count : ''}
                                </Box>
                              </BoxStyled>
                              <Box>
                                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                  Status
                                </Button>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    </>
                  ) : null}
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled alt="semy Sharp" variant="square" src={require('../../assets/images/attach.png')} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Attachment</TypoTitleStyled>}
                      secondary={
                        <Box display="flex" alignItems="center">
                          {booklistdata[chk_list_id].attachment.length > 0
                            ? booklistdata[chk_list_id].attachment.map((file, index) => {
                                if (file.image_name != undefined) {
                                  const extension_arr = file.image_name.split('.');
                                  const extension = extension_arr[1];

                                  if (
                                    extension == 'jpeg' ||
                                    extension == 'jpg' ||
                                    extension == 'png' ||
                                    extension == 'gif'
                                  ) {
                                    return (
                                      // <TypoStyled variant='subtitle1' component='p' key={index}>
                                      //   <img src={file.file_name} onClick={() => handleClickImageOpen(file.file_name)} className={classes.iconAttach} />{file.image_name}
                                      // </TypoStyled>
                                      <TypoStyled variant="subtitle1" component="p" key={index}>
                                        <img
                                          src={file.file_name}
                                          onClick={() => handleClickImageOpen(file.file_name)}
                                          className={classes.iconAttach}
                                        />
                                        {file.name.substring(0, 12)}
                                      </TypoStyled>
                                    );
                                  } else if (extension == 'mp3') {
                                    return (
                                      // <TypoStyled variant='subtitle1' component='p' key={index}>
                                      //   <a href={file.file_name} target='_blank'>
                                      //     <Headset className={classes.iconAttach} />{file.image_name}
                                      //   </a>
                                      // </TypoStyled>
                                      <TypoStyled variant="subtitle1" component="p" key={index}>
                                        <a href={file.file_name} target="_blank">
                                          <Headset className={classes.iconAttach} />
                                          {file.name.substring(0, 12)}
                                        </a>
                                      </TypoStyled>
                                    );
                                  } else if (extension == 'mp4') {
                                    return (
                                      // <TypoStyled variant='subtitle1' component='p' key={index}>
                                      //   <a href={file.file_name} target='_blank'>
                                      //     <Videocam className={classes.iconAttach} /> {file.image_name}
                                      //   </a>
                                      // </TypoStyled>
                                      <TypoStyled variant="subtitle1" component="p" key={index}>
                                        <a href={file.file_name} target="_blank">
                                          <Videocam className={classes.iconAttach} />
                                          {file.name.substring(0, 12)}
                                        </a>
                                      </TypoStyled>
                                    );
                                  } else if (extension == 'doc' || extension == 'docx' || extension == 'pdf') {
                                    return (
                                      // <TypoStyled variant='subtitle1' component='p' key={index}>
                                      //   <a href={file.file_name} target='_blank'>
                                      //     <Description className={classes.iconAttach} /> {file.image_name}
                                      //   </a>
                                      // </TypoStyled>
                                      <TypoStyled variant="subtitle1" component="p" key={index}>
                                        <a href={file.file_name} target="_blank">
                                          <Description className={classes.iconAttach} />
                                          {file.name.substring(0, 12)}
                                        </a>
                                      </TypoStyled>
                                    );
                                  } else {
                                    return (
                                      <TypoStyled variant="subtitle1" component="p" key={index}>
                                        <a href={file.file_name} target="_blank">
                                          <Description className={classes.iconAttach} />
                                          {file.name.substring(0, 12)}
                                        </a>
                                      </TypoStyled>
                                    );
                                  }
                                } else {
                                }
                              })
                            : 'No Attachments'}
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <Comments
                    type="booking"
                    postId={booklistdata !== null && booklistdata.length > 0 ? booklistdata[chk_list_id].id : '0'}
                    postUserId={booklistdata !== null && booklistdata.length > 0 ? booklistdata[chk_list_id].id : '0'}
                  />
                </ListStyled>
              </>
            ) : (
              <Box className={classes.content}>
                <CardMedia className={classes.icon} image={RymindrOriginal} title="Bookings" component="img" />
                <Typography className={classes.commingSoonDesc}>No record Found</Typography>
              </Box>
            )}
          </Paper>
        </Grid>

        <Dialog open={open} onClose={handleCloseModal} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
          <DialogTitleStyled id="form-dialog-title">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Box>
                <TypoPopHeadStyled>Meeting Status</TypoPopHeadStyled>
                <p style={{ fontSize: 15 }}>
                  {' '}
                  -{' '}
                  {userStatus !== undefined && userStatus['0'] && userStatus['0'][0]
                    ? userStatus['0'][0].meeting_date
                    : ''}
                </p>
              </Box>
              <IconButton color="default" onClick={handleCloseModal}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitleStyled>

          <DialogContent>
            <TabsStyles
              value={value}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab
                label="ACCEPTED"
                style={{ fontSize: 15 }}
                onClick={() => {
                  handleStatusData('ACCEPTED');
                }}
              />
              <Tab
                label="PENDING"
                style={{ fontSize: 15 }}
                onClick={() => {
                  handleStatusData('PENDING');
                }}
              />
            </TabsStyles>

            <Box display="flex" justifyContent="space-between" alignItems="center">
              {AcceptStatusList != undefined && PendingStatusList != undefined ? (
                <Box display="flex" className="ml-20" style={{ marginTop: '20px' }}>
                  <TypoPopHeadStyled style={{ color: 'gray' }}>Status : </TypoPopHeadStyled>
                  <TypoPopHeadStyled style={{ color: '#607383', marginLeft: 12 }} className="ml-20">
                    {AcceptStatusList.length} out of {AcceptStatusList.length + PendingStatusList.length} participants
                    booked{' '}
                  </TypoPopHeadStyled>
                </Box>
              ) : null}
              <ButtonPlain
                disableRipple
                onClick={() =>
                  history.push({
                    pathname: `/booking-view/${booklistdata[chk_list_id].id}`,
                    customNameData: 'yourData',
                  })
                }
                style={{ fontSize: 15 }}
                startIcon={<Print style={{ color: '#1976d2', width: '20px' }} />}
              >
                Print
              </ButtonPlain>
            </Box>
          </DialogContent>
          {StatusTab}
        </Dialog>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.booklist.loading,
    error: state.booklist.error,
    sucessEvent: state.bookevent.sucessEvent,
    booklistdata1: state.booklist.booklistdata,
    success_message: state.booklist.success_message,
    businessusers: state.rymidr.businessusers,
    acceptStatusList: state.booklist.acceptStatusList,
    pendingStatusList: state.booklist.pendingStatusList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    SuccessEvent: (data) => dispatch(SuccessEvent(false)),
    getUpcommingBookList: (data) => dispatch(getUpcommingBookList(data)),
    delete_booklist: (data) => dispatch(delete_booklist(data)),
    getBusinessUsers: (data) => dispatch(getBusinessUsers(data)),
    acceptStatus: (data) => dispatch(acceptStatus(data)),
    pendingStatus: (data) => dispatch(pendingStatus(data)),
  };
};

Bookings.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  SuccessEvent: PropTypes.func.isRequired,
  getUpcommingBookList: PropTypes.func.isRequired,
  booklistdata1: PropTypes.array.isRequired,
  delete_booklist: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Bookings));
