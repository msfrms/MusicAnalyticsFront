import fetch from 'cross-fetch'
import store from '../../app/store'
import { Constants } from '../../core/Constants'
import * as actions from './ArtistInfoActions'

export type AchievementResponse = {
    title: string
    rating?: {
        value: number
        max: number
    }
    coverUrl?: string
}

export function loadAchievementsActionCreator(artistId: number) {
    const dispatch = store.dispatch

    fetch(Constants.api.artist(artistId).achievement, {
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
            const response = json as AchievementResponse[]

            if (response !== undefined)
                dispatch(actions.didLoadAchievementAction(artistId, response))
        },
        error => {}
    )
}