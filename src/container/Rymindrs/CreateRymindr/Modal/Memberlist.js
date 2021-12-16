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
import React, { useState , useMemo } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import PropTypes from 'prop-types'
import { makeStyles, styled, withStyles } from '@material-ui/core/styles'
import { GroupSharp } from '@material-ui/icons'

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
  },
  nameMobile: {
    display: 'block',
    flexDirection: 'column'
  }
}))

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center'
  }
}))

const TabComponent = (props) => {
  const { handleToggles, handleMemberToggle, groupdata, checkOnSelectAllMembers, checkOnSelectAllGroup, memberdata, handleToTagvalue, checked, memberchecked } = props

  // let { checked } = props;
  // checked = checked.map(Number);

  // let { memberchecked } = props;
  // memberchecked = memberchecked.map(Number);

  // console.clear()
  console.log('checked: ', checked)
  console.log('memberchecked: ', memberchecked)

  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState([])
  const [phoneErr, setPhoneErr] = useState(false)
  var [checkedForAllMembers, setCheckedForAllMembers] = useState(0)
  var [checkedForAllGroup, setCheckedForAllGroup] = useState(0)
  var [changed_member_data, setchanged_member_data] = useState([])
  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'))

  var [tempMemberData, setTempMemberData] = useState(memberdata)
  var [tempGroupdata, setTempGroupdata] = useState(groupdata)
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleMemberToggles = (value) => () => {
    if (value == 0) {
      if (checkedForAllMembers % 2 == 1 && checkedForAllMembers !== 0 && checkOnSelectAllMembers == true) {
        handleMemberToggle(3)
      }else {
        handleMemberToggle(0)
      }

      setCheckedForAllMembers(++checkedForAllMembers)
    } else if (value == 1) {
      if (checkedForAllGroup % 2 == 1 && checkedForAllGroup !== 0 && checkOnSelectAllGroup == true) {
        handleMemberToggle(4)
      }else {
        handleMemberToggle(1)
      }
      console.log(checkedForAllGroup)
      setCheckedForAllGroup(++checkedForAllGroup)
    } else {
      setCheckedForAllMembers(++checkedForAllMembers)
      handleMemberToggle(value)
    }
  }

  const handleGroupToggle = (value) => () => {
    setCheckedForAllGroup(++checkedForAllGroup)
    handleToggles(value)
  }
  useMemo(() => {
    setchanged_member_data(memberdata)
  }, [memberdata])

  const handleTag = (e) => {
    const newvalue = e.target.value

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

  const handleSearch = (e) => {
    let tempMemberData = memberdata;
    let tempGroupdata = groupdata;

    let temp = [];
    let tempGroup = [];

    if (isNaN(e.target.value) == false) {
      if ((e.target.value).length < 14) {
        if((e.target.value).length > 6) {
          memberdata.map((data, i) => {
            if(data.mobile_no.includes(e.target.value)) {
              temp.push(data)
            }
            else {
              return true
            }
          })

          groupdata.map((data, i) => {
            if((data.group_name).toLowerCase().includes((e.target.value).toLowerCase())) {
              tempGroup.push(data)
            }
            else {
              return true
            }
          })

          setTempMemberData(temp)
          setTempGroupdata(tempGroup)

        } 
        else {
          setTempMemberData(tempMemberData)
          setTempGroupdata(tempGroupdata)
        }       
      }
    }
    else {
      if((e.target.value).length > 3) {
        memberdata.map((data, i) => {
          
          if(((data.first_name + ' ' +data.last_name).toLowerCase()).includes((e.target.value).toLowerCase())) {
            temp.push(data)
          }
          else {
            setTempMemberData(tempMemberData)
          }
        })

        groupdata.map((data, i) => {
          if((data.group_name).toLowerCase().includes((e.target.value).toLowerCase())) {
            tempGroup.push(data)
          }
          else {
            return true
          }
        })

        setTempMemberData(temp)
        setTempGroupdata(tempGroup)
      } 
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
              placeholder='Search by mobile number or name'
              variant='outlined'
              margin='normal'
              error={phoneErr}
              onChange={(e) => handleSearch(e)}
              helperText={phoneErr && 'Not a valid number.'}
            />
          )}
        />
      </Box>
      <TabPanel value={value} index={0}>
        {(tempMemberData.length > 0) ? <List dense className={classes.root}>
          <ListItem button>
            <ListItemAvatar />
            <ListItemText primary='Select All' />
            <ListItemSecondaryAction>
              <Checkbox
                edge='end'
                onChange={handleMemberToggles(0)}
                checked={checkOnSelectAllMembers}

                // inputProps={{ 'aria-labelledby': labelId }}
                color='primary'
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant='inset' component='li' />
          {tempMemberData.map((value, key) => {
            if (value.user_id === user_id) {} else {
              const labelId = `checkbox-list-secondary-label-${value}`
              return (
                <>
                  <ListItem key={key} button>
                    <ListItemAvatar>
                      <Avatar alt={value.first_name} src={value.profile_image} />
                    </ListItemAvatar>
                    {
                      value.first_name ?
                        <ListItem className={classes.nameMobile}>
                          <ListItemText id={labelId} primary={`${value.first_name} ${value.last_name}`} />
                          <ListItemText id={labelId} primary={value.mobile_no} />
                        </ListItem>
                      :
                        <ListItemText id={labelId} primary={value.mobile_no} />
                    }
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
            }
          })}
                                  </List>:<List dense>
          <ListItem button>
            <ListItemAvatar />
            <ListItemText primary='No Record Found' />
            <ListItemSecondaryAction />
          </ListItem>
          <Divider variant='inset' component='li' />
        </List>}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {(tempGroupdata.length > 0) ? <List dense>
          <ListItem button>
            <ListItemAvatar />
            <ListItemText primary='Select All' />
            <ListItemSecondaryAction>
              <Checkbox
                edge='end'
                onChange={handleMemberToggles(1)}
                checked={checkOnSelectAllGroup}
                // inputProps={{ 'aria-labelledby': labelId }}
                color='primary'
              />
            </ListItemSecondaryAction>
          </ListItem>
          <Divider variant='inset' component='li' />
          {tempGroupdata.map((value, key) => {
            // console.log(value)
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
                                </List>:<List dense>
          <ListItem button>
            <ListItemAvatar />
            <ListItemText primary='No Record Found' />
            <ListItemSecondaryAction />
          </ListItem>
          <Divider variant='inset' component='li' />
        </List>}

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
  checkOnSelectAllMembers: PropTypes.bool.isRequired,
  checkOnSelectAllGroup: PropTypes.bool.isRequired,
  memberdata: PropTypes.array.isRequired,
  handleToTagvalue: PropTypes.func.isRequired
}

export default TabComponent
