import store from '../../app/store'
import fetch from 'cross-fetch'
import { Constants } from '../../core/Constants'
import * as actions from '../track/TrackInfoActions'
import { ArtistResponse, PlayUrlResponse } from '../track/TrackActionCreators'

export type AlbumInfoResponse = {
    id: number
    title: string
    coverUrl?: string
    artists: ArtistResponse[]
    releaseDate?: string
    genre?: string
    label?: string
    links: PlayUrlResponse[]
}

export const loadAlbumInfoActionCreator = (albumId: number) => {
    const dispatch = store.dispatch

    dispatch(actions.inProgressTrackInfoAction(albumId))

    fetch(Constants.api.album(albumId).info, {
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
            const response = json as AlbumInfoResponse
            if (response !== undefined)
                dispatch(actions.didLoadAlbumInfoAction(response))
            else
                dispatch(actions.failedTrackInfoAction(
                    albumId, 
                    "К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы")
                )
        },
        error => dispatch(actions.failedTrackInfoAction(
            albumId, 
            "К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы")
        )
    )
}