import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button, CardMedia, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FundIcon from '../../assets/images/fund.png';

  
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
    fontSize: 14
  }
}));

// class Payments extends React.Component {  
function Payments () {
  const classes = useStyles();
  
    return (
      <>
        <TypoHeadStyled variant='h4'>
            Fund Raisers
        </TypoHeadStyled>
        <Paper className={classes.contentArea}>
        <div style={{margin:'auto'}}>
          <Box className={classes.content} style={{position:'relative',top:'-170px',left:'-1rem'}}>
            <CardMedia
              className={classes.icon}
              image={FundIcon}
              title="Fund Raisers"
              component="img"
            />
            <TypoHeadStyled variant='h5'>
                COMING SOON
            </TypoHeadStyled>
            <Typography className={classes.commingSoonDesc}>
              Free fundraising for the people and causes you care about. 
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