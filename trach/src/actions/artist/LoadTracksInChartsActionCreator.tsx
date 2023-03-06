import fetch from 'cross-fetch'
import store from '../../app/store'
import { Constants } from '../../core/Constants'
import * as actions from './ArtistInfoActions'

export type TrackResponse = {
    id: number
    title: string
    subtitle: string
    coverUrl?: string
    platforms: string[]
}

export function loadTracksInChartsActionCreator(artistId: number) {
    const dispatch = store.dispatch

    fetch(Constants.api.artist(artistId).tracks.inCharts, {
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
            const response = json as TrackResponse[]

            if (response !== undefined)
                dispatch(actions.didLoadTracksInPlaylistsAction(artistId, response, true))
        },
        error => {}
    )
}

export function loadTracksInPlaylistsActionCreator(artistId: number) {
    const dispatch = store.dispatch

    fetch(Constants.api.artist(artistId).tracks.inPlaylists, {
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
            const response = json as TrackResponse[]

            if (response !== undefined)
                dispatch(actions.didLoadTracksInPlaylistsAction(artistId, response, false))
        },
        error => {}
    )
}