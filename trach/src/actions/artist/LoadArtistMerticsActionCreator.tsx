import fetch from 'cross-fetch'
import store from '../../app/store'
import { Constants } from '../../core/Constants'
import { AppState } from '../../reducers/mainReducer'
import * as actions from './ArtistMetricActions'

export type TimelineResponse = {
    value: number
    date: string
}

export type MetricResponse = {
    id: string
    title: string
    timelines: TimelineResponse[]
}

export type ArtistPlotResponse = {
    metrics: MetricResponse[]
    dates: string[]
}

export function loadArtistMerticsActionCreator(artistId: number) {
    const dispatch = store.dispatch
    const state: AppState = store.getState()

    const startDate = state.selectedDateByTrack.byArtistId[artistId]?.startDate
    const endDate = state.selectedDateByTrack.byArtistId[artistId]?.endDate

    fetch(Constants.api.artist(artistId).plot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate
        })
    })
    .then(
        response => response.json(),
        _ => undefined
    )
    .then(
        json => {
            const response = json as ArtistPlotResponse

            if (response !== undefined)
                dispatch(actions.didLoadArtistInfoAction(response, artistId))
        },
        error => {}
    )
}