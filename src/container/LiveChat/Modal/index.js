import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TextField, InputAdornment, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, ListItemSecondaryAction, Checkbox, Chip } from '@material-ui/core'
import React, { useEffect, useState, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import LocalSee from '@material-ui/icons/LocalSee';
import Search from '@material-ui/icons/Search';
import Check from '@material-ui/icons/Check';
import Add from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';

import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import CircularSpinner from '../../../component/CircularSpinner';

import { connect } from 'react-redux';
import { createGroup } from '../../../store/actions/LiveChatActions';

const CloseButton = styled(IconButton)({
  position: 'absolute',
  right: 0,
  top: 0
})

const DialogTitleStyled = styled(DialogTitle)({
  borderBottom: '1px solid #e0e0e0',
  padding: '10px 24px',
  marginBottom: 20
})

const TypoPopHeadStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.secondary.contrastText,
  fontSize: 18,
  fontWeight: '600'
}))

const SearchFieldStyled = styled(TextField)(({ theme }) => ({
  paddingTop: 10,
  paddingBottom: 10,
  maxWidth: 70 + '%',
  margin: '0 15%',
  '& div': { height: 50 }
}))

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  borderRadius: 8
}))

const AvatarShareStyled = styled(Avatar)({
  height: 50,
  width: 50,
  marginRight: 10
})

const TypoListSubtext = styled(Typography)(({ theme }) => ({
  fontSize: 14,
  color: theme.palette.secondary.contrastText
}))

const ListStyled = styled(List)(({ theme }) => ({
  maxHeight: 550,
  overflow: 'auto',
  backgroundColor: '#f4f9fa',
  margin: '0 -24px',
  padding: '0 10px',
  marginTop: 30,
  paddingTop: 20
}))

const ButtonSuccess = styled(Button)(({ theme }) => ({
  background: '#00d264',
  color: theme.palette.success.contrastText
}))

const AvatarImageStyle = styled(Avatar)(({ theme }) => ({
  height: 140, width: 140, backgroundColor: '#e5e5e5'
}))

const IconButtonStyles = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  position: 'absolute',
  right: 20,
  zIndex: 9,
  marginTop: 6
}))

