import React from 'react';
import { makeStyles, styled } from '@material-ui/core/styles';
import { Grid, Box, Typography, Button, CardMedia, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import IntegrationsIcon from '../../assets/images/integrations.png';

  
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
    paddingTop: "8%"
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
            Integrations
        </TypoHeadStyled>
        <Paper className={classes.contentArea}>
          <Box className={classes.content}>
            <CardMedia
              className={classes.icon}
              image={IntegrationsIcon}
              title="Integrations"
              component="img"
            />
            <TypoHeadStyled variant='h5'>
                COMING SOON
            </TypoHeadStyled>
            <Typography className={classes.commingSoonDesc}>
                We’re working with some brilliant businesses to enable Rymindr to be plugged in quick and easily, including MIS and CRM providers.
            </Typography>
            <Button variant="contained" size="large" className={classes.notifyMeButton}>
              NOTIFY ME
            </Button>
          </Box>
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