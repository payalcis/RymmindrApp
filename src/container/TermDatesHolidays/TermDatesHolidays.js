import React, { useEffect, useMemo, useState } from 'react'

import { makeStyles, styled, withStyles } from '@material-ui/core/styles'
// import { Box, Button, Divider, InputAdornment, TextField, IconButton, Hidden, Menu, MenuItem } from '@material-ui/core'
import { Box, Button, Divider, InputAdornment, TextField, IconButton, Hidden, MenuItem, Badge, Menu, Dialog, DialogContent, DialogTitle, AppBar, Tabs, Tab, CardMedia } from '@material-ui/core'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Comment, Delete, Edit, ArrowBack, ThumbUp, Message, MoreVert, Print, Close, FiberManualRecord, Check } from '@material-ui/icons'
import AddNewTermModal from './AddNewTermModal'
import AddNewHolidayModal from './AddNewHolidayModal'
import { Link, useHistory, useParams } from 'react-router-dom'
import { connect, useDispatch } from 'react-redux'
import moment from 'moment'
import { withSnackbar } from 'notistack'
import PropTypes from 'prop-types'
import axios from 'axios'
import clsx from 'clsx'
import Axios from '../../helper/axios'
import Comments from '../../container/Comments/Comments'
import Deleteevent from './Modal/BookingModelDelete'
import Editterm from './Modal/TermModelEdit'
import RymindrOriginal from '../../assets/images/rymindr_original.png';
import io from 'socket.io-client';
import {
  SuccessTerm
  ,
  createTerm,
  getUpcommingTerm, delete_term
} from '../../store/actions/bookterm'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={'simple-tabpanel-${index}'}
      aria-labelledby={'simple-tab-${index}'}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

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
  },
  icon: {
    width: 150,
    marginBottom: 40
  },
  content: {
    textAlign: "center",
    textAlign: "-webkit-center",
    paddingTop: "15%",
    height: "80vh",
  },
  typoRymindrStatus: {
    textAlign: 'left',
    marginLeft: 60,
    color: '#4f4f4f'
  },
  eventIcon: {
    width: 100,
    height: 'auto'
  }
}))

const options = ['Edit', 'Delete']

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

const TypoTabHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
  marginRight: 10,
  marginLeft: 10
}))

const TypoContentStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary
}))

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
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

const AvatarComntStyled = styled(Avatar)({
  height: 42,
  width: 42,
  marginRight: 20
})

const TypoCmntName = styled(Typography)({
  color: '#757575',
  fontWeight: 'bold',
  fontSize: 12,
  '& span': {
    fontWeight: 'normal', marginLeft: 20
  }
})

const TypoCmntTxt = styled(Typography)({
  color: '#3d3d3d',
  fontSize: 14
})

const ButtonStyled = styled(Button)({
  color: '#757575',
  fontSize: 12
})

const TextFieldStyled = styled(TextField)({
  textAlign: 'left', paddingBottom: 10
})

const ButtonPlain = styled(Button)(({ theme }) => ({
  color: '#98a5af',
  fontSize: 12,
  textTransform: 'capitalize',
  background: 'none',
  boxShadow: 'none'
}))

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
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))(Badge)

const TypoTimeStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.primary.main,
  fontWeight: 'bold'
}))

const TypoStatusStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: '#44b700'
}))
const TermDatesHolidays = (props) => {
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'))

  const {
    enqueueSnackbar,
    error,
    sucessEvent,
    success_message,
    SuccessTerm,
    bookTermlistdata,
    getUpcommingTerm,
    delete_term,
    loading,
  } = props

  const currencies = [
    {
      value: 'all',
      label: 'All'
    },
    {
      value: 'holiday',
      label: 'Holiday'
    },
    {
      value: 'term',
      label: 'Term'
    }

  ]
  const [userStatus, setUserStatus] = useState({})
  const [currency, setCurrency] = React.useState('all')
  const [eventId, setEventId] = React.useState(null)

  const [width, setWidth] = React.useState(0);
  const [width1, setWidth1] = React.useState(0);
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const measuredRef1 = React.useCallback(node => {
    if (node !== null) {
      setWidth1(node.getBoundingClientRect().width);
    }
  }, []);

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }

  const handleInputChange = (event, index, tabindex) => {
    setEventId(index)
    setSelectedIndex(index)
    async function fetchUserStatus (ID) {
      const result = await Axios().post('bookevent/termuserstatus', { event_id: ID })
      setUserStatus(result.data.data);
    }
    fetchUserStatus(index)

  }

  useEffect(() => {
    let mounted = true
    var sock = io("https://app.rymindr.com:8081");
    sock.on('term-status:App\\Events\\TermHolidayStatus', function (data){
      console.log('datadatadatadatadatadatadatadata=====',data);
        if (mounted) {
          if(eventId){
            async function fetchUserStatus (ID) {
              const result = await Axios().post('bookevent/termuserstatus', { event_id: ID })
              setUserStatus(result.data.data);
            }
            fetchUserStatus(eventId);
          }
        }
    })
    return function cleanup() {
        mounted = false
    }
  }, [eventId,bookTermlistdata])

  // useEffect(() => {
  //   let mounted = true
  //   setTimeout(function(){
  //     if(mounted){
  //       success_message && enqueueSnackbar(success_message, { variant: 'success' })
  //     }
  //   },0)
  //   return function cleanup() {
  //       mounted = false
  //   }
  // }, [success_message])
  useEffect(() => {

    getUpcommingTerm({ user_id })
    if (!loading) {
      SuccessTerm(false)
    }
  }, [])


  const [selectedIndex, setSelectedIndex] = React.useState(1)

  useEffect(() => {

    console.log('bookTermlistdata====',bookTermlistdata);
    if(bookTermlistdata && bookTermlistdata.length>0){
      if(eventId){
        let findEdited = bookTermlistdata.filter(a=>a.id==eventId);
        if(findEdited && findEdited.length>0 && findEdited[0]){
          setUserStatus(findEdited[0].userlist);
        }
      } else{
        setSelectedIndex(bookTermlistdata[0].id);
        setUserStatus(bookTermlistdata[0].userlist);
      }
    }
    
    // async function fetchUserStatus (ID) {
    //   const result = await Axios().post('bookevent/termuserstatus', { event_id: ID })
    //   setUserStatus(result.data.data)
    // }
    // if (bookTermlistdata && bookTermlistdata.length > 0) {
    //   setSelectedIndex(bookTermlistdata[0].id)
    //   fetchUserStatus(bookTermlistdata[0].id)
    // }
  }, [bookTermlistdata])

  

  const [value, setValue] = React.useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const [showPanel, setShowPanel] = useState(true)

  const handleShowDetail = () => {
    setShowPanel(false)
  }

  const handleHideDetail = () => {
    setShowPanel(true)
  }

  const classes = useStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const open1 = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose1 = () => {
    setAnchorEl(null)
  }

  const [openRymindr, setOpenRymindr] = useState(false)
  const [openTerm, setOpenTerm] = useState(false)

  const handleCloseRymindr = (newValue) => {
    // alert('main'+newValue);
    setOpenRymindr(newValue)
  }

  const handleCloseTerm = (newValue) => {
    // alert('main'+newValue);
    setOpenTerm(newValue)
  }

  const EdittermData = (data) => {
    console.log('EdittermDataEdittermDataEdittermDataEdittermDataEdittermData');
    // const newItem = Object.assign({}, deletebooklist,data);
    // setOpenDelete(false);
    getUpcommingTerm({ user_id })
    
    // delete_term(newItem);
  }

  const UpdateTermlist = (data) => {
    getUpcommingTerm({ user_id })
    // const newItem = Object.assign({}, deletebooklist,data);
    // setOpenDelete(false);
    // delete_term(newItem);
  }
  const UpdateHolidaylist = (data) => {
    getUpcommingTerm({ user_id })
    // const newItem = Object.assign({}, deletebooklist,data);
    // setOpenDelete(false);
    // delete_term(newItem);
  }

  const deleteRymindr = (data) => {
    const newItem = Object.assign({}, deletebooklist, data)
    // setOpenDelete(false);
    delete_term(newItem)
  }

  // const getSelectedRymindr =bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].id):(0)
  const handleedit1 = (data) => {
    setOpenTerm(true)
  }

  const [deletebooklist, setDeletebooklist] = useState(null)
  const handleDelete = (eventId, user_id) => {
    // setOpenDelete(true);
    setOpenRymindr(true)
    const setdata = {
      eventId,
      user_id
    }
    setDeletebooklist(setdata)
  }

  const getSelectedRymindr = ''

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  var chk_list_id = 0

  if (bookTermlistdata !== null) {

    if (eventId == null) {
      var chk_list_id = 0
    } else {
      var chk_list_id = bookTermlistdata.findIndex(p => p.id == eventId)
      if (chk_list_id == '-1') {
        chk_list_id = 0
      }
    }
  }

  const TabsStyles = styled(Tabs)(({ theme }) => ({
    borderBottom: '1px solid #ccc',
    '& span': {
      justifyContent: 'center'
    }
  }))

  const handleCloseModal = () => {
    setOpen(false)
  }

  const Rymindrlist =
bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata.filter(bookTermlistdata => (currency == 'all') ? (bookTermlistdata.id > 0) : (bookTermlistdata.type == currency)).map((item, index) => (
  <>
    <Hidden mdUp implementation='css'>
      <ListItem button onClick={handleShowDetail}>
        <ListItemAvatar>
        {
          item.type == 'term' ?
            <AvatarShareStyled alt='semy Sharp' src={require('../../assets/images/event_rymindr.png')} />
          :
            <AvatarShareStyled alt='semy Sharp' src={require('../../assets/images/holiday-1.png')} />
        }
        </ListItemAvatar>
        <ListItemText
          primary='Parent Evening'
          secondary={<TypoListSubtext>1 April 2020 to 30 April 2020</TypoListSubtext>}
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </Hidden>

    <Hidden smDown implementation='css'>
      <ListItem
        button selected={selectedIndex === item.id}
        onClick={event => handleInputChange(event, item.id)}
      >
        <ListItemAvatar>
          {
            item.type == 'term' ?
              <AvatarShareStyled alt='semy Sharp' src={item.category_image} />
            :
              <AvatarShareStyled alt='semy Sharp' src={item.category_image} />
          }
        </ListItemAvatar>
        <ListItemText
          primary={item.subject}
          secondary={
            <TypoListSubtext>{item.all_event}

            </TypoListSubtext>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </Hidden>
  </>

))) : 
<Typography className={classes.commingSoonDesc}>
    No records Found
