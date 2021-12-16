import React, { useState } from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import moment from "moment";

const POSTER_PATH = "https://image.tmdb.org/t/p/w154";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    padding: 20
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  movieContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  movieDetails: {
    display: "flex",
    width: "25" + "%"
  },
  movieTitle: {
    fontSize: 11,
    marginBottom: 10,
    color: "#0ab7fd"
  },
  movieData:{
    fontSize: 13,
    marginBottom: 10,
    display: "flex",
    color: "#39566b"
  },
  movieOverview: {
    fontSize: 10
  },

  image: {
    height: 30,
    width: 30
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12
  },
  vote: {
    display: "flex",
    flexDirection: "row"
  },
  rating: {
    height: 10,
    width: 10
  },
  vote_text: {
    fontSize: 10
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff"
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4
  },
  overviewContainer: {
    minHeight: 110
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row",
    border:'1 solid black',
  },
  lang: {
    fontSize: 8,
    fontWeight: 700
  },
  vote_average: {
    fontSize: 8,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold"
  },
  pageNumbers: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center'
  },
   header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pdfHeadBlk: {
    marginBottom: 10,
    display: "block"
  },
  pdfHeadTtl: {
    color: "#0ab7fd",
    fontSize: 16,
    marginBottom: 10,
    display: "block"
  },
  pdfSubTtl: {
    color: "#39566b",
    fontSize: 13,
    marginBottom: 10,
    display: "block",
  },
  meetingDate: {
    marginBottom: 10,
  },
  pdfMainWrap: {
    marginBottom: 20
  },
  tblContainer: {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#dee2e6",
    display: "block",
  },
  tblRow: {
    display: "flex",
    flexDirection: "row"
  },
  tblColOne: {
    padding: 8,
    verticalAlign: "middle",
    fontSize: 11,
    color: "#40576a",
    fontWeight: "normal",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#dee2e6",
    width: "5" + "%"
  },
  tblColTwo: {
    padding: 8,
    verticalAlign: "middle",
    fontSize: 11,
    color: "#40576a",
    fontWeight: "normal",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#dee2e6",
    width: "20" + "%"
  },
  tblColThree: {
    padding: 8,
    verticalAlign: "middle",
    fontSize: 11,
    color: "#40576a",
    fontWeight: "normal",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#dee2e6",
    width: "60" + "%"
  },
  tblColFour: {
    padding: 8,
    verticalAlign: "middle",
    fontSize: 11,
    color: "#40576a",
    fontWeight: "normal",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderColor: "#dee2e6",
    width: "15" + "%"
  },
  tblColMdata: {
    marginLeft: 10,
  },
  pdfTblTtl: {
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderColor: "#dee2e6",
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 5,
    color: "#0ab7fd",
    fontSize: 16,
    display: "block",
  },
  pdfTblView: {
    marginBottom: 100,
  },
  pdfFooterView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100" + "%",
    textAlign: "center",
    marginBottom: 15,
  },
  pdfFooterView: {
    fontSize: 14,
    color: "#40576a",
  },
  pwdLogo: {
    fontSize: 15,
    color: "#0ab7fd",
  }
});



