import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { styled, makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

const TypoHeadStyled = styled(List)(({ theme }) => ({
  color: '#1773BF',
  fontSize: 18,
  borderBottom: '1px solid rgba(64, 87, 106, 0.1)',
  margin: '0 -16px',
  padding: '16px 20px',
  fontWeight: '600'
}))

const TypoStyled = styled(Typography)(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.primary.main,
  fontWeight: '500',
  borderBottom: '1px solid rgba(64, 87, 106, 0.1)',
  margin: '40px 20px',
  paddingBottom: 15
}))

const RymindrMessaging = (props) => {
  const classes = useStyles()
  return (
    <>

    </>
  )
}

export default RymindrMessaging
