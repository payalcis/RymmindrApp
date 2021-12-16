import {
  ArrowBack,
  Comment,
  Delete,
  Description,
  Edit,
  Headset,
  Image,
  Message,
  MoreVert,
  Search,
  ThumbUp,
  Videocam,
  Close,
  FiberManualRecord,
  Update,
  Check,
} from '@material-ui/icons';
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Grid,
  Hidden,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  CardMedia,
} from '@material-ui/core';
import CircularSpinner from '../../../component/CircularSpinner/index';
import React, { useEffect, useMemo, useState } from 'react';
import {
  delete_rymindr2,
  getRymidrDetails,
  getUpcommingRymindrs,
  generateQrCodeDB,
  statusData,
} from '../../../store/actions/rymidr';
import Axios from '../../../helper/axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { makeStyles, styled, withStyles } from '@material-ui/core/styles';
import FullscreenSpinner from '../../../component/FullscreenSpinner';
import Comments from '../../../container/Comments/Comments';
import ResponsiveDialog from './Modal/RymindrModalDelete';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';
import { useHistory, useParams } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import * as htmlToImage from 'html-to-image';
import parse from 'html-react-parser';
import io from 'socket.io-client';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  VKIcon,
  OKIcon,
  TelegramIcon,
  WhatsappIcon,
  RedditIcon,
  TumblrIcon,
  MailruIcon,
  EmailIcon,
  LivejournalIcon,
  ViberIcon,
  WorkplaceIcon,
  LineIcon,
  PocketIcon,
  InstapaperIcon,
  WeiboIcon,
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
} from 'react-share';
import Share from '@material-ui/icons/Share';
import GetApp from '@material-ui/icons/GetApp';
import RymindrOriginal from '../../../assets/images/rymindr_original.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    overflow: 'auto',
    height: 100 + '%',
  }, // => {maxHeight: 'calc(100vh - 80px)', minHeight: 100 + 'vh', }
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
  wrapText: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  overFlowHide: {
    overflow: 'inherit',
  },
}));

const AvatarStyled = styled(Avatar)({
  height: 25,
  width: 25,
  '& img': {
    height: 'auto',
  },
});
const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
});
const TypoStatusStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));
const TypoStatusStyledAccept = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#44b700',
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));
const TypoStatusStyledReject = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#FF0000',
  width: 60,
  textAlign: 'right',
  fontWeight: '600',
}));
const TypoTitleStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));
const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));
const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 15,
  color: theme.palette.text.primary,
}));

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
});

const BoxStyled = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
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

const TypoListSubtext2 = styled(TypoListSubtext)(({ theme }) => ({
  color: '#696969',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));

const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  paddingTop: 10,
  paddingBottom: 10,
}));

const ListStyled = styled(List)(({ theme }) => ({
  paddingLeft: 20,
}));

const GridStyled = styled(Grid)({
  padding: '15px 15px 15px 30px',
});

const AvatarComntStyled = styled(Avatar)({
  height: 42,
  width: 42,
  marginRight: 20,
});

const TextFieldStyled = styled(TextField)({
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
const TypoCmntTxt = styled(Typography)({
  color: '#3d3d3d',
  fontSize: 14,
});

const ButtonStyled = styled(Button)({
  color: '#757575',
  fontSize: 12,
});

const BoxColorStyled = styled(Box)({
  background: '#f0f6fb',
  fontSize: 12,
  padding: '10px 15px',
  borderRadius: 15,
  minWidth: 160,
  justifyContent: 'space-between',
});

const BoxImgStyled = styled(Box)({
  textAlign: 'center',
  marginRight: 20,
  '& div': {
    margin: 'auto',
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

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
  maxWidth: 600,
}));

const DialogContentStyled = styled(DialogContent)({
  textAlign: 'center',
});

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: 30,
  height: 100 + '%',
}));

const TypoTxtStyled = styled(Typography)(({ theme }) => ({
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  fontSize: 16,
}));

const TypoBusStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: 18,
  fontWeight: '800',
}));

const options = [];

