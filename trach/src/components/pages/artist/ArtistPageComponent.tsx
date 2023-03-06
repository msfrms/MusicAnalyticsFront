import MenuComponent, { MenuProps } from '../../menu/MenuComponent'
import ArtistInfoComponent, { ArtistInfoProps } from '../../artistinfo/ArtistInfoComponent'
import TracksGridComponent, { TracksGridProps } from '../../tracksgrid/TracksGridComponent'
import AchievementComponent, { AchievementProps } from '../../achievement/AchievementComponent'
import { artistPageSelector } from './utils/ArtistPageSelector'
import { useStyles } from './ArtistPageComponentStyles'
import AlbumGridComponent, { AlbumGridProps } from '../../albumgrid/AlbumGridComponent'
import BreadcrumbsComponent, { BreadcrumbsProps } from '../../breadcrumbs/BreadcrumbsComponent'

import React, { Component } from 'react'
import { connectAdvanced } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import ArtistStatsPlotComponent, { ArtistStatsPlotProps } from '../../artistplot/ArtistStatsPlotComponent'
import ArtistsSimilarComponent, { ArtistsSimilarProps } from '../../artistsimilar/ArtistsSimilarComponent'

export type ArtistPageProps = {
    menu: MenuProps
    info: ArtistInfoProps
    tracksInChart: TracksGridProps
    tracksInPlaylists: TracksGridProps
    albumsInChart: AlbumGridProps
    achievement: AchievementProps
    filterByDateInPlot: BreadcrumbsProps
    plotStats: ArtistStatsPlotProps
    similarArtists?: ArtistsSimilarProps
    didMount: () => void
}

export function ArtistPageWrapComponent(props: ArtistPageProps) {
    const classes = useStyles()
    const SimilarArtist = () => {
        if (props.similarArtists !== undefined && props.similarArtists.artists.length > 0) {
            return (
                <ArtistsSimilarComponent {...props.similarArtists} />
            )
        }
        else {
            return null
        }
    }
    return (
        <Grid container>
            <Grid className={classes.root} item container direction="row">
                <MenuComponent {...props.menu} />
                <ArtistInfoComponent {...props.info} />
                <BreadcrumbsComponent  {...props.filterByDateInPlot} />
                <ArtistStatsPlotComponent {...props.plotStats} />
                <TracksGridComponent {...props.tracksInChart} />
                <TracksGridComponent {...props.tracksInPlaylists} />
                <AlbumGridComponent {...props.albumsInChart} />
                {props.achievement.achievements.length > 0
                    ? <AchievementComponent {...props.achievement} />
                    : null
                }
                <SimilarArtist />
            </Grid>
        </Grid>
    )
}

class ArtistPageComponent extends Component<ArtistPageProps> {

    componentDidMount() {
        this.props.didMount()
    }

    render() {
        return (
            <ArtistPageWrapComponent {...this.props} />
        )
    }
}

export default connectAdvanced(artistPageSelector)(ArtistPageComponent)
