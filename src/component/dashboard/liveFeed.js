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
} from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';
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
const AvatarFeedStyled = styled(Avatar)({
  height: 72,
  width: 126,
  marginRight: 10,
});
const CardPaperStyled = styled(Card)(() => ({
  height: '100%',
}));
const LiveFeed = () => {
  const classes = useStyles();
  return (
    <CardPaperStyled>
      <CardHeader title="Live Feed" action={<Button>View all</Button>} className="cardHeader" />
      <CardContent>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarFeedStyled
                alt="semy Sharp"
                variant="rounded"
                src={require('../../assets/images/feedavatar.png')}
              />
            </ListItemAvatar>
            <ListItemText
              primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni…"
              secondary={<img src={require('../../assets/images/feed_image.png')} style={{ marginTop: 6 }} />}
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarFeedStyled
                alt="semy Sharp"
                variant="rounded"
                src={require('../../assets/images/feedavatar.png')}
              />
            </ListItemAvatar>
            <ListItemText
              primary="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut eni…"
              secondary={<img src={require('../../assets/images/feed_image.png')} style={{ marginTop: 6 }} />}
            />
          </ListItem>
        </List>
      </CardContent>
    </CardPaperStyled>
  );
};

export default LiveFeed;
