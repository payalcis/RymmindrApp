import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button, CardMedia, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import rewardsIcon from '../../assets/images/rewards.png';

  
const TypoHeadStyled = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 20
}));

const useStyles = makeStyles((theme) => ({
  icon: {
    width: 150,
    marginBottom: 40
  },
  content: {
    textAlign: "center",
    textAlign: "-webkit-center",
    paddingTop: "15%"
  },
  contentArea: {
    height: "80vh",
    borderRadius: 15
  },
  notifyMeButton: {
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
    width: 200,
    cursor: 'auto',
    "&:hover": {
      backgroundColor: theme.palette.warning.main
    }
  },
  commingSoonDesc: {
    marginBottom: 20,
    fontSize: 14,
    width: "40%"
  }
}));

// class Payments extends React.Component {  
function Payments () {
  const classes = useStyles();
  
    return (
      <>
        <TypoHeadStyled variant='h4'>
            Rewards
        </TypoHeadStyled>
        <Paper className={classes.contentArea}>
        <div style={{margin:'auto'}}>
          <Box className={classes.content} style={{position:'relative',top:'-180px',left:'-1rem'}}>
            <CardMedia
              className={classes.icon}
              image={rewardsIcon}
              title="rewards"
              component="img"
            />
            <TypoHeadStyled variant='h5'>
                COMING SOON
            </TypoHeadStyled>
            <Typography className={classes.commingSoonDesc}>
            We’ll be launching Rymindr Rewards for all users. 
            Awesome businesses are supporting us with Rymindr Smiles, 
            so together we’ll be offering rewards.  From discounts off cups of coffee to freebies. <br/><br/>
            Keep an eye out, this is exciting!
            </Typography>
            <Button variant="contained" size="large" className={classes.notifyMeButton}>
              NOTIFY ME
            </Button>
          </Box>
          </div>
        </Paper>
      </>
    )
}

//export default RightContent;
const mapStateToProps = (state) => {
  return {
    rymindrList : state.messageCenterReducer.rymindrList
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // getRymindrListCalendar: (data) =>dispatch(getRymindrListCalendar(data))
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Payments));