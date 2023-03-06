import Image from '../core/image'
import InfoTooltipComponent, {
    TooltipItemProps,
    GeneralInfoTooltipComponent
} from '../infotooltip/InfoTooltipComponent'
import { FlatButton } from '../core/FlatButton'
import { useStyles, PlayIcon, BookmarkIcon } from './TrackInfoComponentStyles'
import { MenuItemButton } from '../filter/FilterComponentStyles'

import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Popover from '@material-ui/core/Popover'
import { HistoryRouter } from '../../core/Router'
import { useHistory } from 'react-router'

const DateFormat = require('dateformat')

export type LinkToPlatform = {
    name: string
    onClick: () => void
}

export type ArtistProps = {
    name: string
    onClick: (router: HistoryRouter) => void
    numberOfTracksInChart?: number
    numberOfTracksInPlaylists?: number
}

export type AlbumProps = {
    title: string
    onClick: (router: HistoryRouter) => void
}

export type TrackInfoProps = {
    coverUrl: string
    trackName: string
    artists: ArtistProps[]
    album?: AlbumProps
    date?: Date
    genres: string[]
    label: string
    links: LinkToPlatform[]
    onCreatedReport?: () => void
}

export default function TrackInfoComponent(props: TrackInfoProps) {
    const classes = useStyles()

    const items: string[] = []
    const isAlbumExist = props.album !== undefined

    if (props.album !== undefined && props.album.title.length > 0) { }
    else if (props.label.length > 0) {
        items.push(props.label)
    }

    const infoLine: string[] = []

    if (props.date !== undefined) {
        infoLine.push(DateFormat(props.date, 'dd.mm.yyyy'))
    }

    if (isAlbumExist) {
        if (props.genres.length > 0) {
            infoLine.push(props.genres.join(", "))
        }
        if (props.label.length > 0) {
            infoLine.push(props.label)
        }
    }
    else {
        if (props.genres.length > 0) {
            infoLine.push(props.genres.join(", "))
        }
    }

    items.push(infoLine.join(' · '))

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl)
    const history = useHistory()

    var artists: JSX.Element[] = []
    props.artists.forEach((artist, index) => {
        const tooltipItems: TooltipItemProps[] = []

        if (artist.numberOfTracksInChart !== undefined) {
            tooltipItems.push(
                {
                    leftText: artist.numberOfTracksInChart + " треков",
                    rightText: "в чартах"
                }
            )
        }

        if (artist.numberOfTracksInPlaylists !== undefined) {
            tooltipItems.push(
                {
                    leftText: artist.numberOfTracksInPlaylists + " трека",
                    rightText: "в плейлистах"
                },
            )
        }
        if (index < props.artists.length - 1) {
            artists.push(
                (
                    <InfoTooltipComponent
                        items={tooltipItems}
                        showInElement={
                            <Box
                                className={classes.artist}
                                onClick={() => artist.onClick(history)}>
                                {artist.name},
                        </Box>
                        } />
                )
            )
        }

        else {
            artists.push(
                (
                    <InfoTooltipComponent
                        items={tooltipItems}
                        showInElement={
                            <Box
                                className={classes.artist}
                                onClick={() => artist.onClick(history)}>
                                {artist.name}
                            </Box>
                        } />
                )
            )
        }
    })

    var Album = () => {
        if (props.album !== undefined)
            return (
                <Box onClick={() => props.album?.onClick(history)} className={classes.album}>{props.album.title}</Box>
            )
        else
            return null

    }

    const Report = () => {
        if (props.onCreatedReport !== undefined)
            return (<GeneralInfoTooltipComponent
                text="Будет сделан отчен о присутствии трека в плейлистах"
                showInElement={
                    <FlatButton onClick={props.onCreatedReport}>
                        <Grid item container alignItems="center">
                            <BookmarkIcon />
                            <span className={classes.button}>Отчет</span>
                        </Grid>
                    </FlatButton>
                } />)
        else
            return null
    }

    return (
        <Grid container wrap="nowrap">
            <Popover
                onClick={handleClose}
                style={{ width: 170 }}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}>
                {props.links.map((link) => <MenuItemButton onClick={link.onClick}>{link.name}</MenuItemButton>)}
            </Popover>
            <Grid item>
                <Image className={classes.image} src={props.coverUrl} />
            </Grid>
            <Grid item container direction="column" alignItems="flex-start">
                <Grid className={classes.name} item>{props.trackName}</Grid>
                <Grid item container direction="row">
                    {artists}
                </Grid>
                <Grid xs item container direction="column" justify="flex-end">
                    <Album />
                    {items.map(text => <Box className={classes.label}>{text}</Box>)}
                </Grid>
                <Grid item container xs direction="row" alignContent="flex-end" spacing={2}>
                    <FlatButton onClick={handleClick}>
                        <Grid item container alignItems="center">
                            <PlayIcon />
                            <span className={classes.button}>Cлушать</span>
                        </Grid>
                    </FlatButton>
                    <Report />
                </Grid>
            </Grid>
        </Grid>
    )
}
