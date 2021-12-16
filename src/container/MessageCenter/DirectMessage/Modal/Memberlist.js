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
import React, { useState , useEffect, useMemo} from 'react'
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
  }
}))

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center'
  }
}))

const TabComponent = (props) => {
  const { handleToggles, handleMemberToggle, groupdata, checkOnSelectAllMembers,checkOnSelectAllGroup, memberdata, handleToTagvalue, checked, memberchecked } = props;
  // let { checked } = props;
  // checked = checked.map(Number);

  // let { memberchecked } = props;
  // memberchecked = memberchecked.map(Number);

  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState([])
  const [phoneErr, setPhoneErr] = useState(false)
  var [checkedForAllMembers, setCheckedForAllMembers] = useState(0)
  var [checkedForAllGroup, setCheckedForAllGroup] = useState(0)
  var [changed_member_data , setchanged_member_data] = useState([])

  const [groupArr, setGroupArr] = useState(groupdata)
  const [memberArr, setMemberArr] = useState(memberdata)

  const handleChange = (event, newValue) => {
    //alert('newvalue'+newValue)
    setValue(newValue)
  }
  const handleMemberToggles = (value) => () => {
    //alert('value'+value);
    if(value == 0){
      if(checkedForAllMembers%2 == 1 && checkedForAllMembers!==0 && checkOnSelectAllMembers== true){
        handleMemberToggle(3)
      }else{
        handleMemberToggle(0)
      }
      setCheckedForAllMembers(++checkedForAllMembers)
    }
    else if(value == 1){

      if(checkedForAllGroup%2 == 1 && checkedForAllGroup!==0  && checkOnSelectAllGroup== true){
        handleMemberToggle(4)
      }else{
        handleMemberToggle(1)
      }

      setCheckedForAllGroup(++checkedForAllGroup)
    }
    else{
      setCheckedForAllMembers(++checkedForAllMembers)
      handleMemberToggle(value)
    }

  }

  const handleGroupToggle = (value) => () => {
    //alert('vvvvv'+value);
    setCheckedForAllGroup(++checkedForAllGroup)
    handleToggles(value)
    var member_array = (value.group_members).split(",");
  }

  useMemo(() => {
    setchanged_member_data(memberdata)
    //alert('setmember'+changed_member_data);
  }, [memberdata]);

  useEffect(() => {
    setGroupArr(groupdata)
    setMemberArr(memberdata)
}, [groupdata, memberdata]);


  const handleTag = (e) => {
    const value = e.target.value
    //console.log('dsds', groupdata);
    //console.log('newVal', newvalue);
    const copied_groupdata = [...groupdata];
    const copied_memberdata = memberdata.length > 0 ? [...memberdata] : [];
    if(value){
      // Filter them
      let filteredGroupArr = copied_groupdata.filter(o => o.group_name.toLowerCase().includes(value.toLowerCase()));
      //console.log('filteredArr',filteredArr);
      setGroupArr(filteredGroupArr)
      // Update the state

      let filteredMemberArr = copied_memberdata.filter(o => o.first_name.toLowerCase().includes(value.toLowerCase()));
      //console.log('filteredArr',filteredArr);
      setMemberArr(filteredMemberArr)
      // Update the state
    }
    else{
      setGroupArr(groupdata)
      setMemberArr(memberdata)
    }

    /*var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/
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
    }*/
  }

  //console.clear();
  console.log('checked: ', checked);
  console.log('memberchecked: ', memberchecked);

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
          /*onChange={handleTag}*/
          onKeyUp={handleTag}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Search by mobile number'
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
        {(memberArr.length > 0)? <List dense className={classes.root}>
        <ListItem button>
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText primary="Select All" />
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
          {memberArr.map((value, key) => {
            const labelId = `checkbox-list-secondary-label-${value}`
            return (
              <>
                <ListItem key={key} button>
                  <ListItemAvatar>
                    <Avatar alt={value.first_name} src={value.profile_image} />
                  </ListItemAvatar>
                  <ListItemText id={labelId} primary={value.first_name !== '' ? `${value.first_name} ${value.last_name}` : `${value.mobile_no}`} />
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
        </List>:<List dense>
        <ListItem button>
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText primary="No Record Found" />
                  <ListItemSecondaryAction>

                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant='inset' component='li' />
                </List>
                }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {(groupArr.length > 0)?<List dense>
        <ListItem button>
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText primary="Select All" />
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
          {groupArr.map((value, key) => {
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
                  <ListItemAvatar>
                  </ListItemAvatar>
                  <ListItemText primary="No Record Found" />
                  <ListItemSecondaryAction>

                  </ListItemSecondaryAction>
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
  checkOnSelectAllMembers:PropTypes.bool.isRequired,
  checkOnSelectAllGroup:PropTypes.bool.isRequired,
  memberdata: PropTypes.array.isRequired,
  handleToTagvalue: PropTypes.func.isRequired
}

export default TabComponent
