import Image from '../core/image'
import { FlatButton } from '../core/FlatButton'
import { useStyles, SearchIcon, InfoIcon } from './SearchComponentStyles'
import CoverIconComponent, { CoverIconProps } from '../covericon/CoverIconComponent'
import { HistoryRouter } from '../../core/Router'

import React, { useState } from 'react'

import InputBase from '@material-ui/core/InputBase'
import { Grid, Popover } from '@material-ui/core'

import { useHistory } from 'react-router-dom'

export type PredictProps = {
    id: string
    coverUrl: string
    title: string
    subtitle?: string
    onClickInfo: (router: HistoryRouter) => void
    onClick: (router: HistoryRouter) => void
}

export type SearchProps = {
    tracks: PredictProps[]
    artists: PredictProps[]
    albums: PredictProps[]
    onEditing: (text: string) => void
}

function PredictItemComponent(props: PredictProps) {
    const [isHover, setHover] = useState(false)
    const classes = useStyles()
    const history = useHistory()
    const routeInfo = () => props.onClickInfo(history)
    const route = () => props.onClick(history)
    const coverIconProps: CoverIconProps = {
        coverUrl: props.coverUrl,
        iconElement: <InfoIcon />,
        style: {
            cover: {
                width: 45,
                height: 45,
                borderRadius: 3
            },
            icon: {
                marginTop: 10
            }            
        },
        onClick: routeInfo
    }
    const Cover = () => {
        if (isHover) {
            return (
                <Grid item>
                    <CoverIconComponent {...coverIconProps}/>
                </Grid>
            )
        }
        else {
            return (
                <Grid item>
                    <Image className={classes.trackCover} src={props.coverUrl}/>
                </Grid>
            )
        }
    }
    return (
        <Grid onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className={classes.trackItemContainer} container alignItems="center" wrap="nowrap">
            <Cover />
            <FlatButton onClick={route}>
                <Grid item container direction="column" alignItems="flex-start" justify="flex-start">
                    <Grid className={classes.trackTitle} item>{props.title}</Grid>
                    {props.subtitle !== undefined 
                        ? <Grid className={classes.trackSubtitle} item>{props.subtitle}</Grid>
                        : null
                    }
                </Grid>
            </FlatButton>
        </Grid>
    )        
}

function SectionTrackItem(props: {header: string, items: PredictProps[]}) {
    const classes = useStyles()
    if (props.items.length > 0) {
        return (
            <Grid style={{marginTop: 10, marginLeft: 10, marginBottom: 10}} item>
                <span className={classes.trackSectionTitle}>{props.header}</span>
                {props.items.map((item, index) => {
                    return (
                        <PredictItemComponent key={item.title + index} {...item}/>
                    )
                })} 
            </Grid>
        )
    }
    else {
        return null
    }
}

export default function SearchComponent(props: SearchProps) {
    const classes = useStyles()

    const [isFocus, setFocus] = useState(false)
    const rootClassName = isFocus ? classes.focusInputContainer : classes.inputContainer

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpenPopover = Boolean(anchorEl) && props.tracks.concat(props.artists).length > 0
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            <Grid className={rootClassName} container wrap="nowrap" alignItems="center">
            <InputBase
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                className={classes.input}
                id="standard-name"
                placeholder="Трек, исполнитель"
                onChange={(event) => props.onEditing(event.target.value)}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                />
            <Grid item className={classes.searchIcon}>
                <SearchIcon />
            </Grid>
        </Grid>
            <Popover
            id="popover_tracks" 
            open={isOpenPopover}
            disableAutoFocus={true}
            disableEnforceFocus={true}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }} 
            anchorEl={anchorEl}>
                <Grid container direction="column" className={classes.popover}>
                    <SectionTrackItem key="ИСПОЛНИТЕЛИ" header="ИСПОЛНИТЕЛИ" items={props.artists}/>
                    <SectionTrackItem key="ТРЕКИ" header="ТРЕКИ" items={props.tracks}/>
                    <SectionTrackItem key="АЛЬБОМЫ" header="АЛЬБОМЫ" items={props.albums}/>
                </Grid> 
            </Popover>
        </div>
    )
}
