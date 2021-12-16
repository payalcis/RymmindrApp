import React from 'react'
import { styled } from '@material-ui/core/styles'
import { Grid, Box, Typography} from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import { withRouter } from 'react-router-dom'
import './main.scss'
import { getRymindrListCalendar } from '../../store/actions/messageCenterAction'
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';


const CircularProgressstyled = styled(CircularProgress)({
  position: 'absolute',
  top: '45%',
  left: '45%',
  zIndex: 9999,
  opacity: 1
});

class DemoApp extends React.Component {
  calendarComponentRef = React.createRef()
  state = {
    rymindrList:[],
    calendarWeekends: true,
    calendarEvents: [ // initial event data
      /*{ title: 'Event Now', start: new Date() }*/
    ],
    isLoader: true
  }

  componentDidMount() {
    const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'))
    //const { rymindrList } = this.props;
    this.props.getRymindrListCalendar({user_id})
    .then(res => {
      const allRymindrList = this.props.rymindrList;
    console.log('ryyy', allRymindrList) ;

    if(allRymindrList.length > 0){
      
      const copycalendarEvent = [...this.state.calendarEvents];
      allRymindrList.map((rymidrTitle, index) => {
        console.warn('rymidrTitle123', rymidrTitle);
        const maindateString = rymidrTitle.calendar_rymindr_date+' 23:00:00'; //+' '+rymidrTitle.calendar_rymindr_time;
        const maindateObject = new Date(maindateString);
        if(rymidrTitle.rymindr_count > 2 ){
          console.warn('hello count if');
          const rymindr_count = rymidrTitle.rymindr_count - 2;
          rymidrTitle.rymindr_array.map((row, key) => {
            const dateString = row.calendar_rymindr_date+' '+row.calendar_rymindr_time;
            const dateObject = new Date(dateString);
            const regex = '/<(.|\n)*?>/g';
            let tempNote = row.note.replace(/<(.|\n)*?>/g, '').replace(/\&nbsp;/g, '')
            copycalendarEvent.push({title: (row.note !== null ? tempNote.substring(0,15) : null)+'...' , start: dateObject, rowid:row.id, param: tempNote, paramType: 'note'}) //dateObject.toString()
          })
            copycalendarEvent.push({title: '+'+rymindr_count+' Rymindrs', start:maindateObject, rowid:rymidrTitle.id, param: rymidrTitle.calendar_rymindr_date, paramType: 'date'})
         }
        else{
          rymidrTitle.rymindr_array.map((row, key) => {
            const regex = '/<(.|\n)*?>/g';
            let tempNote = row.note.replace(/<(.|\n)*?>/g, '').replace(/\&nbsp;/g, '')
            const dateString = row.calendar_rymindr_date+' '+row.calendar_rymindr_time;
            const dateObject = new Date(dateString);
            copycalendarEvent.push({title: (row.note !== null ? tempNote.substring(0,15) : null)+'...' , start: dateObject, rowid: row.id, param: tempNote, paramType: 'note'}) //dateObject.toString()
            console.warn('copycalendarEvent', copycalendarEvent);
            //copycalendarEvent.push({title: '+ '+rymidrTitle.rymindr_count+' Rymindrs', start:dateObjectForDate})
          })
        }
      })
     console.log('copyyy',copycalendarEvent) ;
     setTimeout(()=> {this.setState({calendarEvents: [...copycalendarEvent], isLoader: false})}, 4000);
     
    } //if RYMINDRS ARE THERE

    else {
      this.setState({isLoader: false})
      }
  })   
  }

  renderEventContent=(eventInfo)=> {
  let eventTime=moment(eventInfo.event.start).format('YYYY--MM-DD, HH:mm A')
  console.log('datatta',moment(eventInfo.event.start).format('YYYY--MM-DD, HH:mm A'))
  console.warn('eventInfo.event.start333', eventInfo.timeText);
  // if(eventInfo.timeText.slice(1, 3)==='p')
  // {
  //   eventTime=eventInfo.timeText.slice(0,-1)+'PM'
  // }else  if(eventInfo.timeText.slice(-1)==='a'){
  //   eventTime=eventInfo.timeText.slice(0,-1)+'AM'
  // }else{
  //    eventTime=eventInfo.timeText
  // }
  // return (
  //   <>
  //     <b>{eventTime}</b>
  //     <i>{eventInfo.event.title}</i>
  //   </>
  // )
}


  render() {
    //console.log('rymindrList', this.props.rymindrList);
    //console.log('sate', this.state.rymindrList);
    const { history } = this.props;
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
        <div className='demo-app-calendar' style={{position: 'relative'}}>

          {
            this.state.isLoader ?
            
              <div style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 9999}}>
                <CircularProgressstyled />
              </div>
              :
              null
          }
          
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'today, prev,next', /*today */
              center: 'title',
              right: '',   //'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            }}
            slotLabelFormat="HH:mm"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: true
            }}
            eventRender={this.renderEventContent}
            ignoreTimezone={false}
            timezone='Asia/Kolkata'
            // dateClick={this.handleDateClick}
            dateClick={(info) => console.warn('inforinforinfor', info)}
            eventClick={this.handleEventClick}
             eventContent={() => console.warn('hello console')} 
            dayRender={
              function (date, month, element, view) {
                const today = new Date();
                //if(date.isBefore(today)){
                  //element.css("background", "red");
                //}

              //  console.log('depak======================>', element)
            }
            }
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
    console.warn('arg1111', arg)
    const { history } = this.props;
    //alert('arg.date'+ arg.date);
    const date = new Date(arg.date),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
    const selDate =  [date.getFullYear(), mnth, day].join("-");
    //alert('selDate'+selDate);
    //history.push('/create-rymindr', {dateSelected: arg.date});

    console.warn('hello3333', selDate, date, new Date(selDate))

    history.push({
      pathname: '/create-rymindr',
      state: { selectedDate: selDate}
    })
   /* this.setState({  // add new event data
      calendarEvents: this.state.calendarEvents.concat({ // creates a new array
        title: 'New Event',
        start: arg.date,
        allDay: arg.allDay
      })
    })*/
  }

  handleEventClick = (clickInfo) => {
    const { history } = this.props;

    let param = clickInfo.event.extendedProps.param;
    let paramType = clickInfo.event.extendedProps.paramType;

    if( paramType === 'date' )
    {
        // Convert the date format
        let dateTime = param.split('-');
        let convertedDateTime = dateTime[2] + '-' + dateTime[0] + '-' + dateTime[1];
        param = convertedDateTime;
    }

    // convert it to base64
    param = encodeURI(param);

    history.push('/rymindrs/'+param+'/'+paramType);
  }

}

//export default RightContent;
const mapStateToProps = (state) => {
  return {
    rymindrList : state.messageCenterReducer.rymindrList
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getRymindrListCalendar: (data) =>dispatch(getRymindrListCalendar(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(DemoApp));
