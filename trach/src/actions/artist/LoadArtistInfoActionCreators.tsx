import fetch from 'cross-fetch'
import store from '../../app/store'
import { Constants } from '../../core/Constants'
import * as actions from './ArtistInfoActions'

export type LinkResponse = {
    title: string
    url: string
}

export type ArtistResponse = {
    id: number
    name: string
    coverUrl?: string
    links: LinkResponse[]
}

export function loadArtistInfoActionCreator(artistId: number) {
    const dispatch = store.dispatch

    fetch(Constants.api.artist(artistId).info, {
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
            const response = json as ArtistResponse

            if (response !== undefined)
                dispatch(actions.didLoadArtistInfoAction(response))
        },
        error => {}
    )
}