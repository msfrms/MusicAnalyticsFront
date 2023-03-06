import { useStyles } from './ArtistStatsPlotComponentStyles'
import LinePlotComponent from './plot/ArtistLinePlotComponent'
import { FlatButton } from '../core/FlatButton'

import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import InfoTooltipComponent, { TooltipItemProps } from '../infotooltip/InfoTooltipComponent'

export enum DateUnit {
    Days = 'top_duration_days',
    Months = 'top_duration_months'
}

export type LegendItemProps = {
    title: string
    color: string
    description: string
    isSelected: boolean
    onSelected: () => void
}

export type LegendProps = {
    enableItems: LegendItemProps[]
    disableItems: string[]
}

export type ArtistStatsPlotProps = {
    legend: LegendProps
    plot: {
        labels: string[]
        lines: LineProps[]
    }
}

export type LineProps = {
    label: string,
    color: string,
    values: number[],
}

export default function ArtistStatsPlotComponent(props: ArtistStatsPlotProps) {
    const classes = useStyles()

    const tooltipLegendItemsProps = (legend: LegendItemProps): TooltipItemProps[] => {
        return [
            {
                leftText: legend.description,
            },
        ]
    }

    const enabledPlatforms = props.legend.enableItems.map(legend => (
        <Grid item>
            <InfoTooltipComponent 
                showInElement={
                    <FlatButton onClick={legend.onSelected}>
                        <Grid container>
                            <Box className={classes.circle} style={{background: !legend.isSelected ? 'white' : legend.color}}/>
                            <Box className={classes.legendText}>{legend.title}</Box>
                        </Grid>
                    </FlatButton>
                }
                items={tooltipLegendItemsProps(legend)}/>
        </Grid>
    ))

    const disablePlatforms = props.legend.disableItems.map(legend => (
        <Grid item>
            <Grid container>
                <Box className={classes.circle} style={{background: '#D2D2D2'}}/>
                <Box className={classes.disableLegendText}>{legend}</Box>
            </Grid>
        </Grid>
    ))

    return (
        <Grid className={classes.root} container direction="row">
            <Grid className={classes.legend} item container>
                {enabledPlatforms}
                {disablePlatforms}
            </Grid>
            <Grid item xs>
                <LinePlotComponent labels={props.plot.labels} lines={props.plot.lines}/>
            </Grid>
        </Grid>
    )
}
