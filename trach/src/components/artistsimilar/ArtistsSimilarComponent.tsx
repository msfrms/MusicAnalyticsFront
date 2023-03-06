import { useStyles } from './ArtistsSimilarComponentStyles'
import Image from '../core/image'

import React from 'react'

import Grid from '@material-ui/core/Grid'
import { Box } from '@material-ui/core'

export type LinkProps = {
    link: string
    onClick: () => void
}

export type ArtistSimilarProps = {
    coverUrl: string
    title: string
    audience: string
    platformMatchCount: string
    genresMatchCount: string
    router: LinkProps
    isSelected: boolean
}

export type ArtistsSimilarProps = {
    header: string
    artists: ArtistSimilarProps[]
}

function Artist(props: ArtistSimilarProps) {
    const classes = useStyles()

    return (
        <Grid className={props.isSelected ? classes.gridItemSelected : classes.gridItem}
            container
            wrap="nowrap">
            <Image className={classes.cover} src={props.coverUrl} />
            <Grid item container direction="column" alignItems="flex-start">
                <Grid item>
                    <Box
                        className={classes.title}
                        onClick={() => props.router.onClick()}>
                        {props.title}
                    </Box>
                </Grid>
                <Grid className={classes.subtitle} item>{props.platformMatchCount}</Grid>
                <Grid className={classes.subtitle} item>{props.genresMatchCount}</Grid>
                <Grid className={classes.subtitle} item>{props.audience}</Grid>
            </Grid>
        </Grid>
    )
}

export default function ArtistsSimilarComponent(props: ArtistsSimilarProps) {
    const classes = useStyles()
    const Tracks = () => {
        return (
            <Grid className={classes.gridContainer} item container>
                {
                    props.artists.map(track =>
                        <Grid item style={{ width: 'calc(100%/3)', minWidth: 350 }}>
                            <Artist {...track} />
                        </Grid>
                    )
                }
            </Grid>
        )
    }
    const header = (() => {
        if (props.artists.length > 0) {
            return `${props.header} (${props.artists.length})`
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
