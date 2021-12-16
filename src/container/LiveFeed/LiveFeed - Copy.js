import React, { useState , useEffect} from 'react'
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
import { Comment, Delete, Edit, Search, ArrowBack, Attachment, Headset, Image, Videocam, Description } from '@material-ui/icons'
import { getRssFeeds } from '../../store/actions/messageCenterAction'
import { connect } from 'react-redux';

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
    maxHeight: 80 + 'vh',
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
  feedImg: { float: 'left', marginRight: 20, marginBottom: 10, maxWidth: 100 + '%', borderRadius: 5 }
}))
function LiveFeed (props) {
  const [showPanel, setShowPanel] = useState(true)
  const [showParticularFeed, setParticularFeed]  = useState([])

  const {
    error,
    rssFeedsList
  } = props

  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'))

   useEffect(() => {
    const dataToSend = { user_id }
    props.getRssFeeds(dataToSend)
    setParticularFeed(rssFeedsList)
  }, [rssFeedsList]);

  const handleShowDetail = () => {
    setShowPanel(false)
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
console.log('rssFeedsList', rssFeedsList);
console.log('state', showParticularFeed);
  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const Rymindrlist = rssFeedsList.map((item) => (
    <>
      <Hidden mdUp implementation='css'>
        <ListItem button onClick={handleShowDetail}>
          <ListItemText
            primary={item.description.substring(0,35)+'...'}
            secondary={<img src={require('../../assets/images/feed_image.png')} style={{ height: 20 }} />}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>

      <Hidden smDown implementation='css'>
        <ListItem button>
          <ListItemText
            primary={item.description.substring(0,35)+'...'}
            secondary={<img src={require('../../assets/images/feed_image.png')} style={{ height: 20 }} />}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>
    </>
  ))

  return (
    <>
      <Grid container style={{ marginBottom: 20 }} alignItems='center'>
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
              LIve <TypoHeadInnerStyled component='span'>FEED</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid container alignItems='stretch'>
        {showPanel
          ? <Grid item xs={12} md={4} className='pr-25'>
            <Paper className={classes.paper}>
              <List>{Rymindrlist}</List>
            </Paper>
          </Grid>
          : null}

        {
          (showParticularFeed) ? 
          <Grid item xs={12} md={8} className={classes.rightPanel} style={{ display: showPanel ? 'none' : 'block' }}>
            <Paper className={classes.paper}>
              <TypoStyled style={{ fontWeight: '500' }}>
                {showParticularFeed[0].description}
              </TypoStyled>
  
              <TypoStyled>
                
               <Box style={{ fontSize: 14, marginBottom: 20 }}>{showParticularFeed[0].postDate[0]}</Box>
                {showParticularFeed[0].content}
              </TypoStyled>
            </Paper>
          </Grid> 
          :
          <Grid item xs={12} md={8} className={classes.rightPanel} style={{ display: showPanel ? 'none' : 'block' }}>
            <Paper className={classes.paper}>
              <TypoStyled style={{ fontWeight: '500' }}>
                
              </TypoStyled>
  
              <TypoStyled>
                
               <Box style={{ fontSize: 14, marginBottom: 20 }}></Box>
               
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
    rssFeedsList : state.messageCenterReducer.rssFeedsList
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRssFeeds: (data) =>dispatch(getRssFeeds(data)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LiveFeed);
