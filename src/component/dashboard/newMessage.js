import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import React from 'react';
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

const TypoNameStyled = styled(Typography)({
  color: '#b3bcc3',
  fontWeight: 600,
});

const TypoTimeStyled = styled(Typography)({
  color: '#b3bcc3',
  float: 'right',
});
const CardPaperStyled = styled(Card)(() => ({
  height: '100%',
}));
const NewMessage = () => {
  const classes = useStyles();
  return (
    <CardPaperStyled>
      <CardHeader title="New Message" action={<Button href="/notification">View all</Button>} className="cardHeader" />
      <CardContent>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/profile.jpeg')} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Box width="100%">
                    <TypoNameStyled variant="body2" component="span">
                      Mark Rafel
                    </TypoNameStyled>
                    <TypoTimeStyled variant="caption">Sent a message at 10:56 am</TypoTimeStyled>
                  </Box>
                </>
              }
              secondary={
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/profile.jpeg')} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Box width="100%">
                    <TypoNameStyled variant="body2" component="span">
                      Mark Rafel
                    </TypoNameStyled>
                    <TypoTimeStyled variant="caption">Sent a message at 10:56 am</TypoTimeStyled>
                  </Box>
                </>
              }
              secondary={
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/profile.jpeg')} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Box width="100%">
                    <TypoNameStyled variant="body2" component="span">
                      Mark Rafel
                    </TypoNameStyled>
                    <TypoTimeStyled variant="caption">Sent a message at 10:56 am</TypoTimeStyled>
                  </Box>
                </>
              }
              secondary={
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarStyled alt="semy Sharp" src={require('../../assets/images/profile.jpeg')} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <>
                  <Box width="100%">
                    <TypoNameStyled variant="body2" component="span">
                      Mark Rafel
                    </TypoNameStyled>
                    <TypoTimeStyled variant="caption">Sent a message at 10:56 am</TypoTimeStyled>
                  </Box>
                </>
              }
              secondary={
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incid…
                </Typography>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </CardPaperStyled>
  );
};

export default NewMessage;
