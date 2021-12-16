import React from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import { Grid, Box, Typography, Button} from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import { Comment, Delete, Edit, Search, ArrowBack, Chat, Send, BeachAccess, Flag } from '@material-ui/icons'
import { Link, Route, BrowserRouter as Router, Switch, useHistory } from 'react-router-dom'
import './main.scss'

export default class DemoApp extends React.Component {
  
  calendarComponentRef = React.createRef()
  state = {
    calendarWeekends: true,
    calendarEvents: [ // initial event data
      { title: 'Event Now', start: new Date() }
    ]
  }
  
  

  render() {
    const TypoHeadStyled = styled(Typography)(({ theme }) => ({
      fontSize: 24,
      color: theme.palette.primary.main,
      textTransform: 'uppercase',
      fontWeight: 'bold'
    }))
    return (
      <>
        {/* <Grid container style={{ marginBottom: 20 }} alignItems='center'>
          <Grid item xs={12}>
            <Box display='flex' alignItems='center'>
              <TypoHeadStyled variant='h4'>Calendar</TypoHeadStyled>
            </Box>
          </Grid>
        </Grid> */}
      <div className='demo-app'>
        <div className='demo-app-calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next', /*today */
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
          />
        </div>
        </div>
      </>
    )
  }

  toggleWeekends = () => {
    this.setState({ // update a property
      calendarWeekends: !this.state.calendarWeekends
    })
  }

  gotoPast = () => {
    let calendarApi = this.calendarComponentRef.current.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  handleDateClick = (arg) => {
    history.push('/direct-message');
   /* this.setState({  // add new event data
      calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    })*/
  }

}