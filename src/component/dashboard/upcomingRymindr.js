import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative',
  },
}));

const AvatarStyled = styled(Avatar)({
  height: 55,
  width: 55,
  marginRight: 10,
});

const EventIconStyled = styled(EventIcon)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  marginBottom: -4,
  marginRight: 10,
}));

const ScheduleIconStyled = styled(ScheduleIcon)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  marginBottom: -4,
  marginRight: 10,
  marginLeft: 30,
}));
const CardPaperStyled = styled(Card)(() => ({
  height: '100%',
}));
const UpcomingRymindr = () => {
  const classes = useStyles();
  return (
    <CardPaperStyled>
      <CardHeader
        title="Upcoming rymindrs"
        action={<Button href="/rymindrs">View all</Button>}
        className="cardHeader"
      />
      <CardContent>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/event_rymindr.png')} />
            </ListItemAvatar>
            <ListItemText
              primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…"
              secondary={
                <>
                  <Box flexDirection="row" mt={1}>
                    <div>
                      <EventIconStyled />
                      {'Tuesday 05 May 2020'}

                      <ScheduleIconStyled />
                      {'12:00'}
                    </div>
                  </Box>
                </>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/work_rymindr.png')} />
            </ListItemAvatar>
            <ListItemText
              primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…"
              secondary={
                <>
                  <Box flexDirection="row" mt={1}>
                    <EventIconStyled />
                    {'Tuesday 05 May 2020'}

                    <ScheduleIconStyled />
                    {'12:00'}
                  </Box>
                </>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/home_rymindr.png')} />
            </ListItemAvatar>
            <ListItemText
              primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…"
              secondary={
                <>
                  <Box flexDirection="row" mt={1}>
                    <EventIconStyled />
                    {'Tuesday 05 May 2020'}

                    <ScheduleIconStyled />
                    {'12:00'}
                  </Box>
                </>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/motor_rymindr.png')} />
            </ListItemAvatar>
            <ListItemText
              primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…"
              secondary={
                <>
                  <Box flexDirection="row" mt={1}>
                    <EventIconStyled />
                    {'Tuesday 05 May 2020'}

                    <ScheduleIconStyled />
                    {'12:00'}
                  </Box>
                </>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </CardPaperStyled>
  );
};

export default UpcomingRymindr;
