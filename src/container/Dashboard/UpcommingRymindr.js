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
  Typography,
} from '@material-ui/core';

import { makeStyles, styled } from '@material-ui/core/styles';
import EventIcon from '@material-ui/icons/Event';
import PropTypes from 'prop-types';
import React from 'react';
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      maxWidth: 800
    }
  }
}));

const CardPaperStyled = styled(Card)(({ theme }) => ({
  height: '100%',
}));

const TypoHeadingStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  textTransform: 'uppercase',
  fontWeight: 700,
}));
const AvatarStyled = styled(Avatar)({
  height: 55,
  width: 55,
  marginRight: 10,
});

const TypoRymTimeStyled = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: 'rgba(64, 87, 106, 0.55)',
}));

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

const UpcommingRymindr = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <CardPaperStyled>
      <CardHeader
        title={ <TypoHeadingStyled component="span">Upcoming rymindrs</TypoHeadingStyled> }
        action={<Button onClick={() => history.push('/rymindrs')}>View all</Button>}
        className="cardHeader"
      />
      <CardContent>
        <List className={classes.root}>
          {props.data.length > 0 ?
          (props.data.map((item, index) => {
            return (
              <ListItem onClick={() => history.push('/rymindrs')} alignItems="flex-start" key={index}>
                <ListItemAvatar>
                  <AvatarStyled alt="semy Sharp" src={item.category_image} />
                </ListItemAvatar>
                <ListItemText                  
                  // primary={item.note}
                  primary={<Typography type="body2" style={{ display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', }}>
                      {/* <div class="text-container"> */}
                        {/* {parse(item.note)} */}
                        {item.note.replace(/<(.|\n)*?>/g, '').replace(/\&nbsp;/g, '')}
                      {/* </div> */}
                    </Typography>}
                  secondary={
                    <Box flexDirection="row" mt={1}>
                      <TypoRymTimeStyled variant="caption">
                        <EventIconStyled />
                        {moment(item.rymindr_date).format('dddd DD MMMM YYYY')}

                        <ScheduleIconStyled />
                        {moment(item.rymindr_date + ' ' + item.rymindr_time).format('h:ss')}
                      </TypoRymTimeStyled>
                    </Box>
                  }
                  
                />
              </ListItem>
            );
          }))
          :
          <Typography variant="body1">No upcoming Rymindrs.</Typography>
            
        }
        </List>
      </CardContent>
    </CardPaperStyled>
  );
};

UpcommingRymindr.propTypes = {
  data: PropTypes.any.isRequired,
};

export default UpcommingRymindr;