export function PdfDocument(props) {
 //console.log("user data", props.userData);
 //console.log('eventData',props.eventData);

  // const [profileState, setProfileState] = useState(props);
  console.log(props);



 
  return (
    <Document>
      <Page style={styles.page}>
       <Text style={styles.header} fixed>
      </Text>


{/*<Text style={styles.header} fixed>
        
        {(props.eventData != null) ? props.eventData.category : ('---') } 
|

        { ( props.eventData != null ) ? props.eventData.subject: null }

      
  </Text>
  */}

{ 

    ( props.eventData != null )
    ?
    props.eventData.meeting_data.map((booking, bookingIndex) => {

      var meeting_time_start = booking.meeting_time_start;
var H = +meeting_time_start.substr(0, 2);
var h = (H % 12) || 12;
var ampm = H < 12 ? "AM" : "PM";
meeting_time_start = h + meeting_time_start.substr(2, 3) + ampm;

var meeting_time_start1 = booking.meeting_time_start1;
var H = +meeting_time_start1.substr(0, 2);
var h = (H % 12) || 12;
var ampm = H < 12 ? "AM" : "PM";
meeting_time_start1 = h + meeting_time_start1.substr(2, 3) + ampm;

var meeting_time_end = booking.meeting_time_end;
var H = +meeting_time_end.substr(0, 2);
var h = (H % 12) || 12;
var ampm = H < 12 ? "AM" : "PM";
meeting_time_end = h + meeting_time_end.substr(2, 3) + ampm;

var meeting_time_end1 = booking.meeting_time_end1;
var H = +meeting_time_end1.substr(0, 2);
var h = (H % 12) || 12;
var ampm = H < 12 ? "AM" : "PM";
meeting_time_end1 = h + meeting_time_end1.substr(2, 3) + ampm;

      return(
          <View style={styles.pdfMainWrap}>
            <View  style={styles.pdfWrap}>
              <View style={styles.pdfHeadBlk}>
                  <View className="pdf_head">
                      <Text style={styles.pdfHeadTtl}>St. Stephen's School - Parents evening</Text>
                  </View>
                  <View className="pdf_head">
                      <Text style={styles.pdfSubTtl}>Meeting with John Doe</Text>
                  </View>
                </View>
                <View style={styles.meetingDate}>
                    <View style={styles.moviemdDetails}><Text style={styles.movieTitle}> Meeting Date</Text></View>
                    <View style={styles.moviemdDetails}><Text style={styles.movieData}> {booking.meeting_date}</Text></View>
                </View>
            </View>
             <View  style={styles.movieContainer}>
                 <View style={styles.movieDetails}><Text style={styles.movieTitle}> Start Date</Text>
                </View>
                <View style={styles.movieDetails}><Text style={styles.movieTitle}> End Date</Text>
                </View>
                <View style={styles.movieDetails}><Text style={styles.movieTitle}> Break Start Time</Text>
                </View>
                <View style={styles.movieDetails}><Text style={styles.movieTitle}>Break End Time</Text>
                </View>
           </View>

          <View  style={styles.movieContainer}>
                <View style={styles.movieDetails}><Text style={styles.movieData}> {meeting_time_start}</Text>
                </View>
                <View style={styles.movieDetails}><Text style={styles.movieData}> {meeting_time_end}</Text>
                </View>
                <View style={styles.movieDetails}><Text style={styles.movieData}> {meeting_time_start1}</Text>
                </View>
                <View style={styles.movieDetails}><Text style={styles.movieData}>{meeting_time_end1}</Text>
          </View>
                 
          </View>
          <View style={styles.pdfTblView}>
              <View style={styles.tblView}>
                  <Text style={styles.pdfTblTtl}>Participants List</Text>
                  <View  style={styles.tblContainer}>
                   
                    <View  style={styles.tblRow}>
                      <View style={styles.tblColOne}><Text style={styles.tblColdata}>1</Text></View>
                      <View style={styles.tblColTwo}>
                        <Text style={styles.tblColdata}>Grent Marshall</Text>
                      </View>
                      <View style={styles.tblColThree}>
                        <Text style={styles.tblColMdata}>+44 07984376600</Text>
                      </View>
                      <View style={styles.tblColFour}><Text style={styles.tblColdata}>4:00 PM</Text></View>
                    </View>

                    <View  style={styles.tblRow}>
                      <View style={styles.tblColOne}><Text style={styles.tblColdata}>2</Text></View>
                      <View style={styles.tblColTwo}>
                        <Text style={styles.tblColdata}>John Doe</Text>
                      </View>
                      <View style={styles.tblColThree}>
                        <Text style={styles.tblColMdata}>+44 07984376600</Text>
                      </View>
                      <View style={styles.tblColFour}><Text style={styles.tblColdata}>2:30 PM</Text></View>
                    </View>

                    <View  style={styles.tblRow}>
                      <View style={styles.tblColOne}><Text style={styles.tblColdata}>3</Text></View>
                      <View style={styles.tblColTwo}>
                        <Text style={styles.tblColdata}>Joni Marshall</Text>
                      </View>
                      <View style={styles.tblColThree}>
                        <Text style={styles.tblColMdata}>+44 07984376600</Text>
                      </View>
                      <View style={styles.tblColFour}><Text style={styles.tblColdata}>2:00 PM</Text></View>
                    </View>

                    <View  style={styles.tblRow}>
                      <View style={styles.tblColOne}><Text style={styles.tblColdata}>4</Text></View>
                      <View style={styles.tblColTwo}>
                        <Text style={styles.tblColdata}>John Marshall</Text>
                      </View>
                      <View style={styles.tblColThree}>
                        <Text style={styles.tblColMdata}>+44 07984376600</Text>
                      </View>
                      <View style={styles.tblColFour}><Text style={styles.tblColdata}>1:00 PM</Text></View>
                    </View>

                    <View  style={styles.tblRow}>
                      <View style={styles.tblColOne}><Text style={styles.tblColdata}>3</Text></View>
                      <View style={styles.tblColTwo}>
                        <Text style={styles.tblColdata}>Joni Marshall</Text>
                      </View>
                      <View style={styles.tblColThree}>
                        <Text style={styles.tblColMdata}>+44 07984376600</Text>
                      </View>
                      <View style={styles.tblColFour}><Text style={styles.tblColdata}>3:00 PM</Text></View>
                    </View>

                  </View>
              </View>
          </View>
          <View style={styles.pdfFooterView}>
             <Text style={styles.pwdBy}>Powered By <Text style={styles.pwdLogo}>rymindr Logo</Text></Text>
          </View>
      </View>

      )
    
    })
    :
    null
}

                   








 { 
                    ( props.userData != null )
                    ?
                    props.userData.map((slot, bookingIndex) => {



                        return(
{/*<View key={bookingIndex}>

 <View  style={styles.movieContainer}>
      <View style={styles.movieDetails}><Text style={styles.movieTitle}> {slot.date} </Text>
      </View> 
      </View>  



     <View  style={styles.movieContainer}>

            <View style={styles.movieDetails}><Text style={styles.movieTitle}> Name</Text>
            </View>
             <View style={styles.movieDetails}><Text style={styles.movieTitle}> Time</Text>
            </View>
      </View>



{ //Check if message failed
 


        (Array.isArray(slot.all_slots) === true)
          ? 
slot.all_slots.map((meetingSlot, meetingSlotIndex) => 


       <View  key={meetingSlotIndex} style={styles.movieContainer}>

            <View style={styles.movieDetails}><Text style={styles.movieTitle}> {meetingSlot.name}</Text>
            </View>
             <View style={styles.movieDetails}><Text style={styles.movieTitle}> {meetingSlot.time}</Text>
            </View>
      </View>

)

          : Object.values(slot.all_slots).map((meetingSlot, meetingSlotIndex) => 

       <View  key={meetingSlotIndex} style={styles.movieContainer}>

            <View style={styles.movieDetails}><Text style={styles.movieTitle}>{meetingSlot.name ?meetingSlot.name:'---'}</Text>
            </View>
             <View style={styles.movieDetails}><Text style={styles.movieTitle}> {meetingSlot.time}</Text>
            </View>
      </View>

)
      }


      

</View>*/}

                        )
                    })
                    :
                    null
                }





       {/*<Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
       )} fixed /> */}







      </Page>
    </Document>
  );
}