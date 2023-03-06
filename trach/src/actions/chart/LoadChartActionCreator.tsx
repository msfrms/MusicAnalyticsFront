import { PlaylistType } from '../../core/MusicSection'
import { Constants } from '../../core/Constants'
import * as Feature from '../../core/Feature'
import store from '../../app/store'

import * as tracks from './TrackActions'

import fetch from 'cross-fetch'
import { AppState } from '../../reducers/mainReducer'
import { MusicCategory } from '../../core/MusicCategory'

const DateFormat = require('dateformat')

export type ArtistResponse = {
    id: number
    name: string
}

export type PositionResponse = {
    value: number
    progress: string
    shift?: number
}

export type StatsResponse = {
    maxPosition: number
    daysInChart: number
}

export type ChartResponse = {
    position: PositionResponse
    stats: StatsResponse
}

export type TrackResponse = {
    id: number
    title: string
    artists: ArtistResponse[]
    coverUrl: string
    labels: string[]
    chart: ChartResponse
}

export type PlatformResponse = {
    id: string
    title: string
}

export type PlaylistResponse = {
    id: number
    availablePlatforms: PlatformResponse[]
    type: string
    tracks: TrackResponse[]
}

export const loadTracksActionCreator = () => {

    return (dispatch: (action: any) => void) => {

        const nextState: AppState = store.getState()
        const platform = nextState.selectFilter.platformId ?? "apple_music"
        const dateString = nextState.selectFilter.date ?? DateFormat(new Date(), "dd.MM.yyyy")
    
        if (Feature.isDisabled()) {
            return
        }
                            
        dispatch(tracks.loadingTracks(nextState.selectFilter.playlistType, platform, dateString))

        const url: string = (() => {
            switch (nextState.selectFilter.playlistType) {

                case PlaylistType.Chart:
                    switch (nextState.selectFilter.category) {
                        case MusicCategory.Track:
                            return Constants.api.list.chart.tracks
                        case MusicCategory.Album:
                            return Constants.api.list.chart.albums
                        default:
                            return ""      
                    }

                case PlaylistType.New:
                    switch (nextState.selectFilter.category) {
                        case MusicCategory.Track:
                            return Constants.api.list.news.tracks
                        case MusicCategory.Album:
                            return Constants.api.list.news.albums
                        case MusicCategory.Artist:
                            return Constants.api.list.news.artists    
                        default:
                            return ""      
                    }
                
                default:
                    return ""    
            }
        })()

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                platform: platform,
                date: dateString
            })
        })
        .then(
            response => response.json(),
            error => undefined
        )
        .then(
            json => {
                const response = json as PlaylistResponse
                if (response === undefined) {
                    dispatch(tracks.failedLoadedTracks(
                        nextState.selectFilter.playlistType, 
                        platform, 
                        dateString)
                    )
                    return
                }
                dispatch(tracks.didLoadTracks(
                    response, 
                    platform,
                    dateString, 
                    nextState.selectFilter.playlistType)
                )
            },
            error => dispatch(tracks.failedLoadedTracks(
                nextState.selectFilter.playlistType, 
                platform, 
                dateString)
            )
        )
    }
}
