import Avatar from '@material-ui/core/Avatar';
import PropTypes from 'prop-types';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    padding: theme.spacing(0),
  },

  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatarbackgroud: {
    background: (props) => props.bgcolor,
  },
}));

const UserAvatar = ({ size, username, displayPic, bgcolor }) => {
  const props = { bgcolor };
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Avatar
        alt={username}
        src={displayPic}
        color="primary"
        className={`${classes[size]} ${classes.avatarbackgroud}`}
      />
    </div>
  );
};

UserAvatar.propTypes = {
  size: PropTypes.oneOf(['small', 'large']),
  username: PropTypes.string,
  displayPic: PropTypes.string.isRequired,
  bgcolor: PropTypes.oneOf(['transparent', 'default']),
};

UserAvatar.defaultProps = {
  size: 'small',
  username: 'unknown',
  bgcolor: 'transparent',
};

export default UserAvatar;
