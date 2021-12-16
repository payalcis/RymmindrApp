/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.14.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: 'AIzaSyATZtpdbgql74xjp4QNZYFK2Nz_FFk_Hxc',
  authDomain: 'rymidr-a81b3.firebaseapp.com',
  databaseURL: 'https://rymidr-a81b3.firebaseio.com',
  projectId: 'rymidr-a81b3',
  storageBucket: 'rymidr-a81b3.appspot.com',
  messagingSenderId: '1009802907857',
  appId: '1:1009802907857:web:edbb56cb9299eeb731f5f0',
  measurementId: 'G-738WYLKXMC',
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: 'https://rymindr.com/wp-content/uploads/2017/02/whitelogo-2-uai-720x232.png',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
