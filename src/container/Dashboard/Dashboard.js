import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  StepButton
} from '@material-ui/core'

import React, { useEffect, useState, useMemo } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import FullscreenSpinner from '../../component/FullscreenSpinner'
import { Link } from 'react-router-dom'
import NewMessage from './NewMessage'
import PropTypes from 'prop-types'
import UpcommingRymindr from './UpcommingRymindr'

import { connect } from 'react-redux'
import { getUpcommingRymindrs } from '../../store/actions/dashboardActions'
import moment from 'moment'
import { withSnackbar } from 'notistack'
import { getRssFeeds } from '../../store/actions/messageCenterAction'
import VideoModal from '../Layout/VideoModal'
import { getUserDetails } from '../../store/actions/accountsettingAction'
import RymindrOriginal from '../../assets/images/rymindr_original.png';

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
  icon: {
    width: 150,
    marginBottom: 40
  },
  content: {
    textAlign: "center",
    textAlign: "-webkit-center",
    paddingTop: "15%"
  },
  contentArea: {
    height: "80vh",
    borderRadius: 15
  },
  notifyMeButton: {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    width: 200,
    cursor: 'auto',
    "&:hover": {
      backgroundColor: theme.palette.warning.main
    }
  },
  commingSoonDesc: {
    marginBottom: 20,
    fontSize: 14
  }
}))
const CardStyled = styled(Card)({
  background: 'transparent linear-gradient(114deg, #17BAFF 0%, #20A6FC 100%) 0% 0% no-repeat'
})

const TypoNameStyled = styled(Typography)({
  color: '#b3bcc3',
  fontWeight: 600
})

const TypoTimeStyled = styled(Typography)({
  color: '#b3bcc3',
  float: 'right'
})

const AvatarFeedStyled = styled(Avatar)({
  height: 'auto',
  width: '100%'
})

const TypoWeekStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: theme.palette.text.primary,
  textTransform: 'uppercase'
}))
const TypoDotStyled = styled(Typography)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: 8/2,
  backgroundColor: '#FF8A00',
  margin: 'auto',
  position: 'absolute',
  bottom: 18,
}))

const TypoHeadingStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  // textTransform: 'uppercase',
  fontWeight: 'bold'
}))

const TypoWeekDayStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: '#1773BF',
  fontWeight: 'bold',
  marginTop: 5
}))

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 20,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
  // marginBottom: 20
}))

const TypoRymdStyled = styled(Typography)(({ theme }) => ({
  fontSize: 16,
  color: '#FF8A00',
  fontWeight: 'bold',
  position: 'absolute',
  bottom: 10,
  marginLeft: -42
}))

const WeekBoxStyled = styled(Box)(({ theme }) => ({
  width: '14%',
  borderRadius: 10,
  padding: '10px 0',
  marginBottom: 40,
  '&.active': {
    background: theme.palette.primary.main,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    '& p': {
      color: '#fff'
    }
  }
}))

const CardPaperStyled = styled(Card)(({ theme }) => ({
  height: '100%'
}))


