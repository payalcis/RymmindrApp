import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography, TextField, InputAdornment, Grid, List, ListItem, ListItemAvatar, ListItemText, Avatar, Divider, ListItemSecondaryAction, Checkbox, MenuItem, FormHelperText, FormControl, FormControlLabel } from '@material-ui/core'
import React, { useEffect, useState, useMemo } from 'react'
import CloseIcon from '@material-ui/icons/Close'
import LocalSee from '@material-ui/icons/LocalSee'
import Search from '@material-ui/icons/Search'
import Check from '@material-ui/icons/Check'
import Add from '@material-ui/icons/Add'
import { getContactlist, addNewGroup, updateGroup } from '../../../store/actions/contactActions'
import { withSnackbar } from 'notistack'
import FileBase64 from 'react-file-base64'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import CircularSpinner from '../../../component/CircularSpinner'

import PropTypes from 'prop-types'
import { styled } from '@material-ui/core/styles'
import { connect } from 'react-redux'
const currencies = [{
        value: 'all',
        label: 'All Contacts'
    },
    {
        value: 'contact',
        label: 'Contact'
    },
    {
        value: 'groups',
        label: 'Groups'
    }
]

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
    height: 140,
    width: 140,
    backgroundColor: '#e5e5e5'
}))

// const TextFieldStyled = styled(TextField)(({ theme }) => ({
//   '& div': {
//     height: 56,
//     padding: 0,
//     marginTop: 30,
//     textIndent: 14
//   }
// }));

const BoxAvtarStyled = styled(Box)(() => ({
    position: 'relative',
    height: 130,
    width: 130
}))

const AvatarStyled = styled(Avatar)(() => ({
    height: 130,
    width: 130
}))
const IconButtonStyles = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    position: 'absolute',
    right: 20,
    zIndex: 9,
    marginTop: 6
}))

const IconAvtarButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    position: 'absolute',
    right: 0,
    zIndex: 9,
    bottom: 0,
    borderRadius: '60%',
    width: 32,
    height: 32,
    textAlign: 'center',
    lineHeight: '41px'
}))

