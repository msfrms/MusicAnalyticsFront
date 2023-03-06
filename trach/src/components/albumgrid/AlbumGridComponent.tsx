import { useStyles } from './AlbumGridComponentStyles'
import {
    GeneralLoadDataEmptyComponent,
    GeneralLoadDataEmpty,
    GeneralLoadDataTypes
} from '../core/GeneralLoadDataComponent'
import AlbumComponent, { AlbumProps } from '../album/AlbumComponent'

import React from 'react'
import Grid from '@material-ui/core/Grid'

export type AlbumGridProps = {
    header: string
    albums: AlbumProps[]
}

export default function AlbumGridComponent(props: AlbumGridProps) {
    const classes = useStyles()
    const Albums = () => {
        if (props.albums.length > 0) {
            return (
                <Grid className={classes.gridContainer} item container>
                    {
                        props.albums.map(album =>
                            <Grid item style={{ width: 'calc(100%/3)', minWidth: 350 }}>
                                <AlbumComponent {...album} />
                            </Grid>
                        )
                    }
                </Grid>
            )
        }
        else {
            const emptyProps: GeneralLoadDataEmpty = {
                type: GeneralLoadDataTypes.EmptyData,
                text: 'Данные по альбомам могут отсутствовать, мы работаем над исправлением этой проблемы'
            }
            return (
                <Grid className={classes.gridContainer} item container>
                    <GeneralLoadDataEmptyComponent {...emptyProps} />
                </Grid>
            )
        }
    }
    const header = (() => {
        if (props.albums.length > 0) {
            return `${props.header} (${props.albums.length})`
        }
        else {
            return `${props.header}`
        }
    })()
    return (
        <Grid className={classes.root} container>
            <Grid className={classes.header} item>{header}</Grid>
            <Albums />
        </Grid>
    )
}