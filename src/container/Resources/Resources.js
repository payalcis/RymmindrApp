import { Box, Divider, Grid, List, ListItem, ListItemText, Paper, Typography, Collapse } from '@material-ui/core'
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import React, { useState } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import WebApp from './WebApp'
import RymindrMessaging from './RymindrMessaging'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
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
  nested: {
    paddingLeft: theme.spacing(4), color: theme.palette.text.primary
  }
}))

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold'
}))

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary
}))

const ListStyled = styled(List)(({ theme }) => ({
  padding: 0
}))

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 15,
  color: theme.palette.text.primary,
  textAlign: 'left',
  display: 'block',
  borderRadius: 10,
  marginTop: 5,
  marginBottom: 5,
  '& .active': {
    background: theme.palette.primary.light
  }
}))

export default function AccountSettings (props) {
  const history = useHistory()
  const match = useRouteMatch()
  const { urlId } = useParams()
  const classes = useStyles()
  console.log(history, match, urlId)

  const [open, setOpen] = React.useState(true)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <>
      <Grid container style={{ marginBottom: 20 }} alignItems='center'>
        <Grid item xs={7}>
          <Box display='flex' alignItems='center'>
            <TypoHeadStyled variant='h4'>
              ReSOURCES
            </TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid container alignItems='stretch'>
        <Grid item xs={12} md={4} className='pr-25'>
          <Paper className={classes.paper}>
            <ListStyled>
              <ListItemStyled
                button onClick={handleClick}
              >
                <ListItemText>Frequently Asked Questions</ListItemText>
              </ListItemStyled>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div'>
                  <ListItem
                    button className={classes.nested}
                    selected={urlId === 'web-app'}
                    onClick={() => history.push('/resources/web-app')}
                    className={window.location.pathname === '/resources/web-app' ? classes.nested + 'active' : classes.nested}
                  >
                    <ListItemText primary='Web App' />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='iOS App' />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='Android App' />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='Login Help' />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItemStyled
                button onClick={handleClick}
              >
                <ListItemText>Help Center</ListItemText>
              </ListItemStyled>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div'>
                  <ListItem
                    button className={classes.nested}
                  >
                    <ListItemText primary='Getting Started' />
                  </ListItem>
                  <ListItem
                    button className={classes.nested} selected={urlId === 'rymindr-messaging'}
                    onClick={() => history.push('/resources/rymindr-messaging')}
                    className={window.location.pathname === '/resources/rymindr-messaging' ? classes.nested + 'active' : classes.nested}
                  >
                    <ListItemText primary='Rymindr Messaging' />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='Parents’ Evening Booking Form' />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='Rymindr Forms' />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemText primary='Rymindr Payments' />
                  </ListItem>
                </List>
              </Collapse>
              <Divider />
              <ListItemStyled button>
                <ListItemText>Release Notes</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled button>
                <ListItemText>About</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled button>
                <ListItemText>Contact Us</ListItemText>
              </ListItemStyled>
            </ListStyled>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className={classes.paper}>
            <Switch>
              <Route path='/resources/web-app' component={WebApp} />
              <Route path='/resources/rymindr-messaging' component={RymindrMessaging} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