const CreateNewGroup = (props) => {
        const { user_id, business_code } = JSON.parse(localStorage.getItem('userData'))
        const formFields = {
            group_id: '',
            user_id,
            group_icon: '',
            group_members: '',
            group_name: ''
        }

        const { contactlist, getContactlist, loading, addNewGroup, updateGroup, usercontactlist, DetailView, success_message, enqueueSnackbar, grouplist } = props
        const [values, setValues] = useState(formFields)

        const [checked, setChecked] = React.useState([])
        const { onClose, value: valueProp, open, ...other } = props
        const [value, setValue] = useState(valueProp)
        const [ContactList, setContactList] = useState([])
        const [addUsersId, setaddUsersId] = useState([])

        const [searchvalue, setSearchvalue] = useState('')
        const [files, setFiles] = useState()
        const [image, setimage] = useState('')

        const [filesErr, setFilesErr] = useState('')
        const [checkErr, setCheckErr] = useState('')
        const [formvalidation, setFormvalidation] = useState({

            group_icon: '',
            group_members: '',
            group_name: ''
        })
        const [formvalues, setFormvalues] = useState(formFields)

        const handleCancel = () => {
            setValue(false)
            onClose(!open)
            setFilesErr('')
            setCheckErr('')
            const data = {
                group_icon: '',
                group_members: '',
                group_name: ''
            }
            setFormvalidation(data)
            const grouValues = {
                group_id: '',
                user_id,
                group_icon: '',
                group_members: '',
                group_name: ''
            }
            setValues(grouValues)
            setChecked([])
                // setFilesErr('');
            setimage('')
        }
        const getFiles = (files) => {
            // debugger
            setFilesErr('')
            var extn = files.name.split('.')
            var etn = ['jpg', 'jpeg', 'png']

            var low = extn[1].toLowerCase()
            if (etn.includes(low)) {
                setFiles(files)
                setimage(files.base64)

                var image = files.base64.replace(/^data:image\/\w+;base64,/, '')
                setValues({...values, group_icon: image })
            } else {
                setFilesErr('This file not supportted')
                setValues({...values, group_icon: '' })
            }
        }

        useMemo(() => {
            setSearchvalue('')
            setContactList(usercontactlist)
        }, [open])


        useMemo(() => {
            if (DetailView !== null) {
                for (var x in DetailView) {
                    values[x] = DetailView[x]
                }
                setChecked(values.group_members.split(','))
            } else {
                setFiles('')
                setChecked([])
                setValues(formFields)
            }
        }, [DetailView])
        useMemo(() => {
            success_message && enqueueSnackbar(success_message, { variant: 'success' })
        }, [success_message])
        const handleChange = (prop) => (e) => {
            // const form = { ...formvalues };
            // const formerr = { ...formvalidation };
            // form[event.target.name] = event.target.value;
            // formerr[event.target.name] = '';
            const formvalue = {...formvalues }
            const formvalidations = {...formvalidation }
            const fieldName = e.target.name
            var fieldValue = ''
            formvalidations[fieldName] = ''
                // if (formvalue[fieldName] == '') {
                //   fieldValue = e.target.value
                // }
            formvalue[fieldName] = e.target.value
            setValues(formvalue)
            setFormvalidation(formvalidations)
        }
        const handleToggle = (value) => () => {
            setaddUsersId(value)
            const currentIndex = checked.indexOf(value)
            const newChecked = [...checked]
            if (currentIndex === -1) {
                newChecked.push(value)
            } else {
                newChecked.splice(currentIndex, 1)
            }

            setChecked(newChecked)
            values.group_members = newChecked.toString()
            setCheckErr('')
        }
        const handleSubmit = (e) => {
            // debugger

            e.preventDefault()
            const dataTosend = {
                    user_id,
                    business_code
                }
                // console.log('checked====',checked);
                // return false;
            values.group_members = checked.toString()
            if (handlevalidation()) return false

            if (values.group_id !== '') {
                if (files == '') {
                    const data_to_update = {

                        group_id: values.group_id,
                        group_members: checked.toString(),
                        group_name: values.group_name.trim(),
                        user_id
                    }
                    updateGroup(data_to_update, dataTosend)
                } else {
                    const data_to_update = {
                        group_icon: files.base64.replace(/^data:image\/\w+;base64,/, ''),
                        group_id: values.group_id,
                        group_members: checked.toString(),
                        group_name: values.group_name.trim(),
                        user_id
                    }
                    updateGroup(data_to_update, dataTosend)
                }
            } else {
                if (values.group_name != '') {
                    values.group_name = values.group_name.trim()
                    if (values.group_name.length > 0) {
                        if (files == '') {
                            const data_to_update = {
                                // group_id: values.group_id,
                                group_members: checked.toString(),
                                group_name: values.group_name.trim(),
                                user_id
                            }

                            console.log('data_to_update====', data_to_update);

                            addNewGroup(data_to_update, dataTosend)
                        } else {
                            const data_to_update = {
                                group_icon: files.base64.replace(/^data:image\/\w+;base64,/, ''),
                                // group_id: values.group_id,
                                group_members: checked.toString(),
                                group_name: values.group_name.trim(),
                                user_id
                            }
                            addNewGroup(data_to_update, dataTosend)
                        }
                    }
                }
            }
            handleCancel()
        }
        const handlevalidation = () => {
            // debugger
            let error = false
            const formerr = {...formvalidation }
            console.log(grouplist)
                // grouplist.map((item) => {
                //   if (item.group_name.toUpperCase() === values.group_name.toUpperCase()) {
                //     error = true;
                //     formerr.group_name = 'Group with this name is already added!';
                //     setFormvalidation(formerr);
                //   }
                // })
                // if (!values.group_icon) {
                //   error = true;
                //   setFilesErr('Group icon is required');
                // }

            if (!values.group_members) {
                error = true
                setCheckErr('Group members are required!')
            }

            if (!values.group_name) {
                error = true
                formerr.group_name = 'Group name is required!'
                setFormvalidation(formerr)
            }
            // debugger
            if (values.group_name.trim() == '') {
                error = true
                formerr.group_name = 'Please enter valid Group name'
                setFormvalidation(formerr)
            }

            return error
        }
        useEffect(() => {
            const dataTosend = {
                user_id,
                business_code
            }
            getContactlist(dataTosend)
            setContactList(usercontactlist)
        }, [])

        const [currency, setCurrency] = React.useState('all')
        const handlesearch = (e) => {
            setSearchvalue(e.target.value)
            let filteredByname = []
            filteredByname = usercontactlist.filter(
                (suggestion1) => suggestion1.first_name.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1,
                (suggestion2) => suggestion2.mobile_no.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1
            )

            if (filteredByname.length == 0) {
                filteredByname.push({
                    user_id: 0,
                    first_name: 'No record found',
                    last_name: '',
                    profile_image: ''
                })
            }
            setContactList(filteredByname)
            setChecked(values.group_members.split(','))
        }

        const Rymindrlist = ContactList.length > 0 ? (ContactList.map((item) => ( < >

                        <
                        ListItemStyled key = { value }
                        button onClick = { handleToggle(item.user_id) } >
                        <
                        ListItemAvatar > {
                            item.user_id !== 0 ? < AvatarShareStyled alt = 'semy Sharp'
                            src = { item.profile_image }
                            /> : null} <
                            /ListItemAvatar> <
                            ListItemText primary = { item.first_name ? (item.first_name + ' ' + item.last_name) : item.group_name ? item.group_name : item.mobile_no ? item.mobile_no : "" }
                            /> <
                            ListItemSecondaryAction > {
                                item.user_id !== 0 ? < Checkbox
                                edge = 'end'
                                onChange = { handleToggle(item.user_id) }
                                checked = { checked.indexOf(item.user_id) !== -1 }
                                style = {
                                    { marginRight: 0, color: '#17baff' } }
                                /> : ''} <
                                /ListItemSecondaryAction> <
                                /ListItemStyled> <
                                Divider variant = 'inset'
                                component = 'li' / >
                                <
                                />
                            ))): usercontactlist.map((item) => ( < >

                        <
                        ListItemStyled key = { value }
                        button onClick = { handleToggle(item.user_id) } >
                        <
                        ListItemAvatar >
                        <
                        AvatarShareStyled alt = 'semy Sharp'
                        src = { item.profile_image }
                        /> <
                        /ListItemAvatar> <
                        ListItemText primary = { item.first_name ? (item.first_name + ' ' + item.last_name) : item.group_name ? item.group_name : item.mobile_no ? item.mobile_no : "" }
                        /> <
                        ListItemSecondaryAction >

                        <
                        Checkbox edge = 'end'
                        onChange = { handleToggle(item.user_id) }

                        checked = { checked.indexOf(item.user_id) !== -1 }
                        style = {
                            { marginRight: 0, color: '#17baff' } }
                        /> <
                        /ListItemSecondaryAction> <
                        /ListItemStyled> <
                        Divider variant = 'inset'
                        component = 'li' / >
                        <
                        />
                    ))

                    return ( <
                        >

                        <
                        Dialog fullWidth maxWidth = 'md'
                        disableBackdropClick disableEscapeKeyDown aria - labelledby = 'confirmation-dialog-title'
                        open = { open } {...other } >
                        <
                        DialogTitleStyled id = 'form-dialog-title' >
                        <
                        Box display = 'flex'
                        justifyContent = 'space-between'
                        alignItems = 'center' >
                        <
                        TypoPopHeadStyled > < /TypoPopHeadStyled>

                        <
                        IconButton color = 'default'
                        onClick = { handleCancel } >
                        <
                        CloseIcon / >
                        <
                        /IconButton> <
                        /Box> <
                        /DialogTitleStyled> <
                        DialogContent >

                        <
                        form onSubmit = { handleSubmit } >
                        <
                        Grid container spacing = { 3 }
                        alignItems = 'center' >
                        <
                        Grid item xs = { 3 }
                        justifyContent = 'center' >

                        <
                        BoxAvtarStyled >
                        <
                        AvatarStyled alt = 'Remy Sharp'
                        src = { image || values.group_icon }
                        />

                        <
                        FormControlLabel className = 'attachement'
                        id = 'icon-button-file'
                        control = { <
                            FileBase64

                            accept = 'image/*'
                            name = 'group_icon'
                            onDone = { getFiles }
                            onChange = { handleChange('group_icon') }
                            className = 'displayNone'
                            style = {
                                { display: 'none' } }
                            />
                        }
                        label = { <
                            IconAvtarButton
                            color = 'primary'
                            aria - label = 'upload picture'
                            component = 'span' >
                            <
                            PhotoCamera color = 'inherit'
                            fontSize = 'small' / >
                            <
                            /IconAvtarButton>
                        }
                        />

                        <
                        FormControl error = {!!filesErr } >
                        <
                        FormHelperText > { filesErr } < /FormHelperText> <
                        /FormControl> <
                        /BoxAvtarStyled> <
                        /Grid> <
                        Grid item xs = { 9 } >
                        <
                        TextField id = 'outlined-basic'
                        label = 'Group Name'
                        variant = 'outlined'
                        onChange = { handleChange('group_name') }
                        value = { values.group_name }
                        name = 'group_name'
                        error = { formvalidation.group_name !== '' }
                        helperText = { formvalidation.group_name }
                        fullWidth /
                        >

                        <
                        /Grid> <
                        /Grid> <
                        SearchFieldStyled id = 'input-with-icon-textfield'
                        variant = 'outlined'
                        fullWidth size = 'small'
                        value = { searchvalue }
                        onChange = { handlesearch }
                        InputProps = {
                            {
                                startAdornment: ( <
                                    InputAdornment position = 'start' >
                                    <
                                    Search / >
                                    <
                                    /InputAdornment>
                                )
                            }
                        }
                        /> <
                        Grid item xs = { 8 } >
                        <
                        FormControl error = {!!checkErr } >
                        <
                        FormHelperText > { checkErr } < /FormHelperText> <
                        /FormControl> <
                        /Grid> <
                        IconButtonStyles aria - label = 'delete'
                        onClick = { handleSubmit } >
                        <
                        Check / >
                        <
                        /IconButtonStyles> <
                        ListStyled style = {
                            { background: 'primary' } } > { Rymindrlist } < /ListStyled> <
                        /form> <
                        /DialogContent> <
                        /Dialog> <
                        />

                    )
                }
                const mapStateToProps = (state) => {
                    return {
                        loading: state.contact.loading,
                        error: state.contact.error,
                        contactlist: state.contact.contactlist,
                        contactGroupMemberlist: state.contact.contactGroupMemberlist,
                        grouplist: state.contact.grouplist,
                        usercontactlist: state.contact.usercontactlist,
                        groupdeletemessage: state.contact.groupdeletemessage,
                        success_message: state.contact.success_message
                    }
                }
                const mapDispatchToProps = (dispatch) => {
                    return {
                        getContactlist: (data) => dispatch(getContactlist(data)),
                        addNewGroup: (data, dataTosend) => dispatch(addNewGroup(data, dataTosend)),
                        updateGroup: (data, dataTosend) => dispatch(updateGroup(data, dataTosend))

                    }
                }
                CreateNewGroup.propTypes = {
                    onClose: PropTypes.func.isRequired,
                    open: PropTypes.bool.isRequired,
                    value: PropTypes.string.isRequired,
                    getContactlist: PropTypes.func.isRequired,
                    loading: PropTypes.bool.isRequired,
                    addNewGroup: PropTypes.func.isRequired,
                    updateGroup: PropTypes.func.isRequired,
                    enqueueSnackbar: PropTypes.func.isRequired,
                    success_message: PropTypes.any.isRequired
                }
                export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(CreateNewGroup))