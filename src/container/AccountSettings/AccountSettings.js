import { Box, Divider, Grid, List, ListItem, ListItemText, Paper, Typography } from '@material-ui/core';
import {
  Link,
  NavLink,
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
  useRouteMatch,
  useParams,
} from 'react-router-dom';
import React, { useState } from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import BusinessAccount from './BusinessAccount';
import ChangePassword from './ChangePassword';
import DefaultCategory from './DefaultCategory';
import DeleteAccount from './DeleteAccount';
import EditProfile from './EditProfile';
import Notifications from './Notifications';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    position: 'relative',
    height: 100 + '%',
    overflowX: 'hidden',
    overflowY: 'auto',
    paddingBottom: 20,
  },
  rightPanel: {
    [theme.breakpoints.up('md')]: {
      display: 'block !important',
    },
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
    marginRight: '10px',
  },
  feedImg: { float: 'left', marginRight: 20, marginBottom: 10, maxWidth: 100 + '%', borderRadius: 5 },
}));

const TypoHeadStyled = styled(Typography)(({ theme }) => ({
  fontSize: 24,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 'bold',
}));

const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const ListStyled = styled(List)(({ theme }) => ({
  padding: 0,
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  padding: 15,
  color: theme.palette.text.primary,
  textAlign: 'left',
  display: 'block',
  borderRadius: 10,
  marginTop: 5,
  marginBottom: 5,
  '& .active': {
    background: theme.palette.primary.light,
  },
}));

export default function AccountSettings(props) {
  const history = useHistory();
  const match = useRouteMatch();
  const { urlId } = useParams();
  const classes = useStyles();

  return (
    <>
      <Grid className="main-wrap-head" container style={{ marginBottom: 20 }} alignItems="center">
        <Grid item xs={7}>
          <Box display="flex" alignItems="center">
            <TypoHeadStyled variant="h4">
              ACCOUNT <TypoHeadInnerStyled component="span">SETTINGS</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Box>
        </Grid>
      </Grid>

      <Grid className="main-wrap-body account-cont-wrap" container alignItems="stretch">
        <Grid item xs={12} md={4} className="pr-25 leftSide-cont">
          <Paper className={classes.paper}>
            <ListStyled>
              <ListItemStyled
                button
                onClick={() => history.push('/account-settings/business-account')}
                selected={urlId === 'business-account'}
              >
                <ListItemText>Rymindr Codes</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled
                button
                onClick={() => history.push('/account-settings/edit-profile')}
                selected={urlId === 'edit-profile'}
                className={window.location.pathname === '/account-settings/edit-profile' ? 'active' : null}
              >
                <ListItemText>Edit Profile</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled
                button
                onClick={() => history.push('/account-settings/default-category')}
                selected={urlId === 'default-category'}
                to="/account-settings/default-category"
                className={window.location.pathname === '/account-settings/default-category' ? 'active' : null}
              >
                <ListItemText>Default Category</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled
                button
                onClick={() => history.push('/account-settings/change-password')}
                selected={urlId === 'change-password'}
              >
                <ListItemText>Change Password</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled
                button
                onClick={() => history.push('/account-settings/notifications')}
                selected={urlId === 'notifications'}
              >
                <ListItemText>Notifications</ListItemText>
              </ListItemStyled>
              <Divider />
              <ListItemStyled
                button
                onClick={() => history.push('/account-settings/delete-account')}
                selected={urlId === 'delete-account'}
              >
                <ListItemText>Delete Account</ListItemText>
              </ListItemStyled>
            </ListStyled>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} className="rightSide-cont">
          <Paper className={classes.paper}>
            <Switch>
              <Route path="/account-settings/business-account" component={BusinessAccount} />
              <Route path="/account-settings/edit-profile" component={EditProfile} />
              <Route path="/account-settings/default-category" component={DefaultCategory} />
              <Route path="/account-settings/change-password" component={ChangePassword} />
              <Route path="/account-settings/notifications" component={Notifications} />
              <Route path="/account-settings/delete-account" component={DeleteAccount} />
            </Switch>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
