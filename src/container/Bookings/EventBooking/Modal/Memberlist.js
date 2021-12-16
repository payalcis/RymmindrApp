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
import React, { useState,useEffect } from 'react'
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
  },
  selectAll: {
    textAlign: 'right',
    // fontWeight: 'bold',
    fontSize: 16
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
  const { handleToggles, handleMemberToggle,handleAllMembersToggle , handleAllGroupMembersToggle, checked, groupdata, memberchecked, memberdata, handleToTagvalue } = props
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState([])
  const [phoneErr, setPhoneErr] = useState(false)
  const [isAllMember, setIsAllMember] = useState(false)
  const [isAllGroupMember, setIsAllGroupMember] = useState(false)

  var [tempMemberData, setTempMemberData] = useState(memberdata)
  var [tempGroupdata, setTempGroupdata] = useState(groupdata)

  var [getGroupContacts, setGroupContacts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const handleMemberToggles = (value) => () => {
    handleMemberToggle(value)
    console.log('value__',value)
  }

  const handleSelectMember = () => {
    setIsAllMember(!isAllMember)
  //  console.warn('isAllMember111', isAllMember);
    if(!isAllMember) {
      memberdata.map((data, i) => {
        if(memberchecked.indexOf(data.user_id) == -1) {
          memberchecked.push(data.user_id)
          console.log('execute',isAllMember)
        }
      })
    }
    else {
      memberchecked.splice(0, memberchecked.length)
    }
    console.warn('memberchecked333', memberchecked);
    handleAllMembersToggle(memberchecked)
  }
  
  
  useEffect(() => {
    let getGroupContacts= [];
    checked.map((data, i) => {
      let getContacts = tempGroupdata.filter(a=>a.group_id==data);
      if(getContacts && getContacts[0]){
        let result = getContacts[0].group_member_list.map(a => a.user_id);
        getGroupContacts.push(...result)
      }
    })
    setGroupContacts(getGroupContacts);
  }, [tempGroupdata,checked])

  
  const handleGroupToggle = (value) => () => {
    handleToggles(value)
  }

  // console.warn('checked1111 before', checked);

  const handleSelectGroupMember = () => {
    setIsAllGroupMember(!isAllGroupMember)
    if(!isAllGroupMember) {
    groupdata.map((data, i) => {
      if(checked.indexOf(data.group_id) == -1) {
      checked.push(data.group_id)
      }
    })
  }else
  {
    checked.splice(0, checked.length)
  }
  handleAllGroupMembersToggle(checked)

  console.warn('checked1111 after', checked);
}


  const handleTag = (e) => {
    // console.log(e)
    const newvalue = e.target.value
    // console.log(newvalue)
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
      let tempStr =  (e.target.value).charAt(0) === '0' ? (e.target.value).slice(1) : e.target.value;
      if ((tempStr).length < 14 && tempStr !== undefined) {
        if((tempStr).length > 6) {
          memberdata.map((data, i) => {
            
            if(data.mobile_no.includes(tempStr)) {
              temp.push(data)
            }
            else {
              return true
            }
          })

          groupdata.map((data, i) => {
            if((data.group_name).toLowerCase().includes((tempStr).toLowerCase())) {
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
  
  //console.warn('memberchecked343443', memberchecked);
  
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
              // onChange={() => setPhoneErr(false)}
              onChange={(e) => handleSearch(e)}
              helperText={phoneErr && 'Not a valid number.'}
            />
          )}
        />
      </Box>
      <TabPanel value={value} index={0} >
        <List dense className={classes.root}>
          
          {/* <ListItem key={Math.random()} button>
            <ListItemText className={classes.selectAll} primary="Select All" />
            <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  onChange={handleSelectMember}
                  checked={isAllMember}
                  // inputProps={{ 'aria-labelledby': labelId }}
                  color='primary'
                />
              </ListItemSecondaryAction>
          </ListItem> */}
          {console.log('')}
          <ListItem button onClick={handleSelectMember}>
            <ListItemAvatar />
            <ListItemText primary='Select All' />
            <ListItemSecondaryAction>
              <Checkbox
                edge='end'
                onChange={handleSelectMember}
                checked={isAllMember}
                // inputProps={{ 'aria-labelledby': labelId }}
                color='primary'
              />
            </ListItemSecondaryAction>
          </ListItem>
          {
            
            tempMemberData.length > 0 ?
              tempMemberData.map((value, key) => {
                
               
                let merged = [...memberchecked, ...getGroupContacts];

                //console.warn('checking4545454', memberchecked.indexOf(value.user_id) !== -1, value.user_id, memberchecked, checked);
                const labelId = `checkbox-list-secondary-label-${value}`
                return (
                  <>
                    <ListItem key={key} button onClick={handleMemberToggles(value)}>
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
                      {/* <ListItemText id={labelId} primary={value.first_name !== '' ? (`${value.first_name} ${value.last_name}`) : `${value.mobile_no}`} /> */}

                      <ListItemSecondaryAction>
                        <Checkbox
                          edge='end'
                          onChange={handleMemberToggles(value)}
                          checked={merged.indexOf(value.user_id) !== -1}
                          disabled={getGroupContacts.indexOf(value.user_id) !== -1}
                          inputProps={{ 'aria-labelledby': labelId }}
                          color='primary'
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant='inset' component='li' />
                  </>
                )
              })
            : null
          }
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List dense>
          {/* <ListItem key={Math.random()} button>
            <ListItemText className={classes.selectAll} primary="Select All" />
            <ListItemSecondaryAction>
                <Checkbox
                  edge='end'
                  onChange={handleSelectGroupMember}
                  checked={isAllGroupMember}
                  // inputProps={{ 'aria-labelledby': labelId }}
                  color='primary'
                />
              </ListItemSecondaryAction>
          </ListItem> */}

          <ListItem button onClick={handleSelectGroupMember}>
            <ListItemAvatar />
            <ListItemText primary='Select All' />
            <ListItemSecondaryAction>
              <Checkbox
                edge='end'
                onChange={handleSelectGroupMember}
                checked={isAllGroupMember}
                // inputProps={{ 'aria-labelledby': labelId }}
                color='primary'
              />
            </ListItemSecondaryAction>
          </ListItem>
          {console.log('tempGroupdata--',tempGroupdata)}
          {tempGroupdata.map((value, key) => {
            const labelId = `checkbox-list-secondary-label-${value}`
            
            return (
              <>
              {
                value.group_member_list.length > 0  ?
              <ListItem key={key} button onClick={handleGroupToggle(value)}>
                <ListItemAvatar>
                  <Avatar alt={value.group_name} src={value.group_icon} />
                </ListItemAvatar>
                <ListItemText id={labelId} primary={`${value.group_name}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge='end'
                    onChange={handleGroupToggle(value)}
                    checked={checked.indexOf(parseInt(value.group_id)) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                    color='primary'
                  />
                </ListItemSecondaryAction>
              </ListItem> : null}
              </>
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
