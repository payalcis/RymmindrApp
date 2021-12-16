import { Box, Grid, Paper, Typography } from '@material-ui/core';
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

const TypoWeekStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
}));

const TypoWeekDayStyled = styled(Typography)(() => ({
  fontSize: 18,
  color: '#1773BF',
  fontWeight: 'bold',
  marginTop: 5,
}));

const TypoTodayStyled = styled(Typography)(() => ({
  fontSize: 12,
  color: 'rgba(64, 87, 106, 0.55)',
  marginTop: 5,
  position: 'absolute',
  top: 10,
  marginLeft: -20,
  textTransform: 'uppercase',
}));
const TypoRymdStyled = styled(Typography)(() => ({
  fontSize: 16,
  color: '#FF8A00',
  fontWeight: 'bold',
  position: 'absolute',
  bottom: 10,
  marginLeft: -42,
}));

const TypoGoToStyled = styled(Typography)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.primary,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  marginRight: 20,
}));

const WeekBoxStyled = styled(Box)(({ theme }) => ({
  width: '14%',
  borderRadius: 10,
  padding: '10px 0',
  marginBottom: 40,
  '&.active': {
    background: theme.palette.primary.main,
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.16)',
    '& p': {
      color: '#fff',
    },
  },
}));
const RymindrCalendar = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ marginBottom: 30 }}
      >
        <Grid container item xs={6} spacing={3}>
          <TypoWeekDayStyled style={{ marginLeft: 20 }}>Current Week</TypoWeekDayStyled>
        </Grid>
        <Grid container item xs={6} spacing={3} justify="flex-end">
          <TypoGoToStyled>Go to Calendar</TypoGoToStyled>
        </Grid>
      </Grid>

      <Grid container spacing={1} direction="row" justify="space-between" alignItems="center">
        <Grid container item spacing={3} justify="center">
          <WeekBoxStyled>
            <TypoWeekStyled>Mon</TypoWeekStyled>
            <TypoWeekDayStyled>23</TypoWeekDayStyled>
          </WeekBoxStyled>
          <WeekBoxStyled>
            <TypoWeekStyled>Tue</TypoWeekStyled>
            <TypoWeekDayStyled>24</TypoWeekDayStyled>
          </WeekBoxStyled>
          <WeekBoxStyled>
            <TypoWeekStyled>wed</TypoWeekStyled>
            <TypoWeekDayStyled>25</TypoWeekDayStyled>
          </WeekBoxStyled>
          <WeekBoxStyled className="active">
            <TypoTodayStyled component="span">Today</TypoTodayStyled>
            <TypoWeekStyled>thu</TypoWeekStyled>
            <TypoWeekDayStyled>26</TypoWeekDayStyled>
            <TypoRymdStyled component="span">3 Rymindrs</TypoRymdStyled>
          </WeekBoxStyled>
          <WeekBoxStyled>
            <TypoWeekStyled>fri</TypoWeekStyled>
            <TypoWeekDayStyled>27</TypoWeekDayStyled>
          </WeekBoxStyled>
          <WeekBoxStyled>
            <TypoWeekStyled>sat</TypoWeekStyled>
            <TypoWeekDayStyled>28</TypoWeekDayStyled>
          </WeekBoxStyled>
          <WeekBoxStyled>
            <TypoWeekStyled>sun</TypoWeekStyled>
            <TypoWeekDayStyled>29</TypoWeekDayStyled>
          </WeekBoxStyled>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RymindrCalendar;
