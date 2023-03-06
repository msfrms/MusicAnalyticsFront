import Image from '../core/image'
import { useStyles } from './AlbumComponentStyles'
import { HistoryRouter } from '../../core/Router'

import React from 'react'
import Grid from '@material-ui/core/Grid'
import { useHistory } from 'react-router'
import { Box } from '@material-ui/core'
import { GeneralInfoTooltipComponent } from '../infotooltip/InfoTooltipComponent'

export type AlbumProps = {
    coverUrl: string
    title: string
    year?: string
    subtitle: string
    other?: string
    onClick: (router: HistoryRouter) => void
}

export default function AlbumComponent(props: AlbumProps) {
    const classes = useStyles()
    const history = useHistory()
    const Year = () => {
        if (props.year !== undefined)
            return (<Grid item className={classes.year}>{props.year}</Grid>)
        else
            return null
    }
    const Subtitle = () => {
        if (props.other !== undefined)
            return (
                <GeneralInfoTooltipComponent text={props.other} showInElement={
                    <Grid item className={classes.subtitle}>{props.subtitle}</Grid>
                } />
            )
        else
            return (<Grid item className={classes.subtitle}>{props.subtitle}</Grid>)
    }
    return (
        <Grid container wrap="nowrap">
            <Image className={classes.image} src={props.coverUrl} />
            <Grid item container direction="column" alignItems="flex-start">
                <Grid item>
                    <Box
                        className={classes.title}
                        onClick={() => props.onClick(history)}>{props.title}
                    </Box>
                </Grid>
                <Grid item container xs direction="column" justify="flex-end">
                    <Year />
                    <Subtitle />
                </Grid>
            </Grid>
        </Grid>
    )
}