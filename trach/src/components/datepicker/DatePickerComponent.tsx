import { useStyles, CaretLeft, CaretRight } from './DatePickerComponentStyles'
import { FlatButton } from '../core/FlatButton'

import DateFnsUtils from '@date-io/date-fns'
import ruLocale from 'date-fns/locale/ru'
import addDays from 'date-fns/addDays'
import isBefore from 'date-fns/isBefore'
import isAfter from 'date-fns/isAfter'

import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export type DatePickerProps = {
    initialDate: Date
    minDate?: Date
    maxDate?: Date
    onSelected: (date: Date) => void
    disabled?: boolean 
}

export default function DatePickerComponent(props: DatePickerProps) {
    const classes = useStyles()
    const [selectedDate, handleDateChange] = useState<Date|null>(props.initialDate);        
    const minDate = (() => {
        if (props.minDate !== undefined) {
            return props.minDate
        }
        return new Date(2018, 6, 20, 0, 0, 0, 0)
    })()
    // const maxDate = (() => {
    //     if (props.maxDate !== undefined) {
    //         return props.maxDate
    //     }
    //     return new Date().setHours(0, 0, 0, 0)
    // })()
    const maxDate = (() => {
        return new Date(2022, 1, 14).setHours(0, 0, 0, 0)
    })()
    const isNextDateEnabled = selectedDate != null && isBefore(selectedDate, maxDate)
    const isPrevDateEnabled = selectedDate != null && isAfter(selectedDate, addDays(minDate, 1))
    return (                
        <Grid className={classes.root} container alignItems="center" justify="space-between" wrap="nowrap">
                <FlatButton
                    className={classes.leftButton} 
                    disabled={props.disabled || !isPrevDateEnabled} 
                    onClick={() => {                        
                        if (selectedDate != null && isPrevDateEnabled) {
                            const date = addDays(selectedDate, -1)
                            handleDateChange(date)
                            props.onSelected(date)
                        }                        
                    }}>    
                        <CaretLeft disabled={props.disabled || !isPrevDateEnabled}/>
                    </FlatButton>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                        <DatePicker
                            className={classes.picker}
                            autoOk 
                            style={{
                                width: 85,
                                paddingTop: 2,                                                                
                            }}                                           
                            InputProps={{
                                disableUnderline: true,                                                                                 
                                classes: {
                                    input: props.disabled ? classes.disabledText : classes.text,
                                },
                            }}
                            disabled={props.disabled}                                            
                            format={"dd.MM.yyyy"}
                            disableToolbar
                            variant="inline"                
                            label=""
                            helperText=""
                            value={selectedDate}
                            onChange={(date: Date|null) => {
                                handleDateChange(date)
                                if (date != null) {
                                    props.onSelected(date)                    
                                }                                
                            }}
                            minDate={minDate}
                            maxDate={maxDate}/>
                    </MuiPickersUtilsProvider>                                                                                                            
                    <FlatButton
                        className={classes.rightButton}
                        disabled={props.disabled || !isNextDateEnabled} 
                        onClick={() => {
                            if (selectedDate != null && isNextDateEnabled) {
                                const date = addDays(selectedDate, 1)
                                handleDateChange(date)
                                props.onSelected(date)
                            }
                        }}>
                        <CaretRight disabled={props.disabled || !isNextDateEnabled}/>
                    </FlatButton> 
            </Grid>        
    )
}
