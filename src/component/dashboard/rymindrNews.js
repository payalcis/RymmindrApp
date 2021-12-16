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
const TypoNameStyled = styled(Typography)({
  color: '#b3bcc3',
  fontWeight: 600,
});
const CardPaperStyled = styled(Card)(() => ({
  height: '100%',
}));
const RymindrNews = () => {
  const classes = useStyles();
  return (
    <CardPaperStyled>
      <CardHeader title="Rymindr news" action={<Button>View all</Button>} className="cardHeader" />
      <CardContent>
        <List className={classes.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarFeedStyled
                alt="semy Sharp"
                variant="rounded"
                src={require('../../assets/images/rymindrnews.png')}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <TypoNameStyled variant="body2" component="span">
                  Message Subject
                </TypoNameStyled>
              }
              secondary={
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut eni…
                </Typography>
              }
            />
          </ListItem>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AvatarFeedStyled
                alt="semy Sharp"
                variant="rounded"
                src={require('../../assets/images/rymindrnews.png')}
              />
            </ListItemAvatar>
            <ListItemText
              primary={
                <TypoNameStyled variant="body2" component="span">
                  Message Subject
                </TypoNameStyled>
              }
              secondary={
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua. Ut eni…
                </Typography>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </CardPaperStyled>
  );
};

export default RymindrNews;
