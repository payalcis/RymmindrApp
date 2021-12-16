import {
  Avatar,
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Tab,
  Tabs,
  TextField,
  Typography, Divider
} from '@material-ui/core'
import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import { makeStyles, styled, withStyles } from '@material-ui/core/styles'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>{children}
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center'
  }
}))

const TabComponent = (props) => {
  const { handleToggles, handleMemberToggle, checked, groupdata, memberchecked, memberdata, handleToTagvalue } = props
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState([])
  const [phoneErr, setPhoneErr] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleMemberToggles = (value) => () => {
    handleMemberToggle(value)
  }

  const handleGroupToggle = (value) => () => {
    handleToggles(value)
  }

  const handleTag = (e) => {
    console.log(e)
    const newvalue = e.target.value
    console.log(newvalue)
    var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/
    if (filter.test(newvalue)) {
      var phn = newvalue.length
      if (phn == 11) {
        const newNumber = [...phoneNumber, newvalue]
        setPhoneNumber(Array.from(new Set(newNumber)))
        handleToTagvalue(Array.from(new Set(newNumber)))
        setPhoneErr(false)
      } else {
        setPhoneErr(true)
      }
    } else {
      setPhoneErr(true)
    }
  }

  return (
    <div className={classes.root}>
      <TabsStyles
        value={value}
        onChange={handleChange}
        aria-label='simple tabs example'
        indicatorColor='primary'
        textColor='primary'
        variant='fullWidth'
      >
        <Tab label='Members' />
        <Tab label='Groups' />
      </TabsStyles>
      <Box>
        <Autocomplete
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
              error={phoneErr}
              onChange={() => setPhoneErr(false)}
              helperText={phoneErr && 'Not a valid number.'}
            />
          )}
        />
      </Box>
      <TabPanel value={value} index={0}>
        <List dense className={classes.root}>
          {memberdata.map((value, key) => {
            const labelId = `checkbox-list-secondary-label-${value}`
            return (
              <>
                <ListItem key={key} button>
                  <ListItemAvatar>
                    <Avatar alt={value.first_name} src={value.profile_image} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={`${value.first_name} ${value.last_name}`} />
                  <ListItemSecondaryAction>
                    <Checkbox
                      edge='end'
                      onChange={handleMemberToggles(value)}
                      checked={memberchecked.indexOf(value.user_id) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                      color='primary'
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant='inset' component='li' />
              </>
            )
          })}
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List dense>
          {groupdata.map((value, key) => {
            const labelId = `checkbox-list-secondary-label-${value}`
            return (
              <ListItem key={key} button>
                <ListItemAvatar>
                  <Avatar alt={value.group_name} src={value.group_icon} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.group_name}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge='end'
                    onChange={handleGroupToggle(value)}
                    checked={checked.indexOf(value.group_id) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    color='primary'
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </TabPanel>
    </div>
  )
}

TabComponent.propTypes = {
  handleToggles: PropTypes.func.isRequired,
  handleMemberToggle: PropTypes.func.isRequired,
  checked: PropTypes.array.isRequired,
  groupdata: PropTypes.array.isRequired,
  memberchecked: PropTypes.array.isRequired,
  memberdata: PropTypes.array.isRequired,
  handleToTagvalue: PropTypes.func.isRequired
}

export default TabComponent
