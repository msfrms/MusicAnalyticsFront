import Image from '../core/image'
import { useStyles, MoreIcon, UpIcon, DownIcon, InfoIcon } from './TrackComponentStyles'
import { InDevelopTooltipComponent } from '../infotooltip/InfoTooltipComponent'
import CoverIconComponent, { CoverIconProps } from '../covericon/CoverIconComponent'
import { ChangePosition, Change } from '../../core/Plot'

import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import Media from 'react-media'
import { HistoryRouter } from '../../core/Router'
import { useHistory } from 'react-router-dom'

export type FieldProps = {
    value: string
    onClick: (router: HistoryRouter) => void
}

export type TrackProps = {
    title: FieldProps
    artist: FieldProps[]
    label: string
    coverUrl: string
    changePosition: ChangePosition
    position: number
    maxPosition: number
    daysInChart: number
    infoOnClick: (router: HistoryRouter) => void
}

function ChangePositionComponent(props: ChangePosition) {
    const classes = useStyles()
    switch (props.change) {
        case Change.Decrement:
            return (
                <Grid item container direction="row" alignItems="center" justify="flex-end">
                    <div style={{marginRight: 3}}>
                        <DownIcon />
                    </div>
                    <Box className={classes.positionDecrement}>{props.value}</Box>
                </Grid> 
            );
        case Change.Increment:
            return (
                <Grid item container direction="row" alignItems="center" justify="flex-end">
                    <div style={{marginRight: 3, marginBottom: 3}}>
                        <UpIcon />
                    </div>                    
                    <Box className={classes.positionIncrement}>{props.value}</Box>
                </Grid> 
            );
        case Change.New:
            return (
                <Box className={classes.positionNew}>new</Box>
            );
        case Change.Unchanged:
            return (
                <Box className={classes.positionUnchanged}>–</Box>                
            );                            
    }
}

export type TrackInfoProps = {
    label: string 
    maxPosition: number
    daysInChart: number   
}

function TrackInfoComponent(props: TrackInfoProps) {
    const classes = useStyles()
    return (
        <Grid container item justify="flex-end" alignItems="center" spacing={2}>

            <Grid item direction="row">
                <Box className={classes.grayText}>{props.daysInChart} дн. · max {props.maxPosition}</Box>
                <Box className={classes.grayText}>{props.label}</Box>
            </Grid>

            <Grid item direction="row" className={classes.moreIcon}>
                <InDevelopTooltipComponent showInElement={<Box><MoreIcon /></Box>}/> 
            </Grid> 
            
        </Grid>
    )
}

type MoreProps = {
    isHover: boolean,
    info: TrackInfoProps
}

function MoreComponent(props: MoreProps) {
    if (props.isHover) {
        return (
            <Grid item>
                <TrackInfoComponent {...props.info}/>
            </Grid>
        )
    }    
    return null
}

type TrackCoverProps = {
    trackUrl: string, 
    isHover: boolean, 
    onClick: (router: HistoryRouter) => void
}

function TrackCoverComponent(props: TrackCoverProps) {
    const classes = useStyles()
    const history = useHistory()
    const coverIconProps: CoverIconProps = {
        coverUrl: props.trackUrl,
        iconElement: <InfoIcon />,
        style: {
            cover: {
                width: 56,
                height: 56,
                borderRadius: 3
            },
            icon: {
                marginTop: 9
            }            
        },
        onClick: () => props.onClick(history)
    }
    if (props.isHover) {
        return (
            <Grid container className={classes.cover}>                
                <CoverIconComponent {...coverIconProps}/>                        
            </Grid>
        )        
    }
    else {
        return <Image src={props.trackUrl} className={classes.cover}/>        
    }    
}

function DesktopTrackComponent(props: TrackProps) {
    const classes = useStyles()
    const [isHover, setHover] = useState(false)    
    var artists: JSX.Element[] = []
    const history = useHistory()
    props.artist.forEach((artist, index) => {
        if (index < props.artist.length - 1)
            artists.push(
                (
                    <Box 
                        onClick={() => artist.onClick(history)} 
                        className={isHover ? classes.artistHover : classes.artist}>
                        {artist.value},  
                    </Box>
                )
            )
        else 
            artists.push(
                (
                    <Box 
                        onClick={() => artist.onClick(history)} 
                        className={isHover ? classes.artistHover : classes.artist}>
                        {artist.value}
                    </Box>
                )
            )    
    })
    
    return (
        <Grid container>                      
            <Grid onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classes.root} item container direction="row" alignItems="center" xs>
                <Grid item className={classes.changePosition}>
                    <ChangePositionComponent {...props.changePosition}/>
                </Grid> 
                    <Grid item>
                        <TrackCoverComponent 
                            trackUrl={props.coverUrl} 
                            isHover={isHover} 
                            onClick={() => props.infoOnClick(history)}/>
                    </Grid>
                    <Grid item className={classes.position}>
                        <Box className={classes.position}>{props.position}</Box>
                    </Grid>
                    <Grid item xs container direction="column" zeroMinWidth wrap="nowrap">
                        <Box 
                            onClick={() => props.title.onClick(history)} 
                            className={classes.name}>
                            {props.title.value}
                        </Box>
                        <Grid item container direction="row">
                            {artists}
                        </Grid>
                    </Grid>                
                    <MoreComponent isHover={isHover} info={props}/>     
                    
            </Grid>
            <Grid className={classes.ads} item></Grid>
        </Grid>        
    )
}

function MobileTrackComponent(props: TrackProps) {
    const classes = useStyles()
    return (
        <Grid container> 

            <Grid item container direction="row" alignItems="center">

                <Grid item container direction="column" className={classes.changePosition} justify="flex-end">
                    <Box className={classes.positionMobile}>{props.position}</Box>
                    <ChangePositionComponent {...props.changePosition}/>                   
                </Grid>

                <Grid item>
                    <Image src={props.coverUrl} className={classes.cover}/>
                </Grid>                    

                <Grid item xs container direction="column" zeroMinWidth wrap="nowrap">
                    <Box className={classes.name}>{props.title}</Box>
                    <Box className={classes.artist}>{props.artist}</Box>                                                    
                </Grid>                

                <Box className={classes.moreIconMobile}>
                    <MoreIcon />
                </Box>

            </Grid> 

        </Grid>        
    )
}

export default function TrackComponent(props: TrackProps) {                     
    return (
        <Grid container>
            <Media 
                query="(min-width: 771px)" 
                render={() => 
                    <DesktopTrackComponent {...props}/>
                } 
            />
            <Media 
                query="(max-width: 770px)" 
                render={() => 
                    <MobileTrackComponent {...props}/>
                } 
            />
        </Grid>        
    )        
}