</Typography>

  const Rymindrlist1 = DATA.map((item) => (
    <>
      <Hidden mdUp implementation='css'>
        <ListItem button onClick={handleShowDetail}>
          <ListItemAvatar>
          {
            item.type == 'term' ?
              <AvatarShareStyled alt='semy Sharp' src={require('../../assets/images/event_rymindr.png')} />
            :
              <AvatarShareStyled alt='semy Sharp' src={require('../../assets/images/holiday-1.png')} />
          }
          </ListItemAvatar>
          <ListItemText
            primary='Term 1'
            secondary={<TypoListSubtext>1 April 2020 to 30 April 2020</TypoListSubtext>}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>

      <Hidden smDown implementation='css'>
        <ListItem button>
          <ListItemAvatar>
          {
            item.type == 'term' ?
              <AvatarShareStyled alt='semy Sharp' src={require('../../assets/images/event_rymindr.png')} />
            :
              <AvatarShareStyled alt='semy Sharp' src={require('../../assets/images/holiday-1.png')} />
          }
          </ListItemAvatar>
          <ListItemText
            primary='Term 1'
            secondary={<TypoListSubtext>1 April 2020 to 30 April 2020</TypoListSubtext>}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>
    </>
  ))

  const compo =
      <Box width='50%'>
        <ListItem alignItems='flex-start' alignItems='center'>
          <ListItemAvatar>
            <AvatarStyled alt='semy Sharp' variant='square' src={require('../../assets/images/calendar_icon.png')} />
          </ListItemAvatar>
          <ListItemText
            primary={
              <Box display='flex'>
                <Box>
                  <TypoContentStyled>
                    {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].start_date) : '--'}
                  </TypoContentStyled>
                </Box>
                <Box className='mr-20 ml-20' >
                <TypoTabHeadStyled> -- </TypoTabHeadStyled>
                </Box>
                <Box>
                  <TypoContentStyled>
                    {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].event_end) : '--'}
                  </TypoContentStyled>
                </Box>
              </Box>
            }
          />
        </ListItem>
      </Box>;

  const StatusHead = userStatus !== null && userStatus.length > 0 ? (
      // <Tab label={userStatus[0].name} {...a11yProps(0)} />
      <Tab label={compo} {...a11yProps(0)} />
    ) :
    (
      <Tab label='No Data' {...a11yProps(0)} />
    )

  const StatusTab = userStatus[0] !== null && userStatus.length > 0 ? (
    <TabPanel value={value} index={0}>
{console.log('userStatus--',userStatus)}
      <Box display='flex' justifyContent='space-between' className='mt-20'>
          <Box width='50%'>
            <TypoContentStyled>
              Status: <Box fontWeight='bold' component='span'>  Total participants {userStatus[0] && userStatus[0].no_participants} </Box>
            </TypoContentStyled>
          </Box>
          <Box width='30%' />
          <Box justifyContent='center' />
        </Box>

      <List>
          {userStatus.map(premise => (
          <>
            <ListItem className='pl-0 pr-0' alignItems='center'>
              <ListItemAvatar>
                <AvatarShareStyled alt='semy Sharp' src={ premise.profile_image} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box display='flex' justifyContent='space-between'>
                    <Typography>{premise.name ? premise.name : premise.first_name+' '+ premise.last_name}</Typography>
                    {'1' === 'pending' ? (<Box display='flex' justifyContent='center' alignItems='center'>
                      <FiberManualRecord style={{ color: '#2ECD70', fontSize: 14 }} />
                      <TypoStatusStyled className='ml-20 mr-20'>Pending</TypoStatusStyled>
                      <TypoTimeStyled />
                    </Box>) : (<Box display='flex' justifyContent='center' alignItems='center'>
                                          <FiberManualRecord style={{ color: '#44b700', fontSize: 14 }} />
                                          <TypoStatusStyled className='ml-20 mr-20'>Delivered</TypoStatusStyled>

                    </Box>)}

                  </Box>
                }
              />
            </ListItem>
            <Divider variant='inset' component='li' />
          </>
        ))}

        </List>

    </TabPanel>

  ) : <p style={{textAlign : 'center'}}>No Term dates or Holidays added.</p>
   

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems='center'>

        <Deleteevent open={openRymindr} onClose={handleCloseRymindr} getRymindrListData={getSelectedRymindr} deleteRymindr={deleteRymindr} />

        <Grid className="head-left" item xs={5}>
          <Box display='flex' alignItems='center'>
            {showPanel
              ? null : <Hidden mdUp implementation='css'>
                <IconButton
                  color='inherit'
                  onClick={handleHideDetail}
                >
                  <ArrowBack />
                </IconButton>
              </Hidden>}
            <TypoHeadStyled variant='h4'>
              TERM DATES / <TypoHeadInnerStyled component='span'>HOLIDAYS</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
        <Grid className="head-right" item xs={7} >
          <Box display='flex' justifyContent='flex-end'>

            <AddNewTermModal UpdateTermlist={UpdateTermlist} />
            <AddNewHolidayModal UpdateHolidaylist={UpdateHolidaylist} />
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body terms-cont-wrap" container alignItems='stretch'>
        {showPanel
          ? <Grid item xs={12} md={4} className='pr-25 leftSide-cont'>
            <Paper className={clsx(classes.paper, "sideBar-scroll")}>
              <TextFieldStyled
                select
                value={currency}
                fullWidth
                size='small'
                onChange={handleChange}
                variant='outlined'
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                   {option.label}
                 </MenuItem>
                ))}
              </TextFieldStyled>

              <List>{Rymindrlist}</List>
            </Paper>
          </Grid>
          : null}

        <Grid item xs={12} md={8} className={clsx(classes.rightPanel, "rightSide-cont")} style={{ display: showPanel ? 'none' : 'block' }}>
          <Paper className={classes.paper}>
          {bookTermlistdata !== null && bookTermlistdata.length > 0 ?
            <>
              <GridStyled container alignItems='center'>
                <Grid xs={6}>
                  <BoxStyled alignItems='center'>
                    {
                      (bookTermlistdata[chk_list_id].type == 'term') ?
                        <AvatarShareStyled alt='semy Sharp' className='mr-0' src={bookTermlistdata[chk_list_id].category_image} />
                      :
                        <AvatarShareStyled alt='semy Sharp' className='mr-0' src={bookTermlistdata[chk_list_id].category_image} />
                    }
                    <Typography noWrap>
                      <Box fontWeight='fontWeightBold' m={1}>
                        {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].subject) : '--'}

                      </Box>
                    </Typography>
                  </BoxStyled>
                  <Typography className={classes.typoRymindrStatus}>

                  {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].rymindr_status) : '--'}

                    </Typography>
                </Grid>

                <Grid ref={measuredRef} xs={6}>
                {/* {Math.round(width)} ---
                {Math.round(width1)} */}
                  <Box display='flex' justifyContent='flex-end'>

                    <Editterm
                      open={openTerm} onClose={handleCloseTerm} getRymindrListData={bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id]) : '--'}

                      EdittermData={EdittermData}
                    />

                    <ButtonPlain
                      disableRipple startIcon={<Delete style={{ color: '#ec4d4b' }} />}

                      onClick={() =>
                        handleDelete(
                          bookTermlistdata[chk_list_id].id,
                          user_id
                        )}
                    >

                        Delete

                    </ButtonPlain>

                  </Box>
                </Grid>
              </GridStyled>

              <ListStyled>
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <AvatarStyled alt='semy Sharp' variant='square' src={require('../../assets/images/calendar_icon.png')} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box display='flex'>
                      <Box width='50%'>
                        <TypoTitleStyled>Start Date</TypoTitleStyled>
                        <TypoContentStyled>

                          {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].start_date) : '--'}

                        </TypoContentStyled>
                      </Box>
                      <Box>
                        <TypoTitleStyled>End Date</TypoTitleStyled>
                        <TypoContentStyled>

                          {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].event_end) : '--'}
                        </TypoContentStyled>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <AvatarStyled alt='semy Sharp' variant='square' src={require('../../assets/images/email.png')} />
                </ListItemAvatar>
                <ListItemText
                  primary={<TypoTitleStyled>Message</TypoTitleStyled>}
                  secondary={
                    <Typography>
                      {bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].message) : '--'}

                    </Typography>
                  }
                />
              </ListItem>
              <Divider variant='inset' component='li' />
              <ListItem alignItems='flex-start'>
                <ListItemAvatar>
                  <AvatarStyled alt='semy Sharp' variant='square' src={require('../../assets/images/user_icon.png')} />
                </ListItemAvatar>
                <ListItemText
                  primary={<TypoTitleStyled>Contacts</TypoTitleStyled>}
                  secondary={
                  //  <Box className='share-avatar-box' display='flex' justifyContent='space-between'>
                  //     <BoxStyled >
                  //       {bookTermlistdata !== null && bookTermlistdata.length > 0 && bookTermlistdata[chk_list_id].userlist && bookTermlistdata[chk_list_id].userlist.map((record) => (
                  //           <StyledBadge
                  //             ref={measuredRef1}
                  //             overlap='circle'
                  //             anchorOrigin={{
                  //               vertical: 'bottom',
                  //               horizontal: 'right'
                  //             }}
                  //             // variant='dot'
                  //             badgeContent={<Check style={{color: 'white', fontSize: 10}} />}
                  //           >
                  //             <AvatarShareStyled key={record !== null ? record.user_id : Math.random()} alt='semy Sharp' src={record !== null ? record.profile_image : ''} />
                  //           </StyledBadge>
                  //         ))}
                  //     </BoxStyled>
                  //     <Box><Button variant='outlined' color='primary' onClick={handleClickOpen}>Status</Button></Box>
                  //   </Box>
                  <Box className='share-avatar-box' display='flex' justifyContent='space-between'>
                      <BoxStyled >
                        {userStatus !== null && userStatus.length > 0 && userStatus.map((record) => (
                            <StyledBadge
                              ref={measuredRef1}
                              overlap='circle'
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right'
                              }}
                              // variant='dot'
                              badgeContent={<Check style={{color: 'white', fontSize: 10}} />}
                            >
                              <AvatarShareStyled key={record !== null ? record.user_id : Math.random()} alt='semy Sharp' src={record !== null ? record.profile_image : ''} />
                            </StyledBadge>
                          ))}
                      </BoxStyled>
                      <Box><Button variant='outlined' color='primary' onClick={handleClickOpen}>Status</Button></Box>
                    </Box>
                  }
                />
              </ListItem>

              <Divider variant='inset' component='li' />

              <Comments
                type='term'
                postId={bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].id) : '0'}
                postUserId={bookTermlistdata !== null && bookTermlistdata.length > 0 ? (bookTermlistdata[chk_list_id].user_id) : '0'}
              />

            </ListStyled>
            </>
          :
            <Box className={classes.content}>
              <CardMedia
                className={classes.icon}
                image={RymindrOriginal}
                title="Message Center"
                component="img"
              />
              <Typography className={classes.commingSoonDesc}>
              No record Found
              </Typography>
          </Box>
        }
          </Paper>
        </Grid>

        <Dialog open={open} onClose={handleCloseModal} aria-labelledby='form-dialog-title' maxWidth='md' fullWidth>
          <DialogTitleStyled id='form-dialog-title'>
            <Box display='flex' justifyContent='space-between' alignItems='center'>
               <TypoPopHeadStyled>View Contacts</TypoPopHeadStyled>
               <IconButton color='default' onClick={handleCloseModal}>
                <Close />
              </IconButton>
             </Box>
          </DialogTitleStyled>
          <DialogContent>

            <TabsStyles
               value={value} onChange={handleTabChange} indicatorColor='primary'
               textColor='primary'
               variant='fullWidth'
             >

               {StatusHead}

             </TabsStyles>

            {StatusTab}

          </DialogContent>
        </Dialog>

      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    loading: state.bookterm.loading,
    error: state.bookterm.error,
    SuccessTerm: state.bookterm.SuccessTerm,
    bookTermlistdata: state.bookterm.bookTermlistdata,
    success_message: state.bookterm.success_message
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    SuccessTerm: (data) => dispatch(SuccessTerm(false)),
    getUpcommingTerm: (data) => dispatch(getUpcommingTerm(data)),
    delete_term: (data) => dispatch(delete_term(data))

  }
}

TermDatesHolidays.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  bookTermlistdata: PropTypes.array.isRequired,
  SuccessTerm: PropTypes.func.isRequired,
  getUpcommingTerm: PropTypes.func.isRequired,
  delete_term: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(TermDatesHolidays))
