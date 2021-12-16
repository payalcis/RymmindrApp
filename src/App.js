import './assets/style/index.css'
import React, { useEffect } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import AuthenticatedRoute from './component/AuthenticatedRoute/index'
import Layout from './container/Layout/Layout'
import Login from './container/Login/Login' 
import ExamAttempt from './container/ExamAttempt/ExamAttempt'
import DownloadExamAttemptInOne from './container/DownloadExamAttemptInOne/DownloadExamAttemptInOne'
import DownloadExamAttempt from './container/DownloadExamAttempt/DownloadExamAttempt'
import Authenticate from './container/Authenticate/Authenticate'
import ForgetPassword from './container/ForgetPassword/ForgetPassword'
import ResetPassword from './container/ResetPassword/ResetPassword'
import MailSent from './container/MailSent/MailSent'
import AccountDeactivate from './container/AccountDeactivate/AccountDeactivate'

import Register from './container/Register/Register'
import { SnackbarProvider } from 'notistack'
import { ThemeProvider } from '@material-ui/core/styles'
import { askForPermissioToReceiveNotifications } from './push-notification'
import { defaultTheme } from './themes'
// import firebase from 'firebase';

const App = () => {
  useEffect(() => {
    askForPermissioToReceiveNotifications()
    // firebase.analytics();
  }, [])
  return (
    <ThemeProvider theme={defaultTheme}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        maxSnack={1}
        dense
        autoHideDuration={2000}
      >
        <Router>
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/authenticate' component={Authenticate} />
            <Route exact path='/forget-password' component={ForgetPassword} />
            <Route exact path='/reset-password/:getemail' component={ResetPassword} />
            <Route exact path='/mail-sent/:getemail/:isRegister' component={MailSent} />
            <Route exact path='/authenticate/:getemail/:getotp' component={Authenticate} />
            <Route exact path='/account-deactivate/:getemail/:getotp' component={AccountDeactivate} />
            <Route exact path='/exam-attempt/:exam_id/:note_id/:token' component={ExamAttempt} />
            <Route exact path='/download-exam-attempt/:exam_id/:contact_id' component={DownloadExamAttempt} />
            <Route exact path='/download-exam-attempt-inone/:exam_id' component={DownloadExamAttemptInOne} />
            <AuthenticatedRoute path='/' component={Layout} />
          </Switch>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
};

export default App
