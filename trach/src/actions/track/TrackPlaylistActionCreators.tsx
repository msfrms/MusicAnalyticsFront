import store from '../../app/store'
import fetch from 'cross-fetch'
import { Constants } from '../../core/Constants'
import { AppState } from '../../reducers/mainReducer'
import * as actions from './PlaylistActions'

type PlaylistResponse = {
    platform: string
    title: string
    author: string
    coverUrl?: string
    position: string
    metrics: string[]
}

export function trackPlaylistActionCreators(trackId: number) {
    const state: AppState = store.getState()
    const dispatch = store.dispatch
    const date = state.selectFilter.playlist[trackId]?.date ?? ""

    dispatch(actions.startLoadPlaylistsAction(trackId, date))

    fetch(Constants.api.track(trackId).playlists, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: date.length > 0 ? JSON.stringify({date: date}) : undefined
    })
    .then(
        response => response.json(),
        _ => undefined
    )
    .then(
        json => {
            const response = json as PlaylistResponse[]
            dispatch(actions.finishLoadPlaylistsAction(trackId, date, response))
        },
        _ => {
            if (date === undefined)
                dispatch(actions.errorLoadPlaylistsAction(
                    trackId, 
                    date, 
                    "Нет данных за все время, мы работаем над исправлением этой проблемы")
                )
            else
                dispatch(actions.errorLoadPlaylistsAction(
                    trackId, 
                    date, 
                    `Нет данных за ${date}, мы работаем над исправлением этой проблемы`)
                )    
        }
    )
    
}