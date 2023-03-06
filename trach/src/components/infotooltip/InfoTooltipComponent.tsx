import { useStyles, InfoTooltip } from './InfoTooltipComponentStyles'

import React, { ReactElement } from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

export type TooltipItemProps = {
    leftText: string
    rightText?: string    
}

export type TooltipProps = {
    items: TooltipItemProps[]
    showInElement: ReactElement        
}

export type InDevelopProps = {
    showInElement: ReactElement        
}

export function InDevelopTooltipComponent(props: InDevelopProps) {
    const inDevelop: TooltipItemProps = {
        leftText: 'В разработке',        
    }
    return (
        <InfoTooltipComponent showInElement={props.showInElement} items={[inDevelop]}/>
    )
}

export function GeneralInfoTooltipComponent(props: {text: string, showInElement: ReactElement}) {
    const info: TooltipItemProps = {
        leftText: props.text,        
    }
    return (
        <InfoTooltipComponent showInElement={props.showInElement} items={[info]}/>
    )
}

export default function InfoTooltipComponent(props: TooltipProps) {
    const classes = useStyles()
    if (props.items.length > 0) 
        return (
            <InfoTooltip title={
                props.items.map(item => 
                    <Grid container direction="row">
                        <Box className={classes.leftText}>{item.leftText}</Box>
                        {item.rightText !== undefined 
                            ? <Box className={classes.rightText}>{item.rightText}</Box> 
                            : null}                    
                    </Grid>
                )
            }
            placement="bottom-start">
                {props.showInElement}
            </InfoTooltip>
        )
    else
        return (
            <div>
                {props.showInElement}
            </div>
        )
}
