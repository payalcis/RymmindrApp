import { Visibility, Replay, Send, AddCircle, Cancel } from '@material-ui/icons'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Switch,
  TextField,
  Typography,
  Radio,
  RadioGroup, Divider,
  FormControl, FormLabel, IconButton
} from '@material-ui/core'
import { DatePicker, MuiPickersUtilsProvider, TimePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import { makeStyles, styled } from '@material-ui/core/styles'
import MomentUtils from '@date-io/moment'
import Autocomplete from '@material-ui/lab/Autocomplete'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    position: 'relative'
  }
}))
export default function EventBooking () {
  const [selectedValue, setSelectedValue] = React.useState('a')

  const handleRadioChange = (event) => {
    setSelectedValue(event.target.value)
  }

  const [phoneNumber, setPhoneNumber] = useState([])
  const handleTag = (e) => {
    const newNumber = [...phoneNumber, e.target.value]
    setPhoneNumber(Array.from(new Set(newNumber)))
  }

  const [state, setState] = useState({
    checkedB: true,
    switch: true
  })

  const [selectedDate, handleDateChange] = useState(new Date())
  const [selectedTime, handleTimeChange] = useState(new Date())

  const TypoHeadStyled = styled(Typography)(({ theme }) => ({
    fontSize: 24,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold'
  }))

  const TypoHeadInnerStyled = styled(TypoHeadStyled)(({ theme }) => ({
    color: theme.palette.text.primary
  }))

  const PaperStyled = styled(Paper)({
    padding: '35px 15px',
    height: 100 + '%'
  })

  const GridStyled = styled(Grid)(({ theme }) => ({
    paddingLeft: '6rem',
    paddingRight: '6rem',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '5rem',
      paddingRight: '5rem'
    },

    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2rem'
    }
  }))

  const GridVioletStyled = styled(Grid)({
    padding: '10px 0',
    height: 100 + '%',
    background: '#edf8fe',
    borderRadius: 15,
    minHeight: 210,
    position: 'relative'
  })

  const AutocompleteStyled = styled(Autocomplete)({
    height: 154,
    '&>div': {
      margin: 0,
      '&>div': { height: 154, alignItems: 'flex-start' }
    }
  })

  const ButtonAddStyled = styled(Button)({
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: '2rem',
    '& svg': {
      fontSize: '28px !important'
    }
  })

  const currencies = [
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: '€'
    }
  ]

  const category = [
    {
      value: 'USD',
      label: '$'
    },
    {
      value: 'EUR',
      label: 'Parents Evening'
    }
  ]

  const [currency, setCurrency] = React.useState('EUR')

  const handleChange = (event) => {
    setCurrency(event.target.value)
  }

  const ButtonColor = styled(Button)(({ theme }) => ({
    background: theme.palette.props.main,
    color: theme.palette.props.contrastText
  }))

  const ButtonWarn = styled(Button)(({ theme }) => ({
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText
  }))

  const IconButtonStyled = styled(IconButton)(({ theme }) => ({
    color: theme.palette.error.main,
    position: 'absolute',
    right: -15,
    top: -15,
    cursor: 'pointer',
    '& svg': {
      width: '2.3rem',
      height: '2.3rem'
    }
  }))

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container style={{ marginBottom: 20 }} alignItems='center'>
          <Grid item xs={7}>
            <TypoHeadStyled variant='h4'>
              Parents’ <TypoHeadInnerStyled component='span'>Evening booking</TypoHeadInnerStyled>
            </TypoHeadStyled>
          </Grid>
          <Grid item xs={5}>
            <Box display='flex' justifyContent='flex-end'>
              <Button variant='contained' color='primary' size='large' startIcon={<Replay />}>
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>

        <PaperStyled>

          <GridStyled container spacing={5}>
            <Grid item xs={6}>
              <AutocompleteStyled
                multiple
                id='tags-filled'
                filterSelectedOptions={false}
                options={[]}
                freeSolo
                value={phoneNumber}
                onChange={handleTag}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder='Type Number and Enter to Add'
                    variant='outlined'
                    margin='normal'
                    rows={4}
                    label='To'
                    // error={phoneErr}
                    // onChange={() => setPhoneErr(false)}
                    // helperText={phoneErr && 'Not a valid number.'}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField label='Subject' fullWidth variant='outlined' className='mb-40' />

              <TextField
                select
                label='Category'
                value={currency}
                fullWidth
                onChange={handleChange}
                variant='outlined'
              >
                {category.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <GridVioletStyled container spacing={5}>
                <Grid item xs={3}>
                  <DatePicker
                    label='Meeting Date'
                    inputVariant='outlined'
                    value={selectedDate}
                    onChange={handleDateChange}
                    animateYearScrolling
                    format='MM/DD/YYYY'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    select
                    label='Slot Duration'
                    value={currency}
                    fullWidth
                    onChange={handleChange}
                    variant='outlined'
                  >
                    {category.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='Start Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='End Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>Would you like to create a comfort break for this session?</Typography>
                    <Box>
                      <FormControlLabel value='yes' control={<Radio color='primary' />} label='Yes' />
                      <FormControlLabel value='no' control={<Radio color='primary' />} label='No' />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='Start Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='End Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
              </GridVioletStyled>
            </Grid>

            <Grid item xs={12} className='mt-30'>
              <GridVioletStyled container spacing={5}>
                <IconButtonStyled color='primary' component='span' size='large'>
                  <Cancel />
                </IconButtonStyled>
                <Grid item xs={3}>
                  <DatePicker
                    label='Meeting Date'
                    inputVariant='outlined'
                    value={selectedDate}
                    onChange={handleDateChange}
                    animateYearScrolling
                    format='MM/DD/YYYY'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    select
                    label='Slot Duration'
                    value={currency}
                    fullWidth
                    onChange={handleChange}
                    variant='outlined'
                  >
                    {category.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='Start Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='End Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography>Would you like to create a comfort break for this session?</Typography>
                    <Box>
                      <FormControlLabel value='yes' control={<Radio color='primary' />} label='Yes' />
                      <FormControlLabel value='no' control={<Radio color='primary' />} label='No' />
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='Start Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={3}>
                  <TimePicker
                    inputVariant='outlined'
                    label='End Time'
                    value={selectedTime}
                    onChange={handleTimeChange}
                    fullWidth
                  />
                </Grid>
              </GridVioletStyled>

            </Grid>

            <Grid item xs={12}>
              <ButtonAddStyled startIcon={<AddCircle />} color='primary'>Add another day</ButtonAddStyled>
              <Divider className='mt-30 mb-20' />
            </Grid>

            <Grid item xs={4}>
              <DatePicker
                label='Set Date'
                inputVariant='outlined'
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling
                format='MM/DD/YYYY'
                fullWidth
              />
            </Grid>
            <Grid item xs={8}>
              <Box display='flex' alignItems='center'>
                <Typography className='mr-30'>Allow parents to add a comment to their booking?</Typography>
                <Box>
                  <FormControlLabel value='yes' control={<Radio color='primary' />} label='Yes' />
                  <FormControlLabel value='no' control={<Radio color='primary' />} label='No' />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField label='Message' fullWidth variant='outlined' />
            </Grid>

            <Grid item xs={12}>
              <Box display='flex' justifyContent='flex-end'>
                <ButtonColor variant='contained' color='primary' size='large' className='mr-30 width180' startIcon={<Visibility />}>
                  Preview
                </ButtonColor>

                <ButtonWarn variant='contained' color='primary' size='large' startIcon={<Send />}>
                  Send Rymindr
                </ButtonWarn>
              </Box>
            </Grid>
          </GridStyled>
        </PaperStyled>
      </MuiPickersUtilsProvider>
    </>
  )
}
