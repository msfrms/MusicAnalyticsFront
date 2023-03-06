import store from '../../app/store'
import fetch from 'cross-fetch'
import { Constants } from '../../core/Constants'
import { AppState } from "../../reducers/mainReducer"
import { didLoadPlotInfoAction } from "../track/PlotInfoActions"
import { PlaylistType } from "../../core/MusicSection"
import { PlotResponse } from "../track/PlotInfoActionCreators"

export function loadAlbumPlotInfoActionCreator(albumId: number) {
    const dispatch = store.dispatch
    const state: AppState = store.getState()
    const startDate = state.selectedDateByTrack.byTrackId[albumId]?.byChart.startDate
    const endDate = state.selectedDateByTrack.byTrackId[albumId]?.byChart.endDate

    const url: string = (() => {
        switch (state.selectFilter.playlistType) {

            case PlaylistType.Chart:
                return Constants.api.album(albumId).charts.plot

            case PlaylistType.New:
                return Constants.api.album(albumId).news.plot
            
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
                dispatch(didLoadPlotInfoAction(albumId, response))
            }
        },
        _ => {}
    )
}