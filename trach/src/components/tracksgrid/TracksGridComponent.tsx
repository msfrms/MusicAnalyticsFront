import { useStyles } from './TracksGridComponentStyles'
import { FlatButton } from '../core/FlatButton'
import Image from '../core/image'
import { 
    GeneralLoadDataEmptyComponent, 
    GeneralLoadDataEmpty, 
    GeneralLoadDataTypes 
} from '../core/GeneralLoadDataComponent'
import { GeneralInfoTooltipComponent } from '../infotooltip/InfoTooltipComponent'

import React from 'react'

import Grid from '@material-ui/core/Grid'
import { HistoryRouter } from '../../core/Router'
import { useHistory } from 'react-router'

export type TrackGridProps = {
    coverUrl: string
    title: string
    subtitle: string
    info?: string
    onClick: (router: HistoryRouter) => void
}

export type TracksGridProps = {
    header: string
    tracks: TrackGridProps[]    
}

function Track(props: TrackGridProps) {
    const classes = useStyles()
    const history = useHistory()
    const Subtitle = () => {
        if (props.info !== undefined) {
            return (
                <GeneralInfoTooltipComponent text={props.info} showInElement={
                    <Grid className={classes.subtitle} item>{props.subtitle}</Grid>                    
                }/>
            )
        }
        else {
            return (
                <Grid className={classes.subtitle} item>{props.subtitle}</Grid>
            )
        }
    }
    return (
        <FlatButton onClick={() => props.onClick(history)}>
            <Grid className={classes.gridItem} container wrap="nowrap">
                <Image className={classes.cover} src={props.coverUrl}/>
                <Grid item container direction="column" alignItems="flex-start">
                    <Grid className={classes.title} item>{props.title}</Grid>
                    <Subtitle />
                </Grid>             
            </Grid>
        </FlatButton>
    )
}

export default function TracksGridComponent(props: TracksGridProps) {
    const classes = useStyles()
    const Tracks = () => {
        if (props.tracks.length > 0) {
            return (
                <Grid className={classes.gridContainer} item container>
                {
                    props.tracks.map(track =>
                        <Grid item style={{width:'calc(100%/3)', minWidth: 350}}>
                                <Track {...track}/>
                            </Grid>    
                    )
                }
                </Grid>
            )            
        }
        else {
            const emptyProps: GeneralLoadDataEmpty = {
                type: GeneralLoadDataTypes.EmptyData,
                text: 'Данные по трекам могут отсутствовать, мы работаем над исправлением этой проблемы'
            }
            return (
                <Grid className={classes.gridContainer} item container>
                    <GeneralLoadDataEmptyComponent {...emptyProps}/>
                </Grid>
            )
        }
    }
    const header = (() => {
        if (props.tracks.length > 0) {
            return `${props.header} (${props.tracks.length})`
        }
        else {
            return `${props.header}`
        }
    })()
    return (
        <Grid className={classes.root} container>
            <Grid className={classes.header} item>{header}</Grid>
            <Tracks />               
        </Grid>
    )
}
