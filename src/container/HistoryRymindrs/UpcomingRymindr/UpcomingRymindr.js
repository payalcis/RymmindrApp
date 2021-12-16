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

import RymindrOriginal from '../../../assets/images/rymindr_original.png';
import React, { useEffect, useMemo, useState } from 'react';
import {
  delete_rymindr,
  getRymidrDetails,
  getUpcomingRymindrs,
  getHistoryRymindrs,
  clearRymindrHistory,
} from '../../../store/actions/rymidr';
import { makeStyles, styled, withStyles } from '@material-ui/core/styles';
import FullscreenSpinner from '../../../component/FullscreenSpinner';
import ResponsiveDialog from './Modal/RymindrModalDelete';
import ResponsiveDialogHistory from './Modal/RymindrModalDeleteHistory';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import parse from 'html-react-parser';
import CircularSpinner from '../../../component/CircularSpinner/index';
import Comments from '../../../container/Comments/Comments';

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
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important',
    },
  },
  icon: {
    width: 150,
    marginBottom: 40,
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
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  padding: 30,
  height: 100 + '%',
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

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none',
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
}));

const options = ['None', 'Atria', 'Callisto', 'Dione', 'Ganymede'];

const UpcomingRymindr = (props) => {
  const history = useHistory();
  const {
    enqueueSnackbar,
    error,
    //getUpcommingRymindrs,
    getHistoryRymindrs,
    //upcommingrymindr,
    historyrymindr,
    loading,
    getRymidrDetails,
    rymindrDetails,
    delete_rymindr,
    clearRymindrHistory,
    success_message,
    clear_history,
  } = props;
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'));
  const [showPanel, setShowPanel] = useState(true);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleterymindr, setDeleterymindr] = useState(null);

  const [openDeleteHistory, setOpenDeleteHistory] = useState(false);
  const [clearHistory, setClearHistory] = useState(null);
  const [clearHistoryId, setClearHistoryId] = useState(null);

  const [selectedItem, setSelectedItem] = useState(null);
  const [detailLoader, setDetailLoader] = useState(false);
  const [listLoader, setListLoader] = useState(false);
  const [openImage, setOpenImage] = React.useState(false);
  const [upcomingRymindrHistory, setUpcomingRymindrHistory] = useState([]);
  const [remindersIds, setRemindersIds] = useState(null);

  const [selectedImage, setSelectedImage] = React.useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseImageModal = () => {
    setOpenImage(false);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleCloseHistory = () => {
    setOpenDeleteHistory(false);
  };

  const handleShowDetail = (id) => {
    const dataTosend = {
      user_id,
      rymindr_id: id,
      is_page: 'history',
    };
    getRymidrDetails(dataTosend);
    setShowPanel(false);
  };

  const handleHideDetail = () => {
    setShowPanel(true);
  };
  const fatchRymidrDetails = (id) => {
    console.log('idididididididid=', id);
    const dataTosend = {
      user_id,
      rymindr_id: id,
      is_page: 'history',
    };
    setSelectedItem(id);
    getRymidrDetails(dataTosend);
    setDetailLoader(true);
  };

  const handleDelete = (recr_rymindr_id, rymindr_id, qiscus_id) => {
    setOpenDelete(true);
    let getIndex = upcomingRymindrHistory.findIndex((x) => x.rymindr_id == rymindr_id);
    let upcoming = upcomingRymindrHistory[0].rymindr_id;
    if (upcomingRymindrHistory[getIndex + 1]) {
      upcoming = upcomingRymindrHistory[getIndex + 1].rymindr_id;
    }
    const setdata = {
      recr_rymindr_id: recr_rymindr_id,
      rymindr_id,
      upcoming,
      user_id,
      user_name: first_name + ' ' + last_name,
      qiscus_id,
    };

    setDeleterymindr(setdata);
  };
  const handleClickImageOpen = (file) => {
    console.log(file);
    setOpenImage(true);
    setSelectedImage(file);
  };
  const deleteRymindr = () => {
    setListLoader(true);
    setDetailLoader(true);
    delete_rymindr(deleterymindr);
    setOpenDelete(false);
  };

  const [width, setWidth] = React.useState(0);
  const measuredRef = React.useCallback((node) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  // useMemo(() => {
  //   success_message && enqueueSnackbar(success_message, { variant: 'success' });
  // }, [success_message]);

  useEffect(() => {
    console.log('success_message======', success_message);
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

  const classes = useStyles();

  useEffect(() => {
    const dataToSend = {
      user_id,
    };
    if (props.location.state && props.location.state.post_id) {
      console.log('props.location.state.post_id===', props.location.state.post_id);
      dataToSend.selected_id = props.location.state.post_id;
    }
    setListLoader(true);
    getHistoryRymindrs(dataToSend);
  }, []);

  useEffect(() => {
    setDetailLoader(false);
  }, [rymindrDetails]);

  useEffect(() => {
    if (historyrymindr) {
      if (historyrymindr.rymindr_id) {
        setRemindersIds(historyrymindr.rymindr_id);
      }

      setUpcomingRymindrHistory(historyrymindr.upcomingList);
      setListLoader(false);
    }
  }, [historyrymindr]);

  const handlesearch = (e) => {
    const searchStr = e.target.value;
    if (searchStr.length > 1) {
      const filteredList = historyrymindr.upcomingList.filter(
        (obj) =>
          obj.category_name.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.rymindr_type.toLowerCase().includes(searchStr.toLowerCase()) ||
          obj.rymindr_date.toLowerCase().includes(searchStr.toLowerCase()) ||
          (obj.note !== null ? obj.note.toLowerCase().includes(searchStr.toLowerCase()) : null)
      );
      setUpcomingRymindrHistory(filteredList);
    } else {
      setUpcomingRymindrHistory(historyrymindr.upcomingList);
    }
  };
  // useEffect(() => {
  //   if(props.location.state && props.location.state.post_id){
  //     console.log('props.location.state.post_id===',props.location.state.post_id);
  //     const dataTosend = {
  //       user_id,
  //       rymindr_id: props.location.state.post_id,
  //       is_page:"history"
  //     };
  //     setSelectedItem(props.location.state.post_id);
  //     getRymidrDetails(dataTosend);
  //   }
  // }, [historyrymindr]);

  useMemo(() => {
    error && enqueueSnackbar(error, { variant: 'error' });
  }, [error]);

  const clearHistoryFn = (rymindr_ids) => {
    console.log('rymindr_ids====', rymindr_ids);

    setClearHistoryId(rymindr_ids);
    setOpenDeleteHistory(true);
  };

  const clearHistoryFn1 = () => {
    setOpenDeleteHistory(false);

    // alert(clearHistoryId+'=idddsss');
    const dataTosend = {
      user_id,
      rymindr_id: clearHistoryId, //rymindr_ids,
    };
    clearRymindrHistory(dataTosend);
    // const timer = setTimeout(() => {
    //   history.push('/history-rymindrs');
    // }, 1500);
    // return () => clearTimeout(timer);
  };

  const Rymindrlist =
    upcomingRymindrHistory && upcomingRymindrHistory.length > 0 ? (
      upcomingRymindrHistory.map((item, index) => (
        <>
          <Hidden mdUp implementation="css">
            <ListItemStyled
              key={item.rymindr_id}
              button
              onClick={() => handleShowDetail(item.rymindr_id)}
              // selected={selectedItem ? selectedItem === item.rymindr_id : rymindrDetails.rymindr_id === item.rymindr_id}
              // selected={rymindrDetails.rymindr_id === item.rymindr_id}
              selected={
                rymindrDetails && rymindrDetails.rymindr_id ? rymindrDetails.rymindr_id === item.rymindr_id : false
              }
            >
              <ListItemAvatar>
                <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
              </ListItemAvatar>
              <ListItemText
                primary={item.rymindr_type}
                secondary={
                  <TypoListSubtext>
                    {`${moment(item.rymindr_date).format('dddd DD MMMM YYYY')}  | ${moment(
                      item.rymindr_date + ' ' + item.rymindr_time
                    ).format('LT')}`}
                  </TypoListSubtext>
                }
              />
            </ListItemStyled>
            <Divider variant="inset" component="li" />
          </Hidden>

          <Hidden smDown implementation="css">
            <ListItemStyled
              key={item.rymindr_id}
              button
              onClick={() => fatchRymidrDetails(item.rymindr_id)}
              // selected={selectedItem ? selectedItem === item.rymindr_id : rymindrDetails.rymindr_id === item.rymindr_id}
              selected={
                rymindrDetails && rymindrDetails.rymindr_id ? rymindrDetails.rymindr_id === item.rymindr_id : false
              }
            >
              <ListItemAvatar>
                <AvatarShareStyled alt="semy Sharp" src={item.category_image} />
              </ListItemAvatar>
              <ListItemText
                //primary={item.rymindr_type}
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
            </ListItemStyled>
            <Divider variant="inset" component="li" />
          </Hidden>
        </>
      ))
    ) : (
      <p style={{ marginTop: '1rem' }}> No Record Found</p>
    );

  const clearButton =
    upcomingRymindrHistory && upcomingRymindrHistory.length > 0 ? (
      <Button
        variant="contained"
        color="inherit"
        size="large"
        onClick={() => clearHistoryFn(remindersIds)}
        //startIcon={<img src={require('../../../assets/images/chat.svg')} style={{ height: 20, width: 20 }} />}
      >
        CLEAR HISTORY
      </Button>
    ) : (
      ''
    );

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        {/* <FullscreenSpinner open={loading} /> */}
        <ResponsiveDialog open={openDelete} handleClose={handleClose} deleteRymindr={deleteRymindr} />
        <ResponsiveDialogHistory
          open={openDeleteHistory}
          handleCloseHistory={handleCloseHistory}
          clearHistory={clearHistoryFn1}
        />
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
              Rymindr <TypoHeadInnerStyled component="span">History</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
        {/*<Grid item xs={5}>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              color="inherit"
              size="large"
              //onClick={() => clearHistory(historyrymindr.message)}
              //startIcon={<img src={require('../../../assets/images/chat.svg')} style={{ height: 20, width: 20 }} />}
            >
              CLEAR HISTORY
            </Button> 
          </Box>
            </Grid> */}
      </Grid>

      <Grid className="main-wrap-body history-cont-wrap" container alignItems="stretch">
        {showPanel ? (
          <Grid item xs={12} md={4} className="pr-25 box-wrapper leftSide-cont">
            <Paper className={classes.paper}>
              {/* <SearchFieldStyled
                id="input-with-icon-textfield"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              /> */}

              <SearchFieldStyled
                placeholder="Search Rymindr"
                id="input-with-icon-textfield"
                variant="outlined"
                fullWidth
                size="small"
                onKeyUp={handlesearch}
                //defaultValue={param !== undefined ? param : ''}
                autoComplete="off"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />

              {clearButton}
              {listLoader ? <CircularSpinner /> : <List>{Rymindrlist}</List>}
            </Paper>
          </Grid>
        ) : null}

        {console.log('rymindrDetailsH - ', rymindrDetails)}
        {rymindrDetails != null ? (
          rymindrDetails ? (
            <Grid
              item
              xs={12}
              md={8}
              className={clsx(classes.rightPanel, 'rightSide-cont')}
              style={{ display: showPanel ? 'none' : 'block' }}
            >
              <Paper className={classes.paper}>
                {/* {detailLoader && <CircularSpinner />} */}

                {detailLoader ? (
                  <CircularSpinner />
                ) : (
                  <>
                    <GridStyled container alignItems="center">
                      <Grid xs={6}>
                        <BoxStyled alignItems="center">
                          <AvatarShareStyled alt="semy Sharp" src={rymindrDetails.category_image} />
                          <Typography noWrap>
                            <Box fontWeight="fontWeightBold" m={1}>
                              {rymindrDetails.rymindr_type}
                            </Box>
                          </Typography>
                        </BoxStyled>
                      </Grid>
                      <Grid xs={6}>
                        <Box display="flex" justifyContent="flex-end">
                          {/* <ButtonPlain disableRipple startIcon={<Edit style={{ color: '#1872c0' }} />}>
                      Edit
                    </ButtonPlain> */}
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
                        {rymindrDetails.qr_code && (
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
                            <Box display="flex" alignItems="center" className="qrcode">
                              <BoxImgStyled justifyContent="center" className="qrcode-icon">
                                <AvatarStyled
                                  alt="semy Sharp"
                                  variant="square"
                                  src={require('../../../assets/images/qr.png')}
                                />
                                <TypoTitleStyled>QR Code</TypoTitleStyled>
                              </BoxImgStyled>
                              <img alt="semy Sharp" src={rymindrDetails.qr_code} style={{ height: 50, width: 50 }} />
                            </Box>
                          </BoxColorStyled>
                        )}
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

                        {rymindrDetails && rymindrDetails.note && (
                          <ListItemText
                            primary={<TypoTitleStyled>About</TypoTitleStyled>}
                            secondary={<Typography>{parse(rymindrDetails.note)}</Typography>}
                          />
                        )}
                      </ListItem>
                      {rymindrDetails.user_list.length > 0 ? (
                        <>
                          <Divider variant="inset" component="li" />
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
                                  <Box display="flex" justifyContent="space-between">
                                    <BoxStyled>
                                      {rymindrDetails &&
                                        rymindrDetails.user_list &&
                                        rymindrDetails.user_list.map((record) => (
                                          <Box mr={3}>
                                            <StyledBadge
                                              overlap="circle"
                                              anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right',
                                              }}
                                              variant="dot"
                                            >
                                              <AvatarShareStyled
                                                key={record.user_id}
                                                alt="semy Sharp"
                                                src={record.profile_image}
                                              />
                                            </StyledBadge>
                                            {console.log('record-', record)}
                                          </Box>
                                        ))}
                                    </BoxStyled>

                                    {/* <Box>
                                <Button variant="outlined" color="primary">
                                  Status
                                </Button>
                              </Box> */}
                                  </Box>
                                }
                              />
                            </ListItem>
                          </Box>
                        </>
                      ) : null}
                      <Divider variant="inset" component="li" />

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
                            <Box display="flex"  alignItems="center">
                              {rymindrDetails.attachment.length > 0
                                ? rymindrDetails.attachment.map((file, index) => {
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
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <img
                                            src={file.file_name}
                                            className={classes.iconAttach}
                                            onClick={() => handleClickImageOpen(file.file_name)}
                                          />
                                          Image
                                        </TypoStyled>
                                      );
                                    } else if (extension == 'mp3') {
                                      return (
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a href={file.file_name} target="_blank">
                                            <Headset className={classes.iconAttach} />
                                            Audio
                                          </a>
                                        </TypoStyled>
                                      );
                                    } else if (extension == 'mp4') {
                                      return (
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a href={file.file_name} target="_blank">
                                            <Videocam className={classes.iconAttach} /> Video
                                          </a>
                                        </TypoStyled>
                                      );
                                    } else if (extension == 'doc' || extension == 'docx' || extension == 'pdf') {
                                      return (
                                        <TypoStyled variant="subtitle1" component="p" key={index}>
                                          <a href={file.file_name} target="_blank">
                                            <Description className={classes.iconAttach} /> Document
                                          </a>
                                        </TypoStyled>
                                      );
                                    }
                                  })
                                : 'No Attachments'}
                            </Box>
                          }
                        />
                      </ListItem>

                      <Divider variant="inset" component="li" />

                      <Comments
                        type="rymindr"
                        postId={rymindrDetails.rymindr_id}
                        postUserId={rymindrDetails.user_id}
                        Hide={true}
                      />

                      {console.log('rymindrDetails-', rymindrDetails)}

                      {/* <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <AvatarStyled
                          alt="semy Sharp"
                          variant="square"
                          src={require('../../../assets/images/comment.svg')}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<TypoTitleStyled>2 Comments</TypoTitleStyled>}
                        secondary={
                          <>
                            <Box display="flex">
                              <AvatarComntStyled
                                alt="semy Sharp"
                                src={require('../../../assets/images/profile.jpeg')}
                              />
                              <TextFieldStyled placeholder="Add Comment" multiline rows={3} />
                            </Box>

                            <Box display="flex" justifyContent="space-between">
                              <Box display="flex">
                                <AvatarComntStyled
                                  alt="semy Sharp"
                                  src={require('../../../assets/images/profile.jpeg')}
                                />
                                <Box>
                                  <TypoCmntName>
                                    John Doe
                                    <Box component="span">2 days ago</Box>
                                  </TypoCmntName>
                                  <TypoCmntTxt>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </TypoCmntTxt>
                                  <ButtonStyled startIcon={<ThumbUp />}>5</ButtonStyled>
                                  <ButtonStyled startIcon={<Message color="primary" />}>2 Replies</ButtonStyled>
                                </Box>
                              </Box>
                              <Box style={{ position: 'relative' }}>
                                <IconButton
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVert />
                                </IconButton>
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              className="mt-20"
                              style={{ marginLeft: 130 }}
                            >
                              <Box display="flex">
                                <AvatarComntStyled
                                  alt="semy Sharp"
                                  src={require('../../../assets/images/profile.jpeg')}
                                />
                                <Box>
                                  <TypoCmntName>
                                    John Doe
                                    <Box component="span">2 days ago</Box>
                                  </TypoCmntName>
                                  <TypoCmntTxt>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </TypoCmntTxt>
                                  <ButtonStyled startIcon={<ThumbUp />}>5</ButtonStyled>
                                </Box>
                              </Box>
                              <Box style={{ position: 'relative' }}>
                                <IconButton
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVert />
                                </IconButton>
                              </Box>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              className="mt-20"
                              style={{ marginLeft: 130 }}
                            >
                              <Box display="flex">
                                <AvatarComntStyled
                                  alt="semy Sharp"
                                  src={require('../../../assets/images/profile.jpeg')}
                                />
                                <Box>
                                  <TypoCmntName>
                                    John Doe
                                    <Box component="span">2 days ago</Box>
                                  </TypoCmntName>
                                  <TypoCmntTxt>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </TypoCmntTxt>
                                  <ButtonStyled startIcon={<ThumbUp />}>5</ButtonStyled>
                                </Box>
                              </Box>
                              <Box style={{ position: 'relative' }}>
                                <IconButton
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVert />
                                </IconButton>
                              </Box>
                            </Box>

                            <Box display="flex" justifyContent="space-between" className="mt-20">
                              <Box display="flex">
                                <AvatarComntStyled
                                  alt="semy Sharp"
                                  src={require('../../../assets/images/profile.jpeg')}
                                />
                                <Box>
                                  <TypoCmntName>
                                    John Doe
                                    <Box component="span">2 days ago</Box>
                                  </TypoCmntName>
                                  <TypoCmntTxt>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                  </TypoCmntTxt>
                                  <ButtonStyled startIcon={<ThumbUp />}>5</ButtonStyled>
                                  <ButtonStyled startIcon={<Message color="primary" />}>2 Replies</ButtonStyled>
                                </Box>
                              </Box>
                              <Box style={{ position: 'relative' }}>
                                <IconButton
                                  aria-label="more"
                                  aria-controls="long-menu"
                                  aria-haspopup="true"
                                  onClick={handleClick}
                                >
                                  <MoreVert />
                                </IconButton>
                              </Box>
                              <Menu
                                id="long-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={open}
                                onClose={handleClose1}
                                // PaperProps={{
                                //   style: {
                                //     maxHeight: ITEM_HEIGHT * 4.5,
                                //     width: '20ch',
                                //   },
                                // }}
                              >
                                {options.map((option) => (
                                  <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose1}>
                                    {option}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          </>
                        }
                      />
                    </ListItem> */}
                    </ListStyled>
                  </>
                )}
              </Paper>

              <Dialog
                open={openImage}
                onClose={handleCloseImageModal}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
                fullWidth
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
                  <img src={selectedImage} width="200" height="200" />
                </DialogContent>
              </Dialog>
            </Grid>
          ) : (
            <Box className={classes.content} style={{ margin: 'auto', textAlign: 'center' }}>
              <CardMedia className={classes.icon} image={RymindrOriginal} title="Message Center" component="img" />
              <Typography className={classes.commingSoonDesc}>Loading...</Typography>
            </Box>
          )
        ) : (
          <Grid item xs={12} md={8} className={clsx(classes.rightPanel, 'rightSide-cont')}>
            <Paper className={clsx(classes.paper2, 'sideBar-scroll')}>
              <Box className={classes.content} style={{ marginTop: '10rem' }}>
                <CardMedia
                  className={classes.icon}
                  image={RymindrOriginal}
                  title="Message Center"
                  component="img"
                  style={{ margin: 'auto', paddingBottom: '2rem' }}
                />
                <Typography className={classes.commingSoonDesc} style={{ textAlign: 'center' }}>
                  No record found.
                </Typography>
              </Box>
            </Paper>
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
    //upcommingrymindr: state.rymidr.upcommingrymindr,
    historyrymindr: state.rymidr.historyrymindr,
    rymindrDetails: state.rymidr.rymindrDetails,
    success_message: state.rymidr.success_message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //getUpcommingRymindrs: (data) => dispatch(getUpcommingRymindrs(data)),
    getHistoryRymindrs: (data) => dispatch(getHistoryRymindrs(data)),
    getRymidrDetails: (data) => dispatch(getRymidrDetails(data)),
    delete_rymindr: (data) => dispatch(delete_rymindr(data)),
    clearRymindrHistory: (data) => dispatch(clearRymindrHistory(data)),
  };
};

UpcomingRymindr.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  //getUpcommingRymindrs: PropTypes.func.isRequired,
  getHistoryRymindrs: PropTypes.func.isRequired,
  //upcommingrymindr: PropTypes.any.isRequired,
  historyrymindr: PropTypes.any.isRequired,
  getRymidrDetails: PropTypes.func.isRequired,
  rymindrDetails: PropTypes.any.isRequired,
  delete_rymindr: PropTypes.func.isRequired,
  clearRymindrHistory: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(UpcomingRymindr));
