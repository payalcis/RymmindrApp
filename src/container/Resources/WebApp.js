import { Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import React, { useEffect, useMemo, useState } from 'react'
import { genrateQrCode, getUserDetails } from '../../store/actions/accountsettingAction'
import CircularSpinner from '../../component/CircularSpinner'
import CodeIcon from '@material-ui/icons/Code'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getContent } from '../../store/actions/resourceCenterAction'

import { makeStyles, styled } from '@material-ui/core/styles'
import { withSnackbar } from 'notistack'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion'

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}))

const WebApp = (props) => {
  const classes = useStyles()

  const {
    error,
    contentList
  } = props

  const { user_id, business_code, first_name, last_name } = JSON.parse(localStorage.getItem('userData'))

  useEffect(() => {
    const dataToSend = { user_id }
    props.getContent(dataToSend)
  }, [])

  console.log('content', contentList) 


  return (
    <>
      <TypoHeadStyled component='p'>Web App</TypoHeadStyled>
      <div className='contentContainer'>
        <Accordion>
          {
            contentList.map((data, index) => {
              return (
                <AccordionItem>
                  <AccordionItemHeading>
                    <AccordionItemButton>
                      {data.menu_name}
                    </AccordionItemButton>
                  </AccordionItemHeading>
                  <AccordionItemPanel>
                    <Accordion className='subAccordion'>
                      {
                        data.content.map((content, key) => {
                          return (
                            <AccordionItem>
                              <AccordionItemHeading>
                                <AccordionItemButton>
                                  {content.extra_text}
                                  {content.question}
                                </AccordionItemButton>
                              </AccordionItemHeading>
                              <AccordionItemPanel>
                                <div dangerouslySetInnerHTML={{ __html: content.answer }} />
                              </AccordionItemPanel>
                            </AccordionItem>

                          )
                        })
                      }
                  </Accordion>
                  </AccordionItemPanel>
                </AccordionItem>
              )
            })
          }
        </Accordion>
      </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    contentList: state.resourceCenterReducer.contentList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getContent: (data) => dispatch(getContent(data))
  }
}

// export default WebApp
export default connect(mapStateToProps, mapDispatchToProps)(WebApp)
