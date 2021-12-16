import { firebaseConfig } from './firebase';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import Axios from './helper/axios';

const initializedFirebaseApp = firebase.initializeApp(firebaseConfig);

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = await initializedFirebaseApp.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();

    console.log('get token ', token);

    var sessionToken = sessionStorage.setItem('token_de', token);

    const { user_id } = JSON.parse(localStorage.getItem('userData'));

    var requestJSON = {
      user_id,
      token_type: "web",
      device_token: token,
    }

    Axios.post('notification/update_device_token', requestJSON)
      .then((response) => {
          console.log(response.data.message);
      })
      .catch((err) => {
          console.log(err.message);
      });

    messaging.onMessage((payload) => {
      console.log('Message received hello .', payload);

      handlingNotification(payload);
    });

    return token;
  } catch (error) {
    console.error("errorerror", error);
  }
};

export const handlingNotification = (payload) => {
  var notify;

  if (Notification.permission === 'granted') {
    var bodyData = payload.notification.body;
    var title = payload.notification.title;
    //var bodyData = payload.data.body;
    // var title = payload.data.title;
    //console.log(title);
    //console.log(bodyData);
    notify = new Notification(title, {
      body: bodyData,
      icon: 'https://rymindr.com/wp-content/uploads/2017/02/whitelogo-2-uai-720x232.png',
      tag: '12345',
    });

    notify.onclick = function () {
      notify.close();
      window.location.hash = '/home/Upcoming';
    };
  }
};
