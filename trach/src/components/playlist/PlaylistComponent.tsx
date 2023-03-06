import Image from '../core/image'
import { useStyles } from './PlaylistComponentStyles'

import React from 'react'

import Grid from '@material-ui/core/Grid'
import { GridList, GridListTile } from '@material-ui/core'

export type PlaylistItemProps = {
    coverUrl: string
    platformName: string
    name: string
    author: string
    position: string
    metrics: string
    onClick: () => void
}

export type PlaylistProps = {
    items: PlaylistItemProps[]
}

function PlaylistItemComponent(props: PlaylistItemProps) {
    const classes = useStyles()
    return (
        <Grid container wrap="nowrap">
            <Image className={classes.cover} src={props.coverUrl} />
            <Grid item container direction="column" alignItems="flex-start">
                <Grid className={classes.text} item>{props.platformName}</Grid>
                <Grid className={classes.grayText} item>{props.name}</Grid>
                <Grid className={classes.grayText} item>{props.author}</Grid>

                <Grid item container xs direction="column" justify="flex-end">
                    <Grid item className={classes.boldText}>{props.position}</Grid>
                    <Grid item className={classes.boldText}>{props.metrics}</Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default function PlaylistComponent(props: PlaylistProps) {
    const classes = useStyles()
    const items = props.items
    var cols = 4
    if (items.length < 4)
        cols = 0
    return (
        <div className={classes.root}>
            <GridList cols={cols}>
                {items.map(item =>
                    <GridListTile className={classes.item}>
                        <PlaylistItemComponent {...item} />
                    </GridListTile>
                )}
            </GridList>
        </div>
    )
}
