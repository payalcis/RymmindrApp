import React, { useState } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Link, Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Box, Button, Divider, InputAdornment, TextField, IconButton, Hidden, FormControlLabel, CardMedia } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Comment, Delete, Edit, Search, ArrowBack, Attachment, Headset, Image, Videocam, Description } from '@material-ui/icons'
import RymindrOriginal from '../../assets/images/rymindr_original.png';
import CreditsIcon from '../../assets/images/credits.png';

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
  feedImg: { float: 'left', marginRight: 20, marginBottom: 10, maxWidth: 100 + '%', borderRadius: 5 },
  icon: {
    width: 150,
    marginBottom: 40
  },
  content: {
    textAlign: "center",
    textAlign: "-webkit-center",
    paddingTop: "8%"
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
export default function MessageCenter (props) {
  const [showPanel, setShowPanel] = useState(true)

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
    fontWeight: 'bold',
    marginBottom: 20
  }))
  const TypoListSubtext = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    color: theme.palette.secondary.contrastText
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
  const Rymindrlist = DATA.map((item) => (
    <>
      <Hidden mdUp implementation='css'>
        <ListItem button onClick={handleShowDetail}>
          <ListItemText
            primary='Message Subject'
            secondary={<TypoListSubtext>Lorem ipsum dolor sit amet, consectetur adipi..</TypoListSubtext>}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>

      <Hidden smDown implementation='css'>
        <ListItem button>
          <ListItemText
            primary='Lorem ipsum dolor sit amet, consec..'
            secondary={<TypoListSubtext>Lorem ipsum dolor sit amet, consectetur adipi..</TypoListSubtext>}
          />
        </ListItem>
        <Divider variant='inset' component='li' />
      </Hidden>
    </>
  ))

  return (
    <>
      <TypoHeadStyled variant='h4'>
        Rymindr News
      </TypoHeadStyled>
      <Paper className={classes.contentArea}>
        <Box className={classes.content}>
          <CardMedia
            className={classes.icon}
            image={CreditsIcon}
            title="Rymindr News"
            component="img"
          />
          <TypoHeadStyled variant='h5'>
              COMING SOON
          </TypoHeadStyled>
          <Typography className={classes.commingSoonDesc}>
          We'll be launching Rymindr news soon to keep you updated on exciting things Rymindr is working on.  
          Keep an eye out, this is exciting!
          </Typography>
          <Button variant="contained" size="large" className={classes.notifyMeButton}>
            NOTIFY ME
          </Button>
        </Box>
      </Paper>
    </>
    // <>
    //   <Grid container style={{ marginBottom: 20 }} alignItems='center'>
    //     <Grid item xs={7}>
    //       <Box display='flex' alignItems='center'>
    //         {showPanel
    //           ? null : <Hidden mdUp implementation='css'>
    //             <IconButton
    //               color='inherit'
    //               onClick={handleHideDetail}
    //             >
    //               <ArrowBack />
    //             </IconButton>
    //           </Hidden>}
    //         <TypoHeadStyled variant='h4'>
    //           Rymindr <TypoHeadInnerStyled component='span'>News</TypoHeadInnerStyled>
    //         </TypoHeadStyled>
    //       </Box>
    //     </Grid>
    //   </Grid>

    //   <Grid container alignItems='stretch'>
    //     {showPanel
    //       ? <Grid item xs={12} md={4} className='pr-25'>
    //         <Paper className={classes.paper}>
    //           <List>{Rymindrlist}</List>
    //         </Paper>
    //       </Grid>
    //       : null}

    //     <Grid item xs={12} md={8} className={classes.rightPanel} style={{ display: showPanel ? 'none' : 'block' }}>
    //        <Paper className={classes.paper}>
    //         <TypoStyled style={{ fontWeight: '500' }}>
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //         </TypoStyled>

    //         <TypoStyled>
    //           <img src={require('../../assets/images/imagerymindr.png')} className={classes.feedImg} />
    //           <Box style={{ fontSize: 12, color: '#8c9aa6' }}>
    //             By <img src={require('../../assets/images/logo.png')} style={{ height: 20, marginBottom: -4 }} />
    //           </Box>
    //           <Box style={{ fontSize: 14, marginBottom: 20, marginTop: 10, color: '#40576A', fontWeight: 'bold' }}>Author Name &nbsp;| &nbsp;Wednesday 1 April 2020</Box>

    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    //           <br /><br />
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    //           <br /><br />
    //           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    //         </TypoStyled>
    //       </Paper>
    //     </Grid>

    //   </Grid>
    // </>
  )
}
