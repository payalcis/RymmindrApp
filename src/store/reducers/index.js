import accountsettingReducer from './accountsettingReducer';
import authReducer from './auth';
import { combineReducers } from 'redux';
import dashboardReducer from './dashboardReducer';
import rymidrReducer from './rymidr';

import formBuilderReducer from './formBuilder';
import commentReducer from './commentReducer';
import notificationReducer from './notificationReducer';
import contactReducer from './contactReduces';
//for event and term
import booktermReducer from './bookterm';
import bookeventReducer from './bookevent';

import messageCenterReducer from './messageCenterReducer';

import resourceCenterReducer from './resourceCenterReducer';

import bookList from './booklist';

import liveChatReducer from './liveChatReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    rymidr: rymidrReducer,
    formBuilder: formBuilderReducer,
    dashboard: dashboardReducer,
    contact: contactReducer,
    account: accountsettingReducer,
    booklist: bookList,
    comment: commentReducer,
    notification: notificationReducer,
    bookevent: bookeventReducer,
    bookterm: booktermReducer,
    messageCenterReducer: messageCenterReducer,
    resourceCenterReducer: resourceCenterReducer,
    liveChatReducer: liveChatReducer,
});

export default rootReducer;