import * as actions from '../../actions/track/PlotInfoActions'
import * as metricActions from '../../actions/artist/ArtistMetricActions'

type DatesById = {
    [id: number]: string[]
}

export type PlotDateLinesState = {
    forTrackPlot: {
        datesByTrackId: DatesById
    },
    forArtistPlot: {
        datesByArtistId: DatesById
    }
}

export const initialState: PlotDateLinesState = {
    forArtistPlot: {
        datesByArtistId: {}
    },
    forTrackPlot: {
        datesByTrackId: {}
    }
}

export function reducer(state = initialState, action: actions.PlotInfoAction): PlotDateLinesState {
    switch (action.type) {
        case actions.PlotInfoActionTypes.DidLoadPlotInfo: {
            const newState = { ...state }

            newState.forTrackPlot.datesByTrackId[action.trackId] = action.plot.dates

            return newState
        }
        case metricActions.ArtistMetricActionTypes.DidLoadArtistMetric: {
            const newState = { ...state }

            newState.forArtistPlot.datesByArtistId[action.artistId] = action.data.dates

            return newState
        }

        default:
            return state
    }
}