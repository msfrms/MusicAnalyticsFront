import { useStyles } from './ReportPageComponentStyles'
import MenuComponent, { MenuProps } from '../../menu/MenuComponent'
import { Grid } from '@material-ui/core'
import { reportPageSelector } from './utils/ReportPageSelector'

import React from 'react'
import { connectAdvanced } from 'react-redux'

export type ReportPageProps = {
    menu: MenuProps
}

export function ReportPageComponent(props: ReportPageProps) {
    const classes = useStyles()    
    return (
        <Grid container className={classes.root}>
            <Grid item>                
                <MenuComponent {...props.menu}/>
            </Grid>
        </Grid>
    )
}

export default connectAdvanced(reportPageSelector)(ReportPageComponent)