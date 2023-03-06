import store from '../../app/store'
import fetch from 'cross-fetch'
import { Constants } from '../../core/Constants'
import * as actions from './TrackInfoActions'

export type AlbumResponse = {
    id: number
    title: string
    releaseDate?: string
}

export type PlayUrlResponse = {
    url: string
    platform: string
}

export type ArtistResponse = {
    id: number
    name: string
    tracksInChart: number
    tracksInPlaylists: number
}

export type TrackInfoResponse = {
    id: number
    title: string
    coverUrl?: string
    album?: AlbumResponse
    artists: ArtistResponse[]
    genres: string[]
    labels: string[]
    playUrls: PlayUrlResponse[]
}

export const loadTracksInfoActionCreator = (trackId: number) => {
    const dispatch = store.dispatch

    dispatch(actions.inProgressTrackInfoAction(trackId))

    fetch(Constants.api.track(trackId).info, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }        
    })
    .then(
        response => response.json(),
        _ => undefined
    )
    .then(
        json => {
            const response = json as TrackInfoResponse
            if (response !== undefined)
                dispatch(actions.didLoadTrackInfoAction(response))
            else
                dispatch(actions.failedTrackInfoAction(
                    trackId, 
                    "К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы")
                )
        },
        error => dispatch(actions.failedTrackInfoAction(
            trackId, 
            "К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы")
        )
    )
}