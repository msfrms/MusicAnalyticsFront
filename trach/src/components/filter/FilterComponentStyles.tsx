import React from 'react'

import styled from 'styled-components'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({    
    text: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 16,
        textAlign: 'center',
        color: '#000000',                        
      },
    root: {
        border: '1px solid #D2D2D2',
        boxSizing: 'border-box',
        borderRadius: 10,
        width: 160,
    },
    popover: {
        width: 185,
    } 
  }),
);

export const MenuItemButton = styled.button`
    background-color: transparent;
    background: transparent;
    border: none;
    width: 160px;
    height: 33px;
    text-align:left;
    padding-left: 10px; 
    padding-right: 10px; 
    
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;

    &:hover {
        background-color: rgb(248, 249, 250);
    }
`

export const IconButton = styled.button`
    &:focus, :active {
      outline: none !important;
    }
    &:hover {
      background-color: transparent;
    }    
    background: transparent;    
    border: none;    
    width: 160px;
    height: 30px;
    padding-left: 10px;    
    padding-right: 13px;
`

export const CaretIcon = () => 
    <svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L4.5 5L8 1" stroke="black"/>
    </svg>
    