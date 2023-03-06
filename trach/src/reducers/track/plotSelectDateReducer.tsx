import * as selectedDateActions from '../../actions/track/PlotSelectDateActions'
import * as plotInfoActions from '../../actions/track/PlotInfoActions'
import * as metricActions from '../../actions/artist/ArtistMetricActions'

export type SelectDateState = {
    startDate?: string
    endDate?: string
}

type ByChart = {
    byChart: SelectDateState
}

export type SelectedDateByTrackState = {
    byTrackId: {
        [id: number]: ByChart
    }
    byArtistId: {
        [id: number]: SelectDateState
    }
}

export const initialState: SelectedDateByTrackState = {
    byTrackId: {},
    byArtistId: {}
}

export function reducer(
    state = initialState,
    action: selectedDateActions.SelectedDateAction
): SelectedDateByTrackState {
    const newState = { ...state }
    var byTrack: ByChart = {
        byChart: {}
    }

    var byArtist: SelectDateState = {}

    switch (action.type) {
        case selectedDateActions.SelectedDateActionTypes.SelectedStartDate: {
            byTrack = newState.byTrackId[action.id]
            byArtist = newState.byArtistId[action.id]
            if (byTrack === undefined)
                byTrack = {
                    byChart: {
                        startDate: undefined,
                        endDate: undefined
                    }
                }

            if (byArtist === undefined)
                byArtist = {}

            switch (action.context) {
                case selectedDateActions.SelectedDateActionContext.ForTrack:
                    byTrack.byChart.startDate = action.date
                    newState.byTrackId[action.id] = byTrack
                    break
                case selectedDateActions.SelectedDateActionContext.ForArtist:
                    byArtist.startDate = action.date
                    newState.byArtistId[action.id] = byArtist
                    break
            }

            return newState
        }

        case selectedDateActions.SelectedDateActionTypes.SelectedEndDate: {
            byTrack = newState.byTrackId[action.id]
            if (byTrack === undefined)
                byTrack = {
                    byChart: {
                        startDate: undefined,
                        endDate: undefined
                    }
                }

            if (byArtist === undefined)
                byArtist = {}

            switch (action.context) {
                case selectedDateActions.SelectedDateActionContext.ForTrack:
                    byTrack.byChart.endDate = action.date
                    newState.byTrackId[action.id] = byTrack
                    break
                case selectedDateActions.SelectedDateActionContext.ForArtist:
                    byArtist.endDate = action.date
                    newState.byArtistId[action.id] = byArtist
                    break
            }

            return newState
        }

        case plotInfoActions.PlotInfoActionTypes.DidLoadPlotInfo: {
            const newState = { ...state }

            var track = newState.byTrackId[action.trackId]

            if (track === undefined && action.plot.dates.length > 0)
                track = {
                    byChart: {
                        startDate: action.plot.dates[0],
                        endDate: action.plot.dates[action.plot.dates.length - 1]
                    }
                }

            newState.byTrackId[action.trackId] = track

            return newState
        }

        case metricActions.ArtistMetricActionTypes.DidLoadArtistMetric: {
            const newState = { ...state }

            var artist = newState.byArtistId[action.artistId]

            if (artist === undefined && action.data.dates.length > 0)
                artist = {
                    startDate: action.data.dates[0],
                    endDate: action.data.dates[action.data.dates.length - 1]
                }

            newState.byArtistId[action.artistId] = artist

            return newState
        }

        default:
            return state
    }
}