const UpcomingRymindr = (props) => {
  const history = useHistory();
  const {
    enqueueSnackbar,
    error,
    getUpcommingRymindrs,
    upcommingrymindr,
    loading,
    getRymidrDetails,
    rymindrDetails,
    delete_rymindr2,
    success_message,
    generateQrCodeDB,
    qrImg,
    statusData,
    statusList,
  } = props;
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
  const [showPanel, setShowPanel] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleterymindr, setDeleterymindr] = useState(null);
  const showShare = () => {
    setIsHidden(!isHidden);
  };
  const [firstRun , setFirstRun] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  const [openImage, setOpenImage] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');
  const [showParticularMessage, setShowParticularMessage] = useState([]);
  const [state, setState] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  const [searchvalue, setSearchvalue] = useState('');
  const [UpcomingRymindrs, setUpcomingRymindr] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [users_list, setUserList] = useState([]);

  const [openQR, setOpenQR] = React.useState(false);

  const [openDownloadImage, setOpenDownloadImage] = React.useState(false);

  const [selectedId, setSelectedId] = React.useState('');

  const [isQRCodeImage, setQRCodeImage] = React.useState();

  var pageNumber = 1
  const handleCloseDownloadModal = () => {
    // alert('clsoe')
    setOpenDownloadImage(false);
  };

  const handleClickQROpen = (user_qr_code, user_qr_code_base64, business_code) => {
    setOpenQR(true);
    // setQrCode(user_qr_code)
    // setQrCodeBase64(user_qr_code_base64)
    // setBusinessCode(business_code)
  };

  const handleCloseQRModal = () => {
    // alert('clsoe')
    setOpenQR(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setTimeout(() => {
      let Ele = document.querySelector('#scrollElement');
      console.log('Ele-', Ele);
      if (Ele) {
        var position = Ele.scrollTop
        Ele.addEventListener('scroll', () => {
          if ((Ele.offsetHeight + Ele.scrollTop) >= Ele.scrollHeight){
          console.log('posi bottom');
          pageNumber = pageNumber + 1
        
          const dataTosend = {
            rymindr_id: rymindrDetails.rymindr_id,
            page: pageNumber,
          };
          statusData(dataTosend);
          console.log('Page-',pageNumber)
        }
        
        });
        // Ele.setAttribute('onscroll', 'fetchMoreData');
      }
    }, 1000);
  };
  const removeDuplicates = (originalArray, prop) => {
    var newArray = [];
    var lookupObject = {};

    for (var i in originalArray) {
      lookupObject[originalArray[i][prop]] = originalArray[i];
    }

    for (i in lookupObject) {
      newArray.push(lookupObject[i]);
    }
    return newArray;
  };

  useEffect(() => {
    const userList = [];
    console.log('rymindrDetails=======', rymindrDetails);
    if (rymindrDetails !== null && rymindrDetails.user_list && rymindrDetails.group_list) {
      rymindrDetails.user_list.forEach((element) => {
        userList.push(element);
      });
      rymindrDetails.group_list.forEach((element) => {
        element.group_member_list.forEach((ele) => {
          userList.push(ele);
        });
      });
      setUserList(userList);

      var uniqueArray = removeDuplicates(userList, 'user_id');
      setUserList(uniqueArray);
      setState([])
      console.log('firstRun',firstRun)
        if (firstRun){
            pageNumber = 1
            const dataToSend = {
              rymindr_id: rymindrDetails.rymindr_id,
              page: pageNumber,
            };
            statusData(dataToSend);
            console.log('calling3');
          }
          setFirstRun(true)
    }

    let mounted = true;
    var sock = io('https://app.rymindr.com:8081');
    sock.on('rymindr-status:App\\Events\\RymindrStatus', function (data) {
      if (mounted) {
        if (data.postId == rymindrDetails.rymindr_id) {
          let dataTosend = {};
          if (rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1) {
            dataTosend = {
              user_id,
              rymindr_id: data.postId,
              is_bank_holiday: 1,
            };
            
          } else {
            dataTosend = {
              user_id,
              rymindr_id: data.postId,
              is_page: 'history',
            };
            
          }
          getRymidrDetails(dataTosend);
        }

      }
      
    });
    return function cleanup() {
      mounted = false;
    };
  }, [rymindrDetails]);

  useEffect(() => {
    if (statusList != undefined){
      const newState = statusList;
      // console.log('newState',newState,state)
      if (!(state.length === newState.length && newState.every(function(value, index) { return value === state[index]}))){
       setState([...state, ...newState]);
      }
    }
  }, [statusList]);

  

  useEffect(() => {
    if (qrImg) {
      const dataTosend = {
        user_id,
        rymindr_id: rymindrDetails.rymindr_id,
        is_page: 'history',
      };
      getRymidrDetails(dataTosend);
    }
  }, [qrImg]);

  useEffect(() => {
    if (UpcomingRymindrs && UpcomingRymindrs.length > 0 && UpcomingRymindrs[0]) {
      if (UpcomingRymindrs[0].rymindr_id) {
        let dataTosend = {
          user_id,
          rymindr_id: UpcomingRymindrs[0].rymindr_id,
          is_page: 'history',
        };
        setSelectedItem(UpcomingRymindrs[0].rymindr_id);
        getRymidrDetails(dataTosend);
        
      } else if (UpcomingRymindrs[0].id) {
        let dataTosend = {
          user_id,
          rymindr_id: UpcomingRymindrs[0].rymindr_id,
          is_bank_holiday: 1,
        };
        setSelectedItem(UpcomingRymindrs[0].rymindr_id);

        // getRymidrDetails(dataTosend);
      }
    }
    console.log('UpcomingRymindrs====', UpcomingRymindrs);
  }, [UpcomingRymindrs]);


  // useMemo(() => {

  //   const userList = []
  //   if (rymindrDetails !== null && rymindrDetails.user_list && rymindrDetails.group_list) {
  //     rymindrDetails.user_list.forEach(element => {
  //       userList.push(element)
  //     })
  //     rymindrDetails.group_list.forEach(element => {
  //       element.group_member_list.forEach(ele => {
  //         userList.push(ele)
  //       })
  //     })
  //     setUserList(userList)
  //     var uniqueArray = removeDuplicates(userList, 'user_id')
  //     setUserList(uniqueArray)
  //   }
  // }, [rymindrDetails])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseImageModal = () => {
    setOpenImage(false);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  const handleCloseModal = () => {
    setOpen(false);

    setTimeout(() => {
      setState([])
    }, 200);
    pageNumber = 1
            const dataToSend = {
              rymindr_id: rymindrDetails.rymindr_id,
              page: pageNumber,
            };
            statusData(dataToSend);
            console.log('calling3');
    // pageNumber = 0;
    
  };
  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleShowDetail = (id, rymindr_type) => {
    // const dataTosend = {
    //   user_id,
    //   rymindr_id: id,
    //   is_page: 'history'
    // }
    // getRymidrDetails(dataTosend)
    let dataTosend = {};

    if (rymindr_type == 'Holiday') {
      dataTosend = {
        user_id,
        rymindr_id: id,
        is_bank_holiday: 1,
      };
    } else {
      dataTosend = {
        user_id,
        rymindr_id: id,
        is_page: 'history',
      };
    }
    setShowPanel(false);
    getRymidrDetails(dataTosend);
    
  };

  const handleHideDetail = () => {
    setShowPanel(true);
  };
  const fetchRymidrDetails = (id, is_bank_holiday, rymindr_type) => {
    console.log('id===', id);
    //setSelectedId(id);
    let dataTosend = {};
    if (rymindr_type == 'Holiday' && is_bank_holiday == 1) {
      dataTosend = {
        user_id,
        rymindr_id: id,
        is_bank_holiday: 1,
      };
    } else {
      dataTosend = {
        user_id,
        rymindr_id: id,
        is_page: 'history',
      };
    }
    setSelectedItem(id);
    getRymidrDetails(dataTosend);
  };

  const handleDelete = (recr_rymindr_id, rymindr_id, qiscus_id) => {
    setOpenDelete(true);
    const setdata = {
      recr_rymindr_id: recr_rymindr_id,
      rymindr_id,
      user_id,
      user_name: first_name + ' ' + last_name,
      qiscus_id,
    };
    setDeleterymindr(setdata);
  };
  const handleClickImageOpen = (file) => {
    setOpenImage(true);
    setSelectedImage(file);
  };
  const deleteRymindr = (reason1) => {
    var temp = {
      ...deleterymindr,
      reason: reason1,
    };
    delete_rymindr2(temp);
    setOpenDelete(false);
  };

  useMemo(() => {
    success_message && enqueueSnackbar(success_message, { variant: 'success' });
  }, [success_message]);

  // useEffect(() => {
  //   let mounted = true;
  //   setTimeout(function () {
  //     if (mounted) {
  //       success_message && enqueueSnackbar(success_message, { variant: 'success' });
  //     }
  //   }, 0);
  //   return function cleanup() {
  //     mounted = false;
  //   };
  // }, [success_message]);

  const classes = useStyles();

  const regex = '/<(.|\n)*?>/g';

  const Rymindrlist =
    // UpcomingRymindrs != undefined && rymindrDetails != null && UpcomingRymindrs.length > 0 ? (
    UpcomingRymindrs != undefined && UpcomingRymindrs.length > 0 ? (
      UpcomingRymindrs.map((item, index) => (
        <>
          <Hidden mdUp implementation="css">
            <ListItemStyled
              key={item.rymindr_id}
              button
              onClick={() =>
                handleShowDetail(item.rymindr_type == 'Holiday' ? item.id : item.rymindr_id, item.rymindr_type)
              }
              // selected={selectedItem ? selectedItem === item.rymindr_id : rymindrDetails.rymindr_id === item.rymindr_id}
              selected={
                item.rymindr_type == 'Holiday'
                  ? selectedItem
                    ? selectedItem === item.id
                    : !!(rymindrDetails && rymindrDetails.id === item.id)
                  : selectedItem
                  ? selectedItem === item.rymindr_id
                  : !!(rymindrDetails && rymindrDetails.rymindr_id === item.rymindr_id)
              }
            >
              <ListItemAvatar>
                <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.rymindr_type}
                secondary={
                  <>
                    <TypoListSubtext2 class="text-container">
                      <div class="text-container">
                        {item.note && item.note.replace(/<(.|\n)*?>/g, '').replace(/\&nbsp;/g, '')}
                      </div>
                    </TypoListSubtext2>
                    <TypoListSubtext>
                      {`${moment(item.rymindr_date).format('dddd DD MMMM YYYY')}  | ${moment(
                        item.rymindr_date + ' ' + item.rymindr_time
                      ).format('LT')}`}
                    </TypoListSubtext>
                  </>
                }
              />
            </ListItemStyled>
            <Divider variant="inset" component="li" />
          </Hidden>
          <Hidden smDown implementation="css">
            <ListItem
              key={item.rymindr_id}
              button
              onClick={() =>
                fetchRymidrDetails(
                  item.rymindr_type == 'Holiday' && item.is_bank_holiday == 1 ? item.id : item.rymindr_id,
                  item.is_bank_holiday,
                  item.rymindr_type
                )
              }
              // selected={selectedItem ? selectedItem === item.rymindr_id : rymindrDetails.rymindr_id === item.rymindr_id}
              selected={
                item.rymindr_type == 'Holiday'
                  ? selectedItem
                    ? selectedItem === item.id
                    : !!(rymindrDetails && rymindrDetails.id === item.id)
                  : selectedItem
                  ? selectedItem === item.rymindr_id
                  : !!(rymindrDetails && rymindrDetails.rymindr_id === item.rymindr_id)
              }
            >
              <ListItemAvatar>
                <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
              </ListItemAvatar>
              <ListItemText
                // primary={item.rymindr_type}
                secondary={
                  <>
                    <TypoListSubtext2>
                      {/* <div class="text-container"> */}
                      {item.note && item.note.replace(/<(.|\n)*?>/g, '').replace(/\&nbsp;/g, '')}
                      {/* </div> */}
                    </TypoListSubtext2>
                    <TypoListSubtext>
                      {`${moment(item.rymindr_date).format('dddd DD MMMM YYYY')}  | ${moment(
                        item.rymindr_date + ' ' + item.rymindr_time
                      ).format('LT')}`}
                    </TypoListSubtext>
                  </>
                }
              />
            </ListItem>

            <Divider variant="inset" component="li" />
          </Hidden>
        </>
      ))
    ) : (
      <ListItem button>
        <ListItemText primary="No Rymindrs found.  Go ahead and create your first Rymindr." secondary="" />
      </ListItem>
    );

  useEffect(() => {
    const dataToSend = {
      user_id,
    };
    getUpcommingRymindrs(dataToSend);
    // setRymindrDetails(upcommingrymindr && upcommingrymindr.upcomingList[0]);
  }, []);

  const generateQrCode = (rymindr_id) => {
    // alert('generateQrCode'+rymindr_id);
    const data = {
      user_id,
      rymindr_id,
    };
    generateQrCodeDB(data, history);

    // const dataTosend = {
    //   user_id,
    //   rymindr_id,
    //   is_page: 'history'
    // }
    // getRymidrDetails(dataTosend)
  };

  // useMemo(() => {
  //   if (error == `Cannot read proprty 'push' of undefined`) {
  //     return true;
  //   } else {
  //     error && enqueueSnackbar(error, { variant: 'error' });
  //   }
  // }, [error]);

  useEffect(() => {
    let mounted = true;
    setTimeout(function () {
      if (mounted) {
        console.log('error====', error);
        if (error == `Cannot read proprty 'push' of undefined`) {
          return true;
        } else {
          error && enqueueSnackbar(error, { variant: 'error' });
        }
      }
    }, 0);
    return function cleanup() {
      mounted = false;
    };
  }, [error]);

  useMemo(() => {
    setUpcomingRymindr(upcommingrymindr.upcomingList);
  }, [upcommingrymindr]);

  // Query string params
  const { param, paramType } = useParams();

  useEffect(() => {
    if (param !== undefined) {
      if (upcommingrymindr.hasOwnProperty('upcomingList')) {
        const filteredList = upcommingrymindr.upcomingList.filter(
          (obj) =>
            obj.category_name.toLowerCase().includes(param.toLowerCase()) ||
            obj.rymindr_type.toLowerCase().includes(param.toLowerCase()) ||
            obj.rymindr_date.toLowerCase().includes(param.toLowerCase()) ||
            (obj.note !== null ? obj.note.toLowerCase().includes(param.toLowerCase()) : null)
        );
        // const filteredList = upcommingrymindr.upcomingList.filter(obj => console.warn('obj1234', obj.note))

        setUpcomingRymindr(filteredList);
      }
    }
  }, [upcommingrymindr]);

  const handlesearch = (e) => {
    // setSearchvalue(e.target.value);

    const searchStr = e.target.value;

    if (searchStr.length > 1) {
      const filteredList = upcommingrymindr.upcomingList.filter(
        (obj) =>
          obj.category_name.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.rymindr_type.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.rymindr_date.toLowerCase().includes(searchStr.toLowerCase()) ||
          (obj.note !== null ? obj.note.toLowerCase().includes(searchStr.toLowerCase()) : null)
      );
      console.log('filteredList====');
      setUpcomingRymindr(filteredList);
    } else {
      setUpcomingRymindr(upcommingrymindr.upcomingList);
    }
  };

  const downloadQRCode = () => {
    handleCloseImageModal();
    setOpenQR(false);
    setOpenDownloadImage(true);
    // alert('state--'+openDownloadImage);
    const timer = setTimeout(() => {
      htmlToImage.toPng(document.getElementById('qr-img'), { backgroundColor: '#FFFFFF' }).then(function (dataUrl) {
        var link = document.createElement('a');
        link.crossOrigin = 'Anonymous';
        link.download = 'qr-code.png';
        link.href = dataUrl;
        link.click();
      });
    }, 1200);
    return () => clearTimeout(timer);
    setOpenDownloadImage(false);
  };

  const [isHidden, setIsHidden] = React.useState(true);
  const shareUrl = 'http://github.com';
  const title = 'GitHub';

  const [width, setWidth] = React.useState(0);
  const [width1, setWidth1] = React.useState(0);
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const measuredRef1 = React.useCallback((node) => {
    if (node !== null) {
      setWidth1(node.getBoundingClientRect().width);
    }
  }, []);

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        {/* <FullscreenSpinner open={loading} /> */}
        <ResponsiveDialog open={openDelete} handleClose={handleClose} deleteRymindr={deleteRymindr} type="Rymindr" />
        <Grid item xs={7}>
          <Box display="flex" alignItems="center">
            {showPanel ? null : (
              <Hidden mdUp implementation="css">
                <IconButton color="inherit" onClick={handleHideDetail}>
                  <ArrowBack />
                </IconButton>
              </Hidden>
            )}
            <TypoHeadStyled variant="h4">
              Upcoming <TypoHeadInnerStyled component="span">Rymindr</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
        <Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => history.push('/create-rymindr')}
              startIcon={
                <img src={require('../../../assets/images/createrymindricon.png')} style={{ height: 20, width: 20 }} />
              }
            >
              CREATE NEW RYMINDR
            </Button>
          </Box>
        </Grid>
      </Grid>


      <Grid className="main-wrap-body upcmgRym-cont-wrap" container alignItems="stretch">
        {showPanel ? (
          <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
            <Paper className={classes.paper}>
              <SearchFieldStyled
                placeholder="Search Rymindr"
                id="input-with-icon-textfield"
                variant="outlined"
                fullWidth
                size="small"
                onKeyUp={handlesearch}
                defaultValue={param !== undefined ? param : ''}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              <List >{UpcomingRymindrs != undefined ? Rymindrlist : loading && <CircularSpinner />}</List>
            </Paper>
          </Grid>
        ) : null}
        {rymindrDetails != null ? (
          rymindrDetails.rymindr_type ? (
            <Grid
              ref={measuredRef}
              item
              xs={12}
              md={8}
              className={clsx(classes.rightPanel, 'rightSide-cont')}
              style={{ display: showPanel ? 'none' : 'block' }}
            >
              <Paper className={classes.paper}>
                <GridStyled container alignItems="center">
                  <Grid xs={6}>
                    <BoxStyled alignItems="center">
                      <AvatarShareStyled alt="semy Sharp" src={rymindrDetails.category_image} />
                      <Typography noWrap>
                        <Box fontWeight="fontWeightBold" m={1}>
                          <h6 style={{ paddingLeft: '5px' }}>{rymindrDetails.rymindr_type}</h6>
                        </Box>
                      </Typography>
                    </BoxStyled>
                  </Grid>
                  <Grid xs={6}>
                    {rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1 ? null : (
                      <Box display="flex" justifyContent="flex-end">
                        <ButtonPlain
                          onClick={() => history.push('/edit-rymindr/' + rymindrDetails.rymindr_id)}
                          disableRipple
                          startIcon={<Edit style={{ color: '#1872c0' }} />}
                        >
                          Edit
                        </ButtonPlain>
                        <ButtonPlain
                          disableRipple
                          onClick={() =>
                            handleDelete(
                              rymindrDetails.recr_rymindr_id,
                              rymindrDetails.rymindr_id,
                              rymindrDetails.qiscus_id
                            )
                          }
                          startIcon={<Delete style={{ color: '#ec4d4b' }} />}
                        >
                          Delete
                        </ButtonPlain>
                      </Box>
                    )}
                  </Grid>
                </GridStyled>

                <ListStyled>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled
                        alt="semy Sharp"
                        variant="square"
                        src={require('../../../assets/images/time.png')}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>Date & Time</TypoTitleStyled>}
                      secondary={
                        <TypoContentStyled>
                          {`${moment(rymindrDetails.rymindr_date).format('dddd DD MMMM YYYY')}  | ${moment(
                            rymindrDetails.rymindr_date + ' ' + rymindrDetails.rymindr_time
                          ).format('LT')}`}
                        </TypoContentStyled>
                      }
                    />

                    {rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1 ? null : (
                      <BoxColorStyled display="flex" className="qrcode-box">
                        <Box display="flex" className="own-desc">
                          <BoxImgStyled className="own-name">
                            <AvatarStyled
                              alt="semy Sharp"
                              variant="square"
                              src={require('../../../assets/images/owner.png')}
                            />

                            <TypoTitleStyled className="own-name">Owner</TypoTitleStyled>
                          </BoxImgStyled>
                          <BoxStyled alignItems="center" className="own-pic">
                            <AvatarComntStyled alt="semy Sharp" src={rymindrDetails.profile_image} />
                            <Typography>{`${rymindrDetails.first_name}  ${rymindrDetails.last_name}`}</Typography>
                          </BoxStyled>
                        </Box>

                        {rymindrDetails.qr_code != null || qrImg != null ? (
                          <Box display="flex" alignItems="center" className="qrcode">
                            <BoxImgStyled className="qrcode-icon">
                              <img
                                src={require('../../../assets/images/qr.png')}
                                onClick={() =>
                                  handleClickQROpen(
                                    rymindrDetails.qr_code,
                                    rymindrDetails.user_qr_code_base64,
                                    rymindrDetails.qiscus_id
                                  )
                                }
                                style={{ height: '20px', cursor: 'pointer' }}
                              />
                              <TypoTitleStyled>QR Code</TypoTitleStyled>
                            </BoxImgStyled>
                          </Box>
                        ) : (
                          <>
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{ alignSelf: 'center' }}
                              onClick={() => generateQrCode(rymindrDetails.rymindr_id)}
                            >
                              {loading && <CircularSpinner />}
                              GET QR Code
                            </Button>
                          </>
                        )}
                      </BoxColorStyled>
                    )}

                    {/* QR CODE POPUP */}
                    <Dialog
                      open={openQR}
                      onClose={handleCloseQRModal}
                      aria-labelledby="form-dialog-title"
                      maxWidth="sm"
                      fullWidth
                    >
                      <DialogTitleStyled id="form-dialog-title">
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex">
                            <TypoPopHeadStyled>QR Code</TypoPopHeadStyled>
                          </Box>
                          <IconButton color="default" onClick={handleCloseQRModal}>
                            <Close />
                          </IconButton>
                        </Box>
                      </DialogTitleStyled>
                      <DialogContentStyled>
                        <TypoBusStyled component="h2">{rymindrDetails.sc_bessi_name}</TypoBusStyled>
                        <TypoTxtStyled>Scan</TypoTxtStyled>
                        <img src={rymindrDetails.qr_code} alt="semy Sharp" style={{ height: 280, width: 280 }} />
                        <TypoTxtStyled>Rymindr</TypoTxtStyled>
                        <TypoTxtStyled>{rymindrDetails.rymindr_type}</TypoTxtStyled>
                        <TypoTxtStyled>
                          {`${moment(rymindrDetails.rymindr_date).format('DD MMMM YYYY')} @ ${moment(
                            rymindrDetails.rymindr_date + ' ' + rymindrDetails.rymindr_time
                          ).format('LT')}`}
                        </TypoTxtStyled>

                        <Box display="flex" justifyContent="space-around" mt={3} mb={3}>
                          <Button onClick={downloadQRCode} style={{ marginRight: '8px' }}>
                            <GetApp color="primary" style={{ marginRight: 17 }} /> Download
                          </Button>{' '}
                          {/* <Button onClick={showShare}>
                            <Share color="primary" style={{ marginRight: 20 }} /> Share
                          </Button> */}
                        </Box>

                        {!isHidden && (
                          <Box display="flex" justifyContent="space-around" mt={3} mb={3}>
                            {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 50 }} src={require('../../assets/images/ic_g+.png')} /></Link>
                      <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_in.png')} /></Link> */}
                            <LinkedinShareButton
                              url="https://www.linkedin.com/company/rymindr"
                              quote="Rymindr"
                              className="Demo__some-network__share-button"
                            >
                              <LinkedinIcon size={48} round />
                            </LinkedinShareButton>

                            {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_twitter.png')} /></Link>
                      <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_fb.png')} /></Link> */}
                            <FacebookShareButton
                              url="https://www.facebook.com/Rymindr/"
                              quote="Rymindr"
                              className="Demo__some-network__share-button"
                            >
                              <FacebookIcon size={48} round />
                            </FacebookShareButton>

                            {/* <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_wts.png')} /></Link>
                  <Link><img alt='semy Sharp' style={{ height: 48, width: 48 }} src={require('../../assets/images/ic_email.png')} /></Link> */}
                            <EmailShareButton>
                              <EmailIcon size={48} round />
                            </EmailShareButton>
                          </Box>
                        )}
                      </DialogContentStyled>
                    </Dialog>
                    {/* QR CODE POPUP */}

                    {/* QR CODE DOWNLOAD POPUP openDownloadImage */}

                    <Dialog
                      className="myNode barcode-popup"
                      id="my-node"
                      open={openDownloadImage}
                      onClose={handleCloseDownloadModal}
                      aria-labelledby="form-dialog-title"
                      maxWidth="sm"
                      fullWidth
                    >
                      <div id="qr-img">
                        <DialogContentStyled>
                          <div className="logoHead">
                            <img src={require('../../../assets/images/rymindr_smiles_logo.png')} />
                          </div>
                          <br />
                          <TypoBusStyled component="h2">{rymindrDetails.sc_bessi_name}</TypoBusStyled>
                          <TypoTxtStyled>Scan</TypoTxtStyled>
                          <img src={rymindrDetails.qr_code_base64} alt="semy Sharp" className="barcode-img" />
                          <TypoTxtStyled>Rymindr</TypoTxtStyled>
                          <TypoTxtStyled>{rymindrDetails.rymindr_type}</TypoTxtStyled>
                          <TypoTxtStyled>
                            {`${moment(rymindrDetails.rymindr_date).format('DD MMMM YYYY')} @ ${moment(
                              rymindrDetails.rymindr_date + ' ' + rymindrDetails.rymindr_time
                            ).format('LT')}`}
                          </TypoTxtStyled>
                          <div className="poweredBy">
                            {/* <p>Powered by</p> */}
                            <img src={require('../../../assets/images/footer_logo.png')} style={{ height: '46px' }} />
                          </div>
                        </DialogContentStyled>
                      </div>
                    </Dialog>
                    {/* QR CODE DOWNLOAD POPUP */}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AvatarStyled
                        alt="semy Sharp"
                        variant="square"
                        src={require('../../../assets/images/note.png')}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<TypoTitleStyled>About</TypoTitleStyled>}
                      secondary={
                        <Typography>
                          {rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1
                            ? rymindrDetails.description
                            : parse(rymindrDetails.note)}
                        </Typography>
                      }
                    />
                  </ListItem>

                  <Divider variant="inset" component="li" />
                  {rymindrDetails.rymindr_type == 'Holiday' &&
                  rymindrDetails.is_bank_holiday == 1 ? null : users_list.length > 0 ? (
                    <Box display="flex">
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <AvatarStyled
                            alt="semy Sharp"
                            variant="square"
                            src={require('../../../assets/images/share.png')}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={<TypoTitleStyled>Shared with</TypoTitleStyled>}
                          secondary={
                            <Box className="share-avatar-box" display="flex" justifyContent="space-between">
                              <BoxStyled className={('share-avatar-box-inner', classes.overFlowHide)}>
                                {users_list.map((record, id) => (
                                  <>
                                    {id >= 10 ? (
                                      false
                                    ) : record.is_status == 0 ? (
                                      <StyledBadgePending
                                        ref={measuredRef1}
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Update style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          key={record.user_id}
                                          alt="semy Sharp"
                                          src={record.profile_image}
                                        />
                                      </StyledBadgePending>
                                    ) : record.is_status == 1 ? (
                                      <StyledBadge
                                        overlap="circle"
                                        anchorOrigin={{
                                          vertical: 'bottom',
                                          horizontal: 'right',
                                        }}
                                        // variant='dot'
                                        badgeContent={<Check style={{ color: 'white', fontSize: 10 }} />}
                                      >
                                        <AvatarShareStyled
                                          key={record.user_id}
                                          alt="semy Sharp"
                                          src={record.profile_image}
                                        />
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
                                        <AvatarShareStyled
                                          key={record.user_id}
                                          alt="semy Sharp"
                                          src={record.profile_image}
                                        />
                                      </StyledBadgeReject>
                                    )}
                                  </>
                                ))}
                                {console.log('users_list-', users_list)}
                                <Box
                                  style={{ fontSize: 18, color: '#1abaff', padding: '10px 2px 0px 15px' }}
                                  onClick={handleClickOpen}
                                >
                                  {users_list.length >= 10 ? '+ ' + (rymindrDetails.remainingCount) : ''}
                                </Box>
                              </BoxStyled>
                              <Box style={{ position: 'relative' }}>
                                <Box>
                                  <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                                    {' '}
                                    Status{' '}
                                  </Button>
                                </Box>
                              </Box>
                            </Box>
                          }
                        />
                      </ListItem>
                    </Box>
                  ) : null}
                  {rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1 ? null : (
                    <Divider variant="inset" component="li" />
                  )}

                  {rymindrDetails.rymindr_type == 'Holiday' &&
                  rymindrDetails.is_bank_holiday == 1 ? null : rymindrDetails.attachment ? (
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <AvatarStyled
                          alt="semy Sharp"
                          variant="square"
                          src={require('../../../assets/images/attach.png')}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<TypoTitleStyled>Attachment</TypoTitleStyled>}
                        secondary={
                          <Box display="flex" alignItems="center">
                            {rymindrDetails.attachment.length > 0
                              ? rymindrDetails.attachment.map((file, index) => {
                                  if (file.image_name != undefined) {
                                    const extension_arr = file.image_name.split('.');
                                    const extension = extension_arr[1];
                                    const imagePath = 'https://rymindrapi.com/RymindrApi/public/attachment';

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
                                          Image
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
                                            Audio
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
                                            Video
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
                                            Document
                                          </a>
                                        </TypoStyled>
                                      );
                                    } else {
                                      return (
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a href={file.file_name} target="_blank">
                                            <Description className={classes.iconAttach} />
                                            Document
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
                  ) : null}

                  {rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1 ? null : (
                    <Divider variant="inset" component="li" />
                  )}
                  {rymindrDetails.rymindr_type == 'Holiday' && rymindrDetails.is_bank_holiday == 1 ? null : (
                    <Comments type="rymindr" postId={rymindrDetails.rymindr_id} postUserId={rymindrDetails.user_id} />
                  )}
                </ListStyled>
              </Paper>

              <Dialog
                open={openImage}
                onClose={handleCloseImageModal}
                aria-labelledby="form-dialog-title"
                maxWidth="xl"
              >
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
              {/* STATUS POPUP */}
              <Dialog open={open} onClose={handleCloseModal} maxWidth="md" fullWidth>
                <DialogTitleStyled id="form-dialog-title">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex">
                      <TypoPopHeadStyled>Rymindr Status</TypoPopHeadStyled>
                      <TypoPopHeadStyled style={{ color: '#607383' }} className="ml-20">
                        Shared with {rymindrDetails.remainingCount > 0 ? rymindrDetails.remainingCount + users_list.length : users_list.length} contacts.
                      </TypoPopHeadStyled>
                    </Box>
                    <IconButton color="default" onClick={handleCloseModal}>
                      <Close />
                    </IconButton>
                  </Box>
                </DialogTitleStyled>
                <DialogContent id="scrollElement">
                  <List>
                    <div >
                      {console.log('state-', state)}
                      {console.log('ele1-',statusList)}
                      {state.map((element) => (
                        <ListItem alignItems="center">
                          <ListItemAvatar>
                            <AvatarShareStyled alt="semy Sharp" src={element.profile_image} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Box display="flex" justifyContent="space-between">
                                <Typography>{element.first_name + ' ' + element.last_name}</Typography>
                                <Box display="flex" justifyContent="center" alignItems="center">
                                  {element.is_status == 0 ? (
                                    <>
                                      <FiberManualRecord style={{ color: '#1773bf', fontSize: 14 }} />
                                      <TypoStatusStyled className="ml-20 mr-20">Pending</TypoStatusStyled>
                                    </>
                                  ) : element.is_status == 1 ? (
                                    <>
                                      <FiberManualRecord style={{ color: '#44b700', fontSize: 14 }} />
                                      <TypoStatusStyledAccept className="ml-20 mr-20">Accepted</TypoStatusStyledAccept>
                                    </>
                                  ) : (
                                    <>
                                      <FiberManualRecord style={{ color: '#FF0000', fontSize: 14 }} />
                                      <TypoStatusStyledReject className="ml-20 mr-20">Declined</TypoStatusStyledReject>
                                    </>
                                  )}
                                </Box>
                              </Box>
                            }
                          />
                        </ListItem>
                        // <Divider variant="inset" component="li" />
                      ))}
                    </div>
                  </List>
                </DialogContent>
              </Dialog>
              {/* STATUS POPUP */}
            </Grid>
          ) : (
            <Grid
              ref={measuredRef}
              item
              xs={12}
              md={8}
              className={classes.rightPanel}
              style={{ display: showPanel ? 'none' : 'block' }}
            >
              <PaperStyled>
                <Box className={classes.content}>
                  <CardMedia
                    className={classes.icon}
                    image={RymindrOriginal}
                    title="Upcoming Rymindr"
                    component="img"
                  />
                  <p>Loading...</p>
                </Box>
              </PaperStyled>
            </Grid>
          )
        ) : (
          <Grid
            ref={measuredRef}
            item
            xs={12}
            md={8}
            className={classes.rightPanel}
            style={{ display: showPanel ? 'none' : 'block' }}
          >
            <PaperStyled>
              <Box className={classes.content}>
                <CardMedia className={classes.icon} image={RymindrOriginal} title="Upcoming Rymindr" component="img" />
              </Box>
            </PaperStyled>
          </Grid>
        )}
      </Grid>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.rymidr.loading,
    error: state.rymidr.error,
    upcommingrymindr: state.rymidr.upcommingrymindr,
    rymindrDetails: state.rymidr.rymindrDetails,
    success_message: state.rymidr.success_message,
    qrImg: state.rymidr.qrImg,
    statusList: state.rymidr.statusList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUpcommingRymindrs: (data) => dispatch(getUpcommingRymindrs(data)),
    getRymidrDetails: (data) => dispatch(getRymidrDetails(data)),
    delete_rymindr2: (data) => dispatch(delete_rymindr2(data)),
    generateQrCodeDB: (data, history) => dispatch(generateQrCodeDB(data, history)),
    statusData: (dataTosend) => dispatch(statusData(dataTosend)),
  };
};

UpcomingRymindr.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getUpcommingRymindrs: PropTypes.func.isRequired,
  upcommingrymindr: PropTypes.any.isRequired,
  getRymidrDetails: PropTypes.func.isRequired,
  rymindrDetails: PropTypes.any.isRequired,
  delete_rymindr2: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
  generateQrCodeDB: PropTypes.func.isRequired,
  qrImg: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(UpcomingRymindr));
