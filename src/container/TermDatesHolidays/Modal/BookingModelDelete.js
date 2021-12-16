import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography,
  TextField, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, MenuItem,Grid,
  Avatar, Divider } from '@material-ui/core'

import React, { useEffect, useState } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import PropTypes from 'prop-types'
import { styled } from '@material-ui/core/styles'
import DoneIcon from '@material-ui/icons/Done';

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
const ButtonDanger = styled(Button)(({ theme }) => ({
  background: theme.palette.error.main,
  color: theme.palette.warning.contrastText
}))

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


const FormFields = {

  category:'term',
  message:'',

}

export default function Deleteevent (props) {
  const { onClose, value: valueProp,deleteRymindr, open,getRymindrListData, ...other} = props
  const [value, setValue] = useState(valueProp)

  const [count, setCount] = useState(0)


const [categoryVal, setCategoryVal]   = React.useState()

const [category, setCategory]   = React.useState( [
    {
      value: 'All',
      label: 'All'
    },
    {
      value: 'Event',
      label: 'Event'
    },
    {
      value: 'Appointment',
      label: 'Appointment'
    }
  ])
const [formValue, setFormValue] = useState(FormFields)
const [formValidation, setFormValidation] = useState(FormFields)

const [rymindrListData, updateRymindrListData] = useState(getRymindrListData);

const ButtonColor = styled(Button)(({ theme }) => ({
    background: theme.palette.props.main,
    color: theme.palette.props.contrastText
  }))

  const ButtonWarn = styled(Button)(({ theme }) => ({
    background: theme.palette.warning.main,
    color: theme.palette.warning.contrastText
  }))


const handleCategoryChange = (event) => {
    console.log(event.target.value)
    setCategoryVal(event.target.value)
    setFormValue({ ...formValue, category: event.target.value })
  }
const handleinput = (e) => {
    const formdata = { ...formValue}
    const { name, value } = e.target;
    const formvalidation = { ...formValidation }
        if (name === 'message') {
        formdata.message = value
        formvalidation.message = ''
        setFormValidation(formvalidation)
        }
        else {
          formdata[name] = value
        }
    setFormValue(formdata)
  }

  const handleCancel = () => {
    setValue(false)
    onClose(!open)
  }


 const validate = () => {
    // const formvalidation = { ...formValidation }
    // console.log('akaka',);
    // let isError = false
    //  if (!formValue.message) {
    //   isError = true
    //   formvalidation.message = 'Please add some reason'
    //   setFormValidation(formvalidation)
    // }
    // return isError
  }


  const handleOnChange = (event) => {
    const value = event.target.value;
  }
  const handleToSubmit = () => {
    // if (validate()) return false
      deleteRymindr(formValue);
    onClose(!open)
    setFormValue(FormFields)
  }

  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      disableBackdropClick
      disableEscapeKeyDown
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      	<DialogTitleStyled id='form-dialog-title'>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
			<TypoPopHeadStyled>Delete Term/Holiday</TypoPopHeadStyled>
			<IconButton color='default' onClick={handleCancel}>
				<CloseIcon />
			</IconButton>
			</Box>
      	</DialogTitleStyled>

		<DialogContent>
			<ListStyled>
				{/*<Grid item xs={12}>
					<TextField
						select
						label='Select Booking Date'
						name='category'
						value={categoryVal}
						fullWidth
						onChange={handleCategoryChange}
						variant='outlined'
					>
						{category.map((option) => (
						<MenuItem key={option.label} value={option.value}>
							{option.label}
						</MenuItem>
						))}
					</TextField>
				</Grid> */}

				<Divider variant='inset' component='li' />
				<Grid item xs={12}>
					<TextField label='Reason(Optional)'
					name="message"
					fullWidth variant='outlined'
					value={formValue.message}
					onChange={handleinput}
					error={!!formValidation.message}
					helperText={formValidation.message}
					fullWidth
				/>
				</Grid>

			</ListStyled>
      	</DialogContent>
      	<DialogActions>
        	<ButtonDanger  color='primary'
				variant='contained' className='mb-20 width180'
				onClick={handleToSubmit}>Delete
			</ButtonDanger>
      	</DialogActions>
    </Dialog>
  )
}


Deleteevent.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  rymindrListData: PropTypes.array.isRequired,
  deleteRymindr: PropTypes.func.isRequired,
}
