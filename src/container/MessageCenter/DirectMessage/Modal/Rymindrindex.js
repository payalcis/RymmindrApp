import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TextField, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import Search from '@material-ui/icons/Search'
import Check from '@material-ui/icons/Check'
import Add from '@material-ui/icons/Add'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done';
import parse from 'html-react-parser';

let find_key 
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
  maxHeight: 550, overflow: 'auto'
}))

const ButtonSuccess = styled(Button)(({ theme }) => ({
  background: '#00d264',
  color: theme.palette.success.contrastText
}))

export default function DialogRaw (props) {  
  const { onClose, value: valueProp, getSelectedRymindr, open,onRymindrUpdate, onRymindrUpdateLink,getRymindrListData, ...other} = props
  const [value, setValue] = useState(valueProp)
  //console.log('getSelectedRymindr',getSelectedRymindr);  
  const [added, setAdded] = useState(getSelectedRymindr)
  const [count, setCount] = useState(0)  
    
  const [rymindrListData, updateRymindrListData] = useState(getRymindrListData);
 
 useEffect(() => {
    setAdded(getSelectedRymindr);
    updateRymindrListData(getRymindrListData);
}, [getSelectedRymindr, getRymindrListData]);


  const handleCancel = () => {    
    setValue(false)
    onClose(!open)   
    onRymindrUpdate(added.length)
    onRymindrUpdateLink(added)   
    setCount(added.length)
    
    // Refresh the list
    updateRymindrListData(getRymindrListData);
    // Set the added items
    setAdded(added);
  }

  const handleOnChange = (event) => {
    const value = event.target.value; 
    
    // Get the existing reminders
    let rymindrs = [...rymindrListData];

    if( value != '' )
    {
        // Filter them
        let filteredRymindrs = rymindrs.filter(o => o.note.toLowerCase().includes(value.toLowerCase()));
        // Update the state
        updateRymindrListData(filteredRymindrs);
    }
    else
    {
        // Refresh the list
        updateRymindrListData(getRymindrListData);
        // Set the added items
        
        let addedItems = [...added];
        var selectedItems = [];
        for(let i=0; i<getRymindrListData.length; i++)
        {
            for (let j=0; j<addedItems.length; j++)
            {
                if( addedItems[j].id === getRymindrListData[i].id )
                {
                    selectedItems.push({key: i, id: getRymindrListData[i].id});
                }
            }
        }

        setAdded(selectedItems);
    }
  }

  const getAdded = (item_id, item_index) => {
   // alert(item_id+'-------'+item_index);  
    const copy_added = [...added];
    copy_added.push({key:item_index, id:item_id});  
    setAdded(copy_added);
  }


  const getdeleted = (item_id, item_index) => {   
     const copy_added = [...added];
     let find_index =  copy_added.findIndex(o => o.key === item_index)    
     let removed = copy_added.splice(find_index, 1)   
     setAdded(copy_added);
     //console.log('copy_added_delete',added)
   }
  //console.log('aseee', added);  

  const DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]  
  /*const Rymindrlist = getRymindrListData.map((item, index) => (<>
     
    <ListItemStyled>
      <ListItemAvatar>
        <AvatarShareStyled alt='semy Sharp' src={require('../../../../assets/images/education.png')} />
      </ListItemAvatar>
      <ListItemText
        primary={item.note}
        secondary={
        <TypoListSubtext>{item.rymindr_date} | {item.rymindr_time}</TypoListSubtext>
        }
      />       
      
     <ButtonSuccess variant='contained' startIcon={<Add />} onClick={()=>getAdded(item.id, index)}>Add</ButtonSuccess>
    </ListItemStyled>
    <Divider variant='inset' component='li' />
  </>
  ))*/
    
  
  
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
          <TypoPopHeadStyled>Link Rymindr</TypoPopHeadStyled>
          <IconButton color='default' onClick={handleCancel}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitleStyled>
      <DialogContent>
        <SearchFieldStyled
          id='input-with-icon-textfield'
          variant='outlined'
          fullWidth
          size='small'
          onKeyUp={handleOnChange}
        />

        <ListStyled>{
          rymindrListData.map((item, index) => {
            find_key =  (added !== '') ? added.find(o => o.key === index) : ''           
            return(
              <React.Fragment><ListItemStyled>
              <ListItemAvatar>
                <AvatarShareStyled alt='semy Sharp' src={require('../../../../assets/images/education.png')} />
              </ListItemAvatar>
              <ListItemText
                primary={parse(item.note)}
                secondary={
                <TypoListSubtext>{item.rymindr_date} | {item.rymindr_time}</TypoListSubtext>
                }
              />       
              { (find_key) ?
                <ButtonSuccess variant='contained' startIcon={<DoneIcon />} onClick={()=>getdeleted(item.id, index)}>Added</ButtonSuccess>
                : 
                <ButtonSuccess variant='contained' startIcon={<Add />} onClick={()=>getAdded(item.id, index)}>Add</ButtonSuccess>   
              }               
            </ListItemStyled>
            <Divider variant='inset' component='li' />
            </React.Fragment> 
            )
          })
        }
        </ListStyled>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color='primary'>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}


DialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  rymindrListData: PropTypes.array.isRequired,
}
