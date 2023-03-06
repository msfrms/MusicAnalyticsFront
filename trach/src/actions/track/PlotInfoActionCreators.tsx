import { StatsResponse } from "../chart/LoadChartActionCreator"
import store from '../../app/store'
import fetch from 'cross-fetch'
import { Constants } from '../../core/Constants'
import { AppState } from "../../reducers/mainReducer"
import { didLoadPlotInfoAction } from "./PlotInfoActions"
import { PlaylistType } from "../../core/MusicSection"

export type TimelineResponse = {
    position: number
    date: string
}

export type PlatformResponse = {
    id: string
    title: string
    stats?: StatsResponse
    timelines: TimelineResponse[]
}

export type PlotResponse = {
    platforms: PlatformResponse[]
    dates: string[]
}

export function loadPlotInfoActionCreator(trackId: number) {
    const dispatch = store.dispatch
    const state: AppState = store.getState()
    const startDate = state.selectedDateByTrack.byTrackId[trackId]?.byChart.startDate
    const endDate = state.selectedDateByTrack.byTrackId[trackId]?.byChart.endDate

    const url: string = (() => {
        switch (state.selectFilter.playlistType) {

            case PlaylistType.Chart:
                return Constants.api.track(trackId).charts.plot

            case PlaylistType.New:
                return Constants.api.track(trackId).news.plot
            
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
            startDate: startDate,
            endDate: endDate
        })
    })
    .then(
        response => response.json(),
        error => undefined
    )
    .then(
        json => {
            const response = json as PlotResponse
            if (response !== undefined) {
                dispatch(didLoadPlotInfoAction(trackId, response))
            }
        },
        _ => {}
    )
}