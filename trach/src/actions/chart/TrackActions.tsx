import { TrackTypes } from '../../core/MusicCategory'
import { PlaylistType } from '../../core/MusicSection'
import { Position, TrackProgress } from '../../core/Position'
import { Stats } from '../../core/Stats'
import { Track } from '../../core/Track'
import { AlbumChartsAction } from '../album/AlbumInChartsAction'
import { DidLoadArtistInfoAction, DidLoadTracksInPlaylistsAction } from '../artist/ArtistInfoActions'
import { ArtistMetricAction } from '../artist/ArtistMetricActions'
import { DidLoadPlotInfoAction } from '../track/PlotInfoActions'
import { DidLoadTrackInfoAction } from '../track/TrackInfoActions'
import { PlaylistResponse } from './LoadChartActionCreator'

export enum TrackActionTypes {
    DidLoadTracks = "TrackActionTypes.DidLoadTracks",
    LoadingTracks = "TrackActionTypes.LoadingTracks",
    FailedLoadedTracks = "TrackActionTypes.FailedLoadedTracks"
}

export type Artist = {
    id: number
    name: string
    coverUrl?: string
}

export type TrackType = {
    id: number
    type: TrackTypes
}

export type ArtistByTrack = {
    trackId: number
    artists: Artist[]
}

export type LabelByTrack  = {
    trackId: number
    labels: string[]
}

export type PositionByTrack = {
    trackId: number
    position: Position
}

export type StatsByTrack = {
    trackId: number
    stats: Stats
}

export type Platform = {
    id: string
    title: string
}

export type DidLoadTracksAction = {
    type: TrackActionTypes.DidLoadTracks
    playlistType: PlaylistType
    platform: string
    date: string
    tracks: Track[]
    labels: LabelByTrack[]
    artists: ArtistByTrack[]
    positions: PositionByTrack[]
    stats: StatsByTrack[]
    availablePlatforms: Platform[]
    trackTypes: TrackType[]
}

export function didLoadTracks(
    playlistResponse: PlaylistResponse, 
    platform: string, 
    date: string,
    playlistType: PlaylistType
): DidLoadTracksAction {
    
    const tracks: Track[] = []
    const labels: LabelByTrack[] = []
    const artists: ArtistByTrack[] = []
    const positions: PositionByTrack[] = []
    const stats: StatsByTrack[] = []
    const types: TrackType[] = []

    for (const track of playlistResponse.tracks) {
        tracks.push({
            id: track.id,
            title: track.title,
            coverUrl: track.coverUrl
        })
        labels.push({
            trackId: track.id,
            labels: track.labels
        })
        artists.push({
            trackId: track.id,
            artists: track.artists
        })
        positions.push({
            trackId: track.id,
            position: {
                value: track.chart.position.value,
                progress: track.chart.position.progress as TrackProgress,
                shift: track.chart.position.shift
            }
        })
        stats.push({
            trackId: track.id,
            stats: {
                maxPosition: track.chart.stats.maxPosition,
                daysInChart: track.chart.stats.daysInChart
            }
        })
        types.push({
            id: track.id,
            type: playlistResponse.type as TrackTypes
        })
    }
    return {
        type: TrackActionTypes.DidLoadTracks,
        playlistType: playlistType,
        platform: platform,
        date: date,
        tracks: tracks,
        labels: labels,
        artists: artists,
        positions: positions,
        stats: stats,
        availablePlatforms: playlistResponse.availablePlatforms.map(p => {
            const platform: Platform = {
                id: p.id,
                title: p.title
            }
            return platform
        }),
        trackTypes: types
    }
}

export type FailedLoadedTracks = {
    type: TrackActionTypes.FailedLoadedTracks
    playlistType: PlaylistType
    platform: string
    date: string
    text: string
}

export function failedLoadedTracks(
    playlistType: PlaylistType, 
    platform: string,
    date: string,
    text: string = "К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы"
): FailedLoadedTracks {
    return {
        type: TrackActionTypes.FailedLoadedTracks,
        playlistType: playlistType,
        platform: platform,
        date: date,
        text: text
    }
}

export type LoadingTracks = {
    type: TrackActionTypes.LoadingTracks
    playlistType: PlaylistType
    platform: string
    date: string
}

export function loadingTracks(
    playlistType: PlaylistType, 
    platform: string,
    date: string,
): LoadingTracks {
    return {
        type: TrackActionTypes.LoadingTracks,
        playlistType: playlistType,
        platform: platform,
        date: date
    }
}

export type TracksAction = DidLoadTracksAction 
| FailedLoadedTracks 
| LoadingTracks 
| DidLoadTrackInfoAction 
| DidLoadPlotInfoAction
| DidLoadArtistInfoAction
| DidLoadTracksInPlaylistsAction
| AlbumChartsAction
| ArtistMetricAction
