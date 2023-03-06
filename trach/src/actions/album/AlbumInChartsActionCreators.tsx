import fetch from 'cross-fetch'
import store from '../../app/store'
import { Constants } from '../../core/Constants'
import * as actions from './AlbumInChartsAction'

export type AlbumsResponse = {
    id: number,
    title: string,
    coverUrl?: string,
    bestPlatform: string,
    year?: number,
    otherPlatforms: string[]
}

export function loadAlbumInChartsActionCreator(artistId: number) {
    const dispatch = store.dispatch

    fetch(Constants.api.artist(artistId).albums.chart, {
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
            const response = json as AlbumsResponse[]

            if (response !== undefined)
                dispatch(actions.didLoadAlbumsChartAction(artistId, response))
        },
        _ => {}
    )
}