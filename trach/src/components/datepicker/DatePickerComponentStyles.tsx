import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((_: Theme) =>
  createStyles({
      text: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'center',
        color: '#000000',        
        width: 80,
        paddingLeft: 3,
      },
      disabledText: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'center',
        color: '#D2D2D2',        
        width: 80,
        paddingLeft: 3,        
      },
      picker: {
        background: 'transparent',                      
      },
      leftButton: {
        paddingBottom: 4,
        paddingLeft: 10,
        width: 6,
      },
      rightButton: {
        paddingBottom: 4,
        paddingRight: 17,
        width: 6,
      },
      root: {
        border: '1px solid #D2D2D2',
        boxSizing: 'border-box',
        borderRadius: 10,
        width: 160,
        height: 32
      },           
  }))        

export function CaretLeft(props: { disabled?: boolean }) {
  return (
    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 0.499999L1 4L5 7.5" stroke={props.disabled ? "#D2D2D2" : "black"}/>
    </svg>
  )
}
    

export function CaretRight(props: { disabled?: boolean }) {
  return (
    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.500001 7.5L4.5 4L0.500001 0.5" stroke={props.disabled ? "#D2D2D2" : "black"}/>
    </svg>
  )
}   