function ConfirmationDialogRaw (props) {
    const fileBrowse = useRef(null);

  const { onClose, value: valueProp, open, loading, ...other } = props;
  const [value, setValue] = useState(valueProp);

  const handleCancel = () => {
    setValue(false);
    onClose(!open);
  }

  const [checked, setChecked] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);

  const handleToggle = (value, user) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    let users = [...checkedUsers];

    if (currentIndex === -1) {
        newChecked.push(value);
        users.push(user);
    } else {
        newChecked.splice(currentIndex, 1);
        users.splice(currentIndex, 1);
    }
    setChecked(newChecked);

    // To uncheck Select All Contact checkbox
    if( users.length === 0 )
    {
        updateIsAllContactSelected(false);
    }

    setCheckedUsers(users);
  }

  const handleDelete = (checkedIndex) => {
    const users = [...checkedUsers];

    // To remove from check boxes
    let contactIndex = contactList.findIndex(user => user.user_id === users[checkedIndex].user_id);
    const newChecked = [...checked];
    const newCheckedIndex = newChecked.indexOf(contactIndex);
    newChecked.splice(newCheckedIndex, 1);
    setChecked(newChecked);

    // To remove from checked users
    users.splice(checkedIndex, 1);

    // To uncheck Select All Contact checkbox
    if( users.length === 0 )
    {
        updateIsAllContactSelected(false);
    }

    setCheckedUsers(users);
  }

  const {contacts} = props;

  const [contactList, updateContactList] = useState(contacts);
  useEffect(() => {
    updateContactList(contacts);
  }, [contacts]);

  const handleOnChange = (event) => {
    let searchStr = event.target.value;

    let list = [...contacts];

    if( searchStr == '' )
    {        
        updateContactList(list);
    }
    else
    {
        let users = list.filter((user) => (user.contact_type === 'individual'));

        const filteredList = users.filter(obj => (obj.first_name.toLowerCase().includes(searchStr.toLowerCase())) || (obj.last_name.toLowerCase().includes(searchStr.toLowerCase())));

        updateContactList(filteredList);
    }
  }

  const [isAllContactSelected, updateIsAllContactSelected] = useState(false);
  const handleSelectAllContact = (event) => {
    if( event.target.checked )
    {
        let contactsCount = contactList.length;
        let selecetdCheckboxes = Array.apply(null, Array(contactsCount)).map(function (x, i) { return i; });
        
        updateIsAllContactSelected(true);
        setChecked(selecetdCheckboxes);
        setCheckedUsers(contactList);
    }
    else
    {
        updateIsAllContactSelected(false);
        setChecked([]);
        setCheckedUsers([]);
    }
  }

  // To show file browse
  const showFileBrowse = () => {
    fileBrowse.current.click();
  }

  const [groupName, updateGroupName] = useState('');
  const [groupIcon, updateGroupIcon] = useState(null);
  const handleFileSelect = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    let file = event.target.files[0];
    
    updateGroupIcon(file);

    fileBrowse.current.value = '';
  }

  const { user_id } = JSON.parse(localStorage.getItem('userData'));
  const [validation, showValidationMsg] = useState(false);
  const handleSaveGroupDetails = () => {
    
    showValidationMsg(false);

    let users = [];
    if( checkedUsers.length > 0 )
    {
        for(let i=0; i<checkedUsers.length; i++)
        {
            users.push(checkedUsers[i].user_id);
        }
    }

    if( groupName === '' || users.length === 0 )
    {
        showValidationMsg(true);
        return false;
    }

    const dataToSend = {
        userId: user_id,
        groupIcon: groupIcon,
        groupName: groupName,
        users: users
    }

    props.handleSaveGroupDetails(dataToSend);
  }

  // To refresh the form
  useEffect(() => {
    setChecked([]);
    setCheckedUsers([]);
    updateGroupIcon(null);
    updateIsAllContactSelected(false);
    
    return () => {
        setChecked([]);
        setCheckedUsers([]);
        updateGroupIcon(null);
        updateIsAllContactSelected(false);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      <DialogTitleStyled id='form-dialog-title'>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <TypoPopHeadStyled>Create New Group</TypoPopHeadStyled>
          <IconButton color='default' onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitleStyled>
      <DialogContent>
        <Grid container spacing={3} alignItems='center'>
          <Grid item xs={3} justifycontent='center'>
            <input type="file" ref={fileBrowse} style={{display: "none"}} onChange={handleFileSelect} />
            <AvatarImageStyle onClick={showFileBrowse}> <LocalSee style={{ fontSize: 50 }} /> </AvatarImageStyle>
          </Grid>
          <Grid item xs={9}>
            <TextField id='outlined-basic' label='Group Name' placeholder='Enter your group name' variant='outlined' fullWidth className='mb-20' onChange={(e) => updateGroupName(e.target.value)} />
            {
                ( checkedUsers && checkedUsers.length > 0 )
                ?
                checkedUsers.map((checkedUser, checkedUsersIndex) => 
                    <Chip key={checkedUsersIndex}
                    avatar={<Avatar alt='Natacha' src='/static/images/avatar/1.jpg' />}
                    label={checkedUser.first_name}
                    onDelete={() => handleDelete(checkedUsersIndex)}
                    />
                )
                :
                null
            }
            
            {
                ( validation === true )
                ?
                <Alert variant="outlined" severity="error">Please provide group name and select at least one contact!</Alert>
                :null
            }
          </Grid>
        </Grid>

        <IconButtonStyles aria-label='delete' onClick={handleSaveGroupDetails}>
          <Check />
        </IconButtonStyles>

        <ListStyled>
          <SearchFieldStyled
            id='input-with-icon-textfield'
            variant='outlined'
            fullWidth
            size='small'
            onKeyUp={handleOnChange}
            autoComplete="off"
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <Search />
                </InputAdornment>
              )
            }}
          />
        
            {/* To check all checkboxes */}
            <div>
                <React.Fragment>
                    <ListItemStyled button>
                        <ListItemAvatar>
                            Select All Contacts
                        </ListItemAvatar>
                        <ListItemSecondaryAction>
                            <Checkbox edge='end' style={{ marginRight: 0, color: '#17baff' }} onClick={handleSelectAllContact} checked={isAllContactSelected} />
                        </ListItemSecondaryAction>
                    </ListItemStyled>
                    <Divider variant='inset' component='li' />
                </React.Fragment>
            </div>
            {loading && <CircularSpinner />}

            {
                    ( contactList && ( contactList.length > 0 ) )
                    ?
                    contactList.map((contact, contactIndex) => 
                        ( contact.contact_type === 'individual' )
                        ?
                        <React.Fragment key={contactIndex}>
                            <ListItemStyled key={value} button>
                            <ListItemAvatar>
                                <AvatarShareStyled alt='semy Sharp' src={contact.profile_image} />
                            </ListItemAvatar>
                            <ListItemText primary={contact.first_name + ' ' + contact.last_name} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                edge='end'
                                onChange={handleToggle(contactIndex, contact)}
                                checked={checked.indexOf(contactIndex) !== -1}
                                style={{ marginRight: 0, color: '#17baff' }}
                                />
                            </ListItemSecondaryAction>
                            </ListItemStyled>
                            <Divider variant='inset' component='li' />
                        </React.Fragment>
                        :
                        null
                    )
                    :
                    null
                }
        </ListStyled>
      </DialogContent>
    </Dialog>
  )
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
}

const mapStateToProps = (state) => {
    return {
        loading: state.liveChatReducer.loading,
        contacts: state.liveChatReducer.contacts
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: (data) => dispatch(createGroup(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmationDialogRaw)