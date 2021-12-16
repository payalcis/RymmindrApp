import { Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase';
import { withSnackbar } from 'notistack';
import { connect } from 'react-redux';
import { getUserAndGroupList, createGroup, initChat } from '../../store/actions/LiveChatActions';
const ListStyled = styled(List)(({ theme }) => ({
  padding: '20px',
  '& a': {
    borderRadius: 8,
    paddingTop: '8px !important',
    paddingBottom: '8px !important',
    '& div': {
      minWidth: 48,
    },
    '& span': {
      textTransform: 'uppercase',
      fontSize: 13,
    },
    '& .comingTxt span': {
      fontSize: 9,
      textTransform: 'none',
      color: 'rgba(64, 87, 106, 0.15)',
      textAlign: 'right',
      position: 'absolute',
      right: 5,
      top: 16,
    },
    '&.active': {
      background: theme.palette.primary.light,
    },
  },
  '& :hover': {
    background: theme.palette.primary.light,
  },
}));
const DATA = [
  {
    icon: require('../../assets/images/dashboard.svg'),
    name: 'DASHBOARD',
    route: '/',
  },
  {
    icon: require('../../assets/images/rymindr_hand_2.png'),
    name: 'Rymindrs',
    route: '/rymindrs',
  },
  {
    icon: require('../../assets/images/live_chat.svg'),
    name: 'Live chat',
    route: '/live-chat',
  },
  {
    icon: require('../../assets/images/feed.svg'),
    name: 'Message Center',
    route: '/message-center',
  },
  {
    icon: require('../../assets/images/contacts.svg'),
    name: 'Contacts',
    route: '/contacts',
  },
  {
    icon: require('../../assets/images/calendar.svg'),
    name: 'Calendar',
    route: '/calendar',
  },
  {
    icon: require('../../assets/images/holidays.svg'),
    name: 'Term dates / holidays',
    route: '/term-dates-holidays',
  },
  {
    icon: require('../../assets/images/bookings.svg'),
    name: 'BOOKINGS',
    route: '/bookings',
  },
  {
    icon: require('../../assets/images/bookings.svg'),
    name: 'Form Builders',
    route: '/form-builders',
  },
  {
    icon: require('../../assets/images/payment.svg'),
    name: 'Payments',
    route: '/payments',
    coming: true,
  },
  {
    icon: require('../../assets/images/credits.svg'),
    name: 'Rymindr credits',
    route: '/credits',
    coming: true,
  },
  // {
  //   icon: require('../../assets/images/resources.svg'),
  //   name: 'Resources',
  //   route: '/resources',
  //   coming: true
  // },
  {
    icon: require('../../assets/images/shop.svg'),
    name: 'Rymindr shop',
    route: '/shop',
    coming: true,
  },
  {
    icon: require('../../assets/images/rewards.svg'),
    name: 'Rymindr Rewards',
    route: '/rewards',
    coming: true,
  },
  {
    icon: require('../../assets/images/fund.svg'),
    name: 'Create fund raisers',
    route: '/fundraisers',
    coming: true,
  },
  {
    icon: require('../../assets/images/feed.svg'),
    name: 'LIVE FEED',
    route: '/live-feed',
  },
  {
    icon: require('../../assets/images/news.svg'),
    name: 'RYMINDR NEWS',
    route: '/rymindr-news',
  },
  {
    icon: require('../../assets/images/account.svg'),
    name: 'Account settings',
    route: '/account-settings/business-account',
  },
  {
    icon: require('../../assets/images/integration.svg'),
    name: 'Integrations',
    route: '/integrations',
    coming: true,
  },
  {
    icon: require('../../assets/images/history.svg'),
    name: 'History',
    route: '/history-rymindrs',
  },
];

const Sidebar = (props) => {
  const { contacts, error, success, loading } = props;

  const route1 = useLocation();
  const { user_id, business_code } = JSON.parse(localStorage.getItem('userData'));
  var messageRef = firebase.database().ref();

  //   useEffect(() => {
  //     listenMessages();

  //     // Clear the rendered chat messages when component is unmounted and mounted again
  //     return () =>
  //     {
  //       messageRef.off();
  //     }
  // }, []);

  const [msgNotifications, updateMsgNotifications] = useState([]);
  const [unreadMsgNotifications, updateUnreadMsgNotifications] = useState([]);
  const [isChangeManu, setIsChangeManu] = useState(1);
  const [contactList, updateContactList] = useState(contacts);
  // const listenMessages = () => {
  //     messageRef.on('value', function() {
  //         let unreadMessages = [];

  //         messageRef.orderByChild("created_at").on("child_added", snapshot => {

  //             let msgNodes = snapshot.val();
  //             let message = Object.values(msgNodes);

  //             if(message.length > 0) {
  //               for(let i=0; i<message.length; i++)
  //               {
  //                   // Only unread messages will be shown here
  //                   if( message[i]['message_read_'+user_id] === false )
  //                   {
  //                       unreadMessages.push(message[i]);
  //                   }
  //               }
  //               if(unreadMessages.length > 0 ) {
  //                 updateMsgNotifications(unreadMessages);
  //               }
  //             }
  //         });
  //     });
  // }

  setTimeout(() => {
    updateUnreadMsgNotifications(msgNotifications);
  }, 1000);
  useEffect(() => {
    //console.log('contacts123====',contacts);
    updateContactList(contacts);
  }, [contacts]);

  useEffect(() => {
    const dataTosend = {
      user_id,
      business_code,
    };
    props.getUserAndGroupList(dataTosend);
  }, []);
  var messageRef = firebase.database().ref();

  useEffect(() => {
    listenMessages();
    return () => {
      messageRef.off();
    };
  }, [isChangeManu,contacts]);

  const listenMessages = () => {
    messageRef.on('value', function () {
      let unreadMessages = [];
      messageRef.orderByChild('created_at').on('child_added', (snapshot) => {
        let msgNodes = snapshot.val();
        let message = Object.values(msgNodes);

        if (message.length > 0) {
          for (let i = 0; i < message.length; i++) {
            // Only unread messages will be shown here
            if (message[i]['message_read_' + user_id] === false) {
              unreadMessages.push(message[i]);
            }
          }
          
          if(unreadMessages.length > 0 ) {
            let getcontacts = unreadMessages.filter(a=>{
              return contacts.some(con => con.user_id == a.sender_id);
            })
          updateMsgNotifications(getcontacts);
          }
        }
      });
    });
  };

  const testfunct = () => {
    var x = Math.floor(Math.random() * 10 + 1);
    setIsChangeManu(x);
  };

  return (
    <>
      <Scrollbars>
        <Divider />
        <ListStyled>
          {DATA.map(({ icon, name, route, coming }, key) => (
            <>
              <ListItem
                button
                component={Link}
                to={route}
                key={name}
                className={route1.pathname === route ? 'active' : null}
                onClick={testfunct}
              >
                <ListItemIcon>
                  {' '}
                  <img src={icon} />
                </ListItemIcon>

                {/* =={msgNotifications.length} */}
                {name == 'Live chat' ? (
                  msgNotifications.length > 0 ? (
                    <>
                      <ListItemText>{name}</ListItemText>
                      <span
                        style={{
                          backgroundColor: '#FF8A00',
                          padding: 8,
                          paddingTop: 2,
                          paddingBottom: 2,
                          borderRadius: 30,
                          fontSize: 11,
                          color: 'white',
                          marginLeft: 10,
                          textTransform: 'none',
                        }}
                      >
                        {msgNotifications.length + ' New'}
                      </span>
                    </>
                  ) : (
                    <ListItemText>{name}</ListItemText>
                  )
                ) : (
                  <ListItemText>{name}</ListItemText>
                )}
                {/*<ListItemText>{name}</ListItemText>*/}
                {coming ? <ListItemText className="comingTxt">Coming soon</ListItemText> : null}
              </ListItem>

              {key === 5 ? <Divider variant="inset" component="li" className="mt-20 mb-20" /> : null}
              {key === 7 ? <Divider variant="inset" component="li" className="mt-20 mb-20" /> : null}
              {key === 12 ? <Divider variant="inset" component="li" className="mt-20 mb-20" /> : null}
              {key === 15 ? <Divider variant="inset" component="li" className="mt-20 mb-20" /> : null}
            </>
          ))}
        </ListStyled>
      </Scrollbars>
    </>
  );
};

//export default withRouter(Sidebar)

const mapStateToProps = (state) => {
  return {
    loading: state.liveChatReducer.loading,
    error: state.liveChatReducer.error,
    success: state.liveChatReducer.success,
    contacts: state.liveChatReducer.contacts,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getUserAndGroupList: (data) => dispatch(getUserAndGroupList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Sidebar));
