import React, { useState, useEffect } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Box, Button, Divider, InputAdornment, TextField, IconButton, Hidden, FormControlLabel } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import clsx from 'clsx'
import { Comment, Delete, Edit, Search, ArrowBack, Attachment, Headset, Image, Videocam, Description } from '@material-ui/icons'
import { getRssFeeds } from '../../store/actions/messageCenterAction'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
    height: 100 + '%',
    overflow: 'auto',
    paddingBottom: 20
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important'
    }
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
    marginRight: '10px'
  },

}))
function LiveFeed (props) {
  const [showPanel, setShowPanel] = useState(true)

  const {
    error,
    rssFeedsList
  } = props

  const [showParticularFeed, setParticularFeed] = useState(rssFeedsList)

  const [selectedItem, setSelectedItem] = useState('')

  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    const dataToSend = { user_id }
    props.getRssFeeds(dataToSend)
  }, [])

  const showMessageDetailsOnInit = () => {
    if (rssFeedsList.length > 0) {
      handleShowDetailRight(rssFeedsList[0].title)
      setSelectedItem(rssFeedsList[0].title)
    }
  }

  useEffect(() => {
    setParticularFeed(rssFeedsList)
    showMessageDetailsOnInit()
  }, [rssFeedsList])

  const handleShowDetail = (title) => {
    setShowPanel(false)
    const found_particular_feed = showParticularFeed.find(element => element.title == title)
    // console.log('found_particular_feed', found_particular_feed)
    if (found_particular_feed) {
      setParticularFeed({ ...found_particular_feed })
      setSelectedItem(title)
    }
  }

  const handleShowDetailRight = (title) => {
    // alert('show-right--'+title);
    // console.log('showParticularFeed---RIGHT----', rssFeedsList);
    const found_particular_feed = rssFeedsList.find(element => element.title == title)
    if (found_particular_feed) {
      setParticularFeed({ ...found_particular_feed })
      setSelectedItem(title)
    }
  }

  const handleHideDetail = () => {
    setShowPanel(true)
  }

  const classes = useStyles()
  const TypoHeadStyled = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }))

  const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
    color: theme.palette.text.primary
  }))

  const TypoStyled = styled(Typography)(({ theme }) => ({
    fontSize: 16,
    color: theme.palette.text.primary,
    textAlign: 'left',
    marginBottom: 20
  }))

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const Rymindrlist = rssFeedsList.map((item) => (
    <>
      <Hidden mdUp implementation='css'>
        <ListItem
          button onClick={() => handleShowDetail(item.title)}
          selected={selectedItem ? selectedItem === item.title : rssFeedsList.title === item.title}
        >
          <ListItemText
            primary={item.title.substring(0, 35) + '...'}
            secondary={<img src={item.logo} style={{ height: 20 }} />}
          />

          {/* Posted on :{item.postDate} */}
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>

      <Hidden smDown implementation='css'>
        <ListItem
          button onClick={() => handleShowDetailRight(item.title)}
          selected={selectedItem ? selectedItem === item.title : rssFeedsList.title === item.title}
        >
          <ListItemText
            primary={item.title.substring(0, 35) + '...'}
            secondary={
              <>
                <img src={item.logo} style={{ height: 20 }} />
                <Typography component='p' variant='caption'>Posted on: {item.postDate} | {item.time} </Typography>
              </>
            }
          />

        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>
    </>
  ))

  console.log('rssFeedsList', rssFeedsList)
  console.log('state', showParticularFeed)

  return (
    <>
      <Grid className="live-feed-head main-wrap-head" container style={{ marginBottom: 20 }} alignItems='center'>
        <Grid item xs={7}>
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
              LIVE <TypoHeadInnerStyled component='span'>FEED</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid container className="main-wrap-body liveFeed-cont-wrap" alignItems='stretch'>
        {showPanel
          ? <Grid item xs={12} md={4} lg={3} className='pr-25 leftSide-cont'>
            <Paper className={clsx(classes.paper, "live-feed-blk")}>
              <List className="live-feed-list">{Rymindrlist}</List>
            </Paper>
          </Grid>
          : null}

        {

          (showParticularFeed)
            ? <Grid item xs={12} md={8} lg={9} className={clsx(classes.rightPanel, "rightSide-cont")} style={{ display: showPanel ? 'none' : 'block' }}>
              <Paper className={clsx(classes.paper, "live-feed-details")}>
                <TypoStyled style={{ fontWeight: '500' }}>
                  {(showParticularFeed.title) ? showParticularFeed.title.replace(/(<([^>]+)>)/ig, '') : ''}
                </TypoStyled>
                <TypoStyled>
                  <Box className="feed-news-fig"><img className={classes.feedImg} src={showParticularFeed.img_url} /></Box>
                  <Box className="feed-news-cont-rht">
                    <Box className="feed-news-logo"><img src={showParticularFeed.logo} /></Box>
                    <Box style={{ fontSize: 14, marginBottom: 20 }}> Posted on: {showParticularFeed.postDate} | {showParticularFeed.time}</Box>

                    <Box style={{ fontSize: 14, marginBottom: 20 }}>  Author: {showParticularFeed.author}</Box>
                    <Box className="feed-news-capt">
                      {(showParticularFeed.content) ? showParticularFeed.content.replace(/(<([^>]+)>)/ig, '') : ''}

                      <a href={showParticularFeed.link} target='_blank'>Read More</a>
                    </Box>
                  </Box>
                </TypoStyled>
              </Paper>
        </Grid>
            :
            <Grid item xs={12} md={8} lg={9} className={clsx(classes.rightPanel, "rightSide-cont")} style={{ display: showPanel ? 'none' : 'block' }}>
              <Paper className={clsx(classes.paper, "live-feed-details")}>
                <TypoStyled style={{ fontWeight: '500' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </TypoStyled>

                <TypoStyled className="feed-news-cont">
                 <Box className="feed-news-fig"><img src={require('../../assets/images/image.png')} className={classes.feedImg} /></Box>
                 <Box className="feed-news-cont-rht">
                 <Box className="feed-news-logo"><img src={require('../../assets/images/feed_image.png')} style={{ height: 21 }} /></Box>
                 <Box className="feed-news-date">Wednesday 1 April 2020</Box>
                 <Box className="feed-news-capt">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        <br /><br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Box>
                </Box>
                </TypoStyled>
              </Paper>
            </Grid>

        }

      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    rssFeedsList: state.messageCenterReducer.rssFeedsList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRssFeeds: (data) => dispatch(getRssFeeds(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LiveFeed)
