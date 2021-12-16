import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControlLabel,
  Checkbox,
  Avatar,
  Divider,
  MenuItem,
  Tab,
  Tabs, 
} from '@material-ui/core';
import React, { useEffect, useState, useMemo } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Check from '@material-ui/icons/Check';
import Add from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { makeStyles, styled } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import {
  getAllUser,
  addContact,
  updateGroup,
  InviteUser,
  InviteUserInBulk,
} from '../../../store/actions/contactActions';
import CircularSpinner from '../../../component/CircularSpinner/index';
import * as XLSX from 'xlsx';

const currencies = [
  {
    value: 'all',
    label: 'All Contacts',
  },
  {
    value: 'contact',
    label: 'Contact',
  },
  {
    value: 'groups',
    label: 'Groups',
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  addBulkContact: {
    color: theme.palette.secondary.contrastText,
  },
  nameMobile: {
    display: 'block',
    flexDirection: 'column',
  },
}));

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0,
});

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20,
});

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600',
}));

const TypoPopSubHeadStyled = styled(Typography)(({ theme }) => ({
  color: '#222222',
  fontSize: 14,
  fontWeight: '400',
}));

const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  paddingTop: 10,
  paddingBottom: 10,
  '& div': { height: 50 },
}));

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: 8,
}));

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
  marginRight: 10,
});

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText,
}));

const ListStyled = styled(List)(({ theme }) => ({
  maxHeight: 550,
  overflow: 'auto',
  marginTop: 10,
}));

const ButtonSuccess = styled(Button)(({ theme }) => ({
  background: '#00d264',
  color: theme.palette.success.contrastText,
}));

const AvatarImageStyle = styled(Avatar)(({ theme }) => ({
  height: 140,
  width: 140,
  backgroundColor: '#e5e5e5',
}));

const TextFieldStyled = styled(TextField)(({ theme }) => ({
  '& div': {
    height: 56,
    padding: 0,
    marginTop: 30,
    textIndent: 14,
  },
}));

const TabsStyles = styled(Tabs)(({ theme }) => ({
  borderBottom: '1px solid #ccc',
  '& span': {
    justifyContent: 'center',
  },
}));

const ConfirmationDialogRaw = (props) => {
  const { user_id, business_code, first_name, last_name, sc_bessi_name } = JSON.parse(localStorage.getItem('userData'));
  const { onClose, value: valueProp, open, isBooking, contactList, setMobileNumber, ...other } = props;
  const [value, setValue] = useState(valueProp);
  const [value2, setValue2] = useState(0);
  const {
    getAllUser,
    searchedUsers,
    addContact,
    grouplist,
    updateGroup,
    InviteUser,
    InviteUserInBulk,
    invitemessage,
    loading,
    success_message,
  } = props;
  const [matchedList, setmatchedList] = useState([]);
  const [groupObject, setgroupObject] = useState({});
  const [errorValue, seterrorValue] = useState('');
  const [errorValue2, seterrorValue2] = useState('');
  const [errorValue3, seterrorValue3] = useState('');
  const [bulkContacts, setBulkContacts] = useState('');
  const [bulkContacts2, setBulkContacts2] = useState('');
  const [isFile, setIsFile] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const classes = useStyles();
  const handleCancel = () => {
    setValue(false);
    onClose(!open);
    let data = [];
    setmatchedList(data);
    setsearchValue('');
    setCurrency('');
    setIsLoading(false)
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };

  useEffect(() => {
    if (isBooking) {
      setmatchedList(contactList);
    }
  }, [contactList]);

  useMemo(() => {
    if (success_message) {
      setIsLoading2(false);
      setBulkContacts('');
      setBulkContacts2('');
      // onClose(!open);
      onClose(false);
    }
  }, [success_message]);
  const addcontact = (userID) => {
    const data = {
      user_id,
      join_user_id: userID,
      business_code,
      business_name: sc_bessi_name ? sc_bessi_name : first_name + ' ' + last_name,
      group_id: '',
    };
    const dataTosend = {
      user_id,
      business_code,
    };

    addContact(data, dataTosend);
    if (groupObject.group_id != undefined) {
      let user = [];
      if (groupObject.group_member_list.length > 0) {
        groupObject.group_member_list.map((option) => {
          user.push(option.user_id);
        });
        user.push(userID);
        const groupMemberString = user.join();
        const data = {
          group_icon: groupObject.group_icon,
          group_id: groupObject.group_id,
          group_members: groupMemberString,
          group_name: groupObject.group_name,
          user_id,
        };
        updateGroup(data, dataTosend);
      } else {
        user.push(userID);
        const groupMemberString = user.join();
        const data = {
          group_icon: groupObject.group_icon,
          group_id: groupObject.group_id,
          group_members: groupMemberString,
          group_name: groupObject.group_name,
          user_id,
        };
        updateGroup(data, dataTosend);
      }
    }
    setValue(false);
    onClose(!open);
    // setmatchedList(searchedUsers);
    setmatchedList([]);
    setsearchValue('');
    setCurrency('');
  };

  const UserInvite = () => {
    // var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    const len=searchValue.length
    const flag=searchValue
    if (len >= 10 && len<12 && !(isNaN(flag))) {
      seterrorValue('');
      const data = {
        user_id,
        mobile_no: parseInt(searchValue),
      };
      // InviteUser(data);
      setValue(false);
      onClose(!open);
      setsearchValue('');
      setCurrency('');
      setmatchedList([]);
    } else {
      seterrorValue('Please enter a valid Mobile Number');
    }
  };
  const UserInviteInBulk = () => {
    console.log('isFile===', isFile);

    if (isFile) {
      console.log('bulkContacts====', bulkContacts);
      if (bulkContacts) {
        setIsLoading2(true);
        seterrorValue3('');
        const data = {
          user_id,
          contact_numbers: bulkContacts,
        };
        InviteUserInBulk(data);
      } else {
        seterrorValue3('Please upload a file with valid Mobile Numbers');
      }
    } else {
      console.log('bulkContacts22====', bulkContacts2);
      if (bulkContacts2) {
        let uniqueArr = [...new Set(bulkContacts2.split(','))];
        setIsLoading2(true);
        seterrorValue2('');
        const data = {
          user_id,
          contact_numbers: uniqueArr.toString(),
        };
        InviteUserInBulk(data);
      } else {
        seterrorValue2('Please enter valid Mobile Numbers, seperated by a comma ( , ) delimiter');
      }
    }
  };

  const getGroupDetail = (option) => {
    setgroupObject(option);
  };


  useMemo(() => {
    //alert(open)
    //if(!open){
      setmatchedList([]);
    //}
  }, [open]);


  useMemo(() => {
    setmatchedList(searchedUsers);
    setIsLoading(false);
  }, [searchedUsers, grouplist]);

  const [currency, setCurrency] = React.useState('all');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const [searchValue, setsearchValue] = React.useState('');

  const handleSearch = (event) => {
    if (event.target.value.length < 14) {
      seterrorValue('');

      setsearchValue(event.target.value);
      if (!isBooking) {
        const len=event.target.value.length
        const flag=event.target.value
        if (len >= 10 && len<12 && !(isNaN(flag))) {
          const dataToSend = {
            user_id,
            searchText: event.target.value,
          };
          seterrorValue('');
          setIsLoading(true);
          getAllUser(dataToSend);
        } else {
          setIsLoading(false);
          setmatchedList([]);
          seterrorValue('Please enter a valid Mobile Number');
        }
      } else {
        let tempArray = [];
        contactList.map((data, i) => {
          if (data.value.includes(event.target.value)) {
            tempArray.push(data);
          }
        });
        setmatchedList(tempArray);
      }
    } else {
      setsearchValue(event.target.value);
    }
  };

  const handleSearchBulk = (event) => {
    if (event.target.value.length > 0) {
      seterrorValue2('');
      setBulkContacts2(event.target.value);
    } else {
      setBulkContacts2('');
      seterrorValue2('Please enter valid Mobile Numbers, seperated by a comma ( , ) delimiter');
    }
  };

  const handleAddContact = (number, name, user_id) => {
    setMobileNumber(number, name, user_id);
    onClose(!open);
  };

  const handleChangeCheck = (event) => {
    setBulkContacts('');
    setBulkContacts2('');
    if (event.target.checked) {
      setIsFile(true);
    } else {
      setIsFile(false);
    }
  };

  // console.warn('cvcvcvvc', this.props.contactList);

  // process CSV data
  const processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    let allNumbers = [];
    for (let i = 0; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
      let full = row.filter((a) => {
        return a && !isNaN(a);
      });
      allNumbers.push(...full);
    }
    console.log('datadatadatadata=', allNumbers);
    let uniqueArr = [...new Set(allNumbers)];
    setBulkContacts(uniqueArr.toString());
  };

  // handle file upload
  const handleFileUpload = (e) => {
    setBulkContacts('');
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      seterrorValue3('');
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      processData(data);
    };
    reader.readAsBinaryString(file);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitleStyled id="form-dialog-title">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <TypoPopHeadStyled>Add new contact</TypoPopHeadStyled>
          <IconButton color="default" onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
        <TypoPopSubHeadStyled>
          Having trouble adding contacts ? Contact Our Team on {' '} &nbsp;
          <a className="addBulkContact" href="mailto:support@rymindr.com">
            support@rymindr.com
          </a>
        </TypoPopSubHeadStyled>
      </DialogTitleStyled>
      <DialogContent>
        <TabsStyles
          value={value2}
          onChange={handleChange2}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Add a single contact" />
          <Tab label="Add multiple contacts" />
        </TabsStyles>
        <TabPanel value={value2} index={0}>
          <DialogContent>
            <List dense className={classes.root}>
              <TextField
                id="outlined-basic"
                label="Search by mobile number"
                variant="outlined"
                error={!!errorValue}
                helperText={errorValue}
                fullWidth
                value={searchValue}
                onChange={handleSearch}
              />
              {!isBooking ? (
                <ListStyled>
                  {loading  && <CircularSpinner />}
                  {
                    !isLoading && matchedList != null ? (
                      matchedList.map((item) => (
                        <div key={item.id}>
                          <ListItemStyled key={value} button>
                            <ListItemAvatar>
                              {item.profile_image != '' ? (
                                <AvatarShareStyled alt="semy Sharp" src={item.profile_image} />
                              ) : (
                                <AvatarShareStyled
                                  alt="semy Sharp"
                                  src="https://rymindrapi.com/RymindrApi/icons/defualtuser.png"
                                />
                              )}
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                item.first_name ? (
                                  <ListItem className={classes.nameMobile}>
                                    <ListItemText id={item.user_id} primary={`${item.first_name} ${item.last_name}`} />
                                    <ListItemText id={item.user_id} primary={item.mobile_no} />
                                  </ListItem>
                                ) : item.group_name ? (
                                  <ListItem className={classes.nameMobile}>
                                    <ListItemText id={item.user_id} primary={`${item.first_name} ${item.last_name}`} />
                                    <ListItemText id={item.user_id} primary={item.group_name} />
                                  </ListItem>
                                ) : (
                                  <ListItem className={classes.nameMobile}>
                                    <ListItemText id={item.user_id} primary={item.mobile_no} />
                                  </ListItem>
                                )
                              }
                            />
                            {item.is_business_joined === '0' ? (
                              <ButtonSuccess
                                variant="contained"
                                onClick={() => addcontact(item.user_id)}
                                startIcon={<Add />}
                              >
                                Add
                              </ButtonSuccess>
                            ) : (
                              <ButtonSuccess variant="contained" startIcon={<Check />}>
                                Added{' '}
                              </ButtonSuccess>
                            )}
                          </ListItemStyled>
                          <Divider variant="inset" component="li" />
                        </div>
                      ))
                    ) : !loading ? (
                      <ButtonSuccess variant="contained" onClick={() => UserInvite()}>
                        Invite User
                      </ButtonSuccess>
                    ) : (
                      <></>
                    )
                    // (
                    //     <ButtonSuccess variant='contained' onClick={() => UserInvite()}>Invite User</ButtonSuccess>
                    //   )
                  }
                </ListStyled>
              ) : (
                <ListStyled>
                  {matchedList != null
                    ? matchedList.map((item) => (
                        <div key={item.value}>
                          <ListItemStyled key={value} button>
                            {/*<ListItemAvatar>
                          {(item.profile_image != '') ? <AvatarShareStyled alt="semy Sharp" src={item.profile_image} /> : <AvatarShareStyled alt="semy Sharp" src='https://rymindrapi.com/RymindrApi/icons/defualtuser.png' />}
                        </ListItemAvatar>*/}
                            <ListItemText primary={item.label} />
                            {item.value != '' ? (
                              <ButtonSuccess
                                variant="contained"
                                onClick={() => handleAddContact(item.value, item.label, item.user_id)}
                                startIcon={<Add />}
                              >
                                Add
                              </ButtonSuccess>
                            ) : (
                              <ButtonSuccess variant="contained" startIcon={<Check />}>
                                Added{' '}
                              </ButtonSuccess>
                            )}
                          </ListItemStyled>
                          <Divider variant="inset" component="li" />
                        </div>
                      ))
                    : null}
                </ListStyled>
              )}
            </List>
          </DialogContent>
        </TabPanel>

        <TabPanel value={value2} index={1}>
          <List dense className={classes.root}>
            <DialogContent>
              <ListStyled>
                <FormControlLabel
                  control={<Checkbox checked={isFile} onChange={handleChangeCheck} name="is_qrcode" color="primary" />}
                  label="Upload a file (csv, xls or xlsx)"
                />
              </ListStyled>
              <ListStyled>
                {!isFile ? (
                  <TextField
                    id="outlined-basic"
                    label="Copy and paste multiple mobile numbers, seperated by a comma ( , ) delimiter"
                    variant="outlined"
                    error={!!errorValue2}
                    helperText={errorValue2}
                    value={bulkContacts2}
                    fullWidth
                    rows={4}
                    rowsMax={100}
                    multiline
                    onChange={handleSearchBulk}
                  />
                ) : (
                  <>
                    <input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
                    {errorValue3 && (
                      <p class="error">Please enter valid Mobile Numbers, seperated by a comma ( , ) delimiter</p>
                    )}
                  </>
                )}
              </ListStyled>

              <ListStyled>
                {isLoading2 ? 
                (
                  <CircularSpinner />
                ) 
                :
                 (
                  <ButtonSuccess variant="contained" onClick={() => UserInviteInBulk()}>
                    Invite All Users
                  </ButtonSuccess>
                ) 
                }
              </ListStyled>
            </DialogContent>
          </List>
        </TabPanel>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.contact.loading,
    error: state.contact.error,
    searchedUsers: state.contact.searchedUsers,
    grouplist: state.contact.grouplist,
    invitemessage: state.contact.invitemessage,
    success_message: state.contact.success_message,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: (data) => dispatch(getAllUser(data)),
    addContact: (data, dataTosend) => dispatch(addContact(data, dataTosend)),
    updateGroup: (data, dataToSend) => dispatch(updateGroup(data, dataToSend)),
    InviteUser: (data) => dispatch(InviteUser(data)),
    InviteUserInBulk: (data) => dispatch(InviteUserInBulk(data)),
  };
};
ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  getAllUser: PropTypes.func.isRequired,
  addContact: PropTypes.func.isRequired,
  updateGroup: PropTypes.func.isRequired,
  searchedUsers: PropTypes.any.isRequired,
  grouplist: PropTypes.any.isRequired,
  InviteUser: PropTypes.func.isRequired,
  InviteUserInBulk: PropTypes.func.isRequired,
  success_message: PropTypes.any.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(ConfirmationDialogRaw));