const Dashboard = (props) => {
  const { business_code, user_id, first_login ,sc_bessi_name} = JSON.parse(localStorage.getItem('userData'))
  const { getUpcommingRymindrs, dashupcomingrymindr, TodayCount, enqueueSnackbar, error, loading, rssFeedsList, getUserDetails, userdetails } = props
  const classes = useStyles()
  const [feeds, setFeeds] = useState('')

  useEffect(() => {
    // window.notification();
    getUserDetails({ user_id })
  }, [])


  const [qrCode, setQrCode] = React.useState('')
  const [qrCodeBase64, setQrCodeBase64] = React.useState('')
  const [businessCode, setBusinessCode] = React.useState('')

  const { user_qr_code_base64 = '' } = ''

  //const { sc_bessi_name = '' } = ''

  useEffect(() => {



    console.log('========',JSON.parse(localStorage.getItem('userData')));
    const dataTosend = {
      user_id
    }
    getUpcommingRymindrs(dataTosend)
    props.getRssFeeds(dataTosend)

  }, [])

  useEffect(() => {
    setFeeds(rssFeedsList)
  }, [rssFeedsList])

  // useEffect(() => {
  //   let mounted = true
  //   setTimeout(function(){
  //     if(mounted){
  //       console.log('error====',error);
  //       error && enqueueSnackbar(error, { variant: 'error' })
  //     }
  //   },0)
  //   return function cleanup() {
  //       mounted = false
  //   }
  // }, [error])

  // useMemo(() => {
  //   console.log('error====',error);
  //   error && enqueueSnackbar(error, { variant: 'error' })
  // }, [error]) 

  const TodayRymindrCount = dashupcomingrymindr.dashupcomingrymindr.filter((word) => word.rymindr_date === moment().format('YYYY-MM-DD'))
    .length
  const dashboard_feeds = feeds.slice(0, 3)

  // console.warn('dashboard_feedsdr1234', dashboard_feeds);

  return (
    <>
      <Grid className="hello" container spacing={3} alignItems='stretch'>
        {/* <FullscreenSpinner open={loading} /> */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={6}>

              <Link to='/create-rymindr'>

                <CardStyled className='infoCard'>
                <StepButton className='dashboardtopBtn' >
                  <CardHeader
                    title={<img src={require('../../assets/images/rymindr_hand_1.png')} className='info-box-icon' />}
                  />
                  <CardContent>
                  <Grid container spacing={0}>
                      <Grid item xs={11}>
                        <Typography className='info-box-txt'>CREATE RYMINDR</Typography>
                      </Grid>
                      <Grid item xs={1} className='info-box-caret'>
                        <ArrowForwardIosIcon style={{ fontSize: 16 }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                  </StepButton>
              </CardStyled>

              </Link>

            </Grid>
            <Grid item xs={6}>
              <Link to='/direct-message'>
                <CardStyled className='infoCard'>
                <StepButton className='dashboardtopBtn' >
                  <CardHeader title={<img src={require('../../assets/images/chat.svg')} className='info-box-icon' />} />
                  <CardContent>
                    <Grid container spacing={0}>
                      <Grid item xs={11}>
                        <Typography className='info-box-txt'>CREATE MESSAGES</Typography>
                      </Grid>
                      <Grid item xs={1} className='info-box-caret'>
                        <ArrowForwardIosIcon style={{ fontSize: 16 }} />
                      </Grid>
                    </Grid>
                  </CardContent>
                  </StepButton>
              </CardStyled>
              </Link>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper className={classes.paper}>
            <Grid
              container
              spacing={1}
              direction='row'
              justify='space-between'
              alignItems='center'
              style={{ marginBottom: 30 }}
            >
              <Grid container item xs={6} spacing={3}>
                <TypoHeadingStyled component='span' className='ml-20'>
                  {moment().format('MMMM')}
                </TypoHeadingStyled>
              </Grid>
              <Grid container item xs={6} spacing={3} justify='flex-end'>
              <Link to={'/calendar/'}>
                <Button >

                Go to Calendar


                </Button>
                </Link>
              </Grid>
            </Grid>

            <Grid container spacing={1} direction='row' justify='space-between' alignItems='center'>
              <Grid container item spacing={3} justify='center'>
                {[...Array(7)].map((u, i) => {
                  const weekday = moment().weekday()
                 if (weekday === i + 1) {
                    return (
                      <WeekBoxStyled className='active'>
                        {/* <TypoTodayStyled component="span">Today</TypoTodayStyled> */}
                        <TypoWeekStyled>
                          {moment()
                            .day(i + 1)
                            .format('ddd')}
                        </TypoWeekStyled>
                        <TypoWeekDayStyled>
                          {moment()
                            .day(i + 1)
                            .format('DD')}
                        </TypoWeekDayStyled>
                        <TypoRymdStyled component='span'>{TodayRymindrCount} Rymindrs</TypoRymdStyled>
                      </WeekBoxStyled>
                    )
                 } else {
                    return (
                      <WeekBoxStyled key={i}>
                        <TypoWeekStyled>
                          {moment()
                            .day(i + 1)
                            .format('ddd')}
                        </TypoWeekStyled>
                        <TypoWeekDayStyled>
                          {moment()
                            .day(i + 1)
                            .format('DD')}
                        </TypoWeekDayStyled>
                        {
                          dashupcomingrymindr.dashupcomingrymindr.map((word)=> 
                            {
                                return (
                                  ( word.rymindr_date && moment().day(i + 1).format('YYYY-MM-DD') == word.rymindr_date) ? 
                                    <TypoDotStyled style={{backgroundColor: '#FF8A00'}} component='span'></TypoDotStyled>
                                  :
                                    null
                                )
                            })
                          }
                            {/* <TypoDotStyled style={{backgroundColor: TodayRymindrCount.length == 0 ? '' : '#FF8A00'}} component='span'></TypoDotStyled> */}
                        
                      </WeekBoxStyled>
                    )
                 }
                })}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid className='dashboardCard' item xs={12} md={6}>
          <UpcommingRymindr data={dashupcomingrymindr.dashupcomingrymindr} />
        </Grid>

        <Grid className='dashboardCard' item xs={12} md={6}>
          <NewMessage data={[]} />
        </Grid>

        <Grid className='dashboardCard2' item xs={12} md={6}>
          <CardPaperStyled>
            <CardHeader

              title={<TypoHeadingStyled component='span'>Live Feed</TypoHeadingStyled>}
              action={<Link to='/live-feed'><Button>View all</Button></Link>}
              className='cardHeader dash-card-head'
            />
            <CardContent>
              <List className={classes.root}>

                {(dashboard_feeds) && dashboard_feeds.map((feed, index) => {
                  return <ListItem alignItems='flex-start' className="dash-feed-item">
                    <ListItemAvatar className="dash-feed-fig">
                      <AvatarFeedStyled
                        alt='semy Sharp'
                        variant='rounded'
                        src={(feed.logo) ? feed.logo : ''}
                      />
                    </ListItemAvatar>
                    <ListItemText className="dash-feed-cont"
                      primary={feed.title}
                      secondary={<img src={(feed.logo) ? feed.logo : ''} style={{ marginTop: 6 }} width='20' height='20' />}
                    />
				           <Box className="dash-feed-date"><strong>Posted on:</strong> <span>{feed.postDate} | {feed.time}</span></Box>
                  </ListItem>
                })
                }

              </List>
            </CardContent>
          </CardPaperStyled>
        </Grid>

        <Grid className='dashboardCard2' item xs={12} md={6}>
          <CardPaperStyled>
            <CardHeader
              title={<TypoHeadingStyled component='span'>Rymindr news</TypoHeadingStyled>}
              // action={<Button>View all</Button>}
              className='cardHeader dash-card-head'
            />
            <CardContent>
              <List className={classes.root}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <AvatarFeedStyled
                      alt='semy Sharp'
                      variant='rounded'
                      src={require('../../assets/images/logo_r.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TypoHeadStyled variant='h5'>
                          COMING SOON
                      </TypoHeadStyled>
                    }
                    secondary={
                      <Typography className='multi-line-ellipsis' variant='body1'>
                        We'll be launching Rymindr news soon to keep you updated on exciting things Rymindr is working on.  
                        Keep an eye out, this is exciting!
                      </Typography>
                    }
                  />
                </ListItem>
              </List>
              {/* <List className={classes.root}>
                <ListItem alignItems='flex-start'>
                  <ListItemAvatar>
                    <AvatarFeedStyled
                      alt='semy Sharp'
                      variant='rounded'
                      src={require('../../assets/images/rymindrnews.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TypoNameStyled variant='body2' component='span'>
                        Message Subject
                      </TypoNameStyled>
                    }
                    secondary={
                      <Typography className='multi-line-ellipsis' variant='body1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut eni…
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem alignItems='flex-start'> 
                  <ListItemAvatar>
                    <AvatarFeedStyled
                      alt='semy Sharp'
                      variant='rounded'
                      src={require('../../assets/images/rymindrnews.png')}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <TypoNameStyled variant='body2' component='span'>
                        Message Subject
                      </TypoNameStyled>
                    }
                    secondary={
                      <Typography variant='body1'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut eni…
                      </Typography>
                    }
                  />
                  </ListItem>
              </List> */}
            </CardContent>
          </CardPaperStyled>
        </Grid>

        {
          (first_login && first_login == 1)
            ? <VideoModal businessCode={business_code} qrCode={user_qr_code_base64} businessName={sc_bessi_name} userdetails={userdetails} /> : ''
        }
      </Grid>



    </>
  )
};
const mapStateToProps = (state) => {
  return {
    loading: state.dashboard.loading,
    error: state.dashboard.error,
    dashupcomingrymindr: state.dashboard,
    TodayCount: state.dashboard.TodayCount,
    rssFeedsList: state.messageCenterReducer.rssFeedsList,
    userdetails: state.account.userdetails
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUpcommingRymindrs: (data) => dispatch(getUpcommingRymindrs(data)),
    getRssFeeds: (data) => dispatch(getRssFeeds(data)),
    getUserDetails: (data) => dispatch(getUserDetails(data)),
  }
};

Dashboard.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getUpcommingRymindrs: PropTypes.func.isRequired,
  dashupcomingrymindr: PropTypes.any.isRequired,
  TodayCount: PropTypes.any.isRequired,
  userdetails: PropTypes.any.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Dashboard))
