import * as chartActions from '../../actions/chart/TrackActions'
import * as plotActions from '../../actions/track/PlotInfoActions'
import * as metricActions from '../../actions/artist/ArtistMetricActions'

export type PlatformState = {
    byTrack: {
        titleByPlatformId: {
            [id: string]: string
        }
        availablePlatformIds: string[]
    }
    byArtist: {
        titleByPlatformId: {
            [id: string]: string
        }
        availablePlatformIds: string[]
    }
}

export const initialState: PlatformState = {
    byTrack: {
        titleByPlatformId: {},
        availablePlatformIds: []
    },
    byArtist: {
        titleByPlatformId: {},
        availablePlatformIds: []
    }
}

export function reducer(state = initialState, action: chartActions.TracksAction): PlatformState {
    switch (action.type) {
        case chartActions.TrackActionTypes.DidLoadTracks: {
            const newState = {...state}
            newState.byTrack.availablePlatformIds = action.availablePlatforms.map(p => p.id)

            for (const platform of action.availablePlatforms) {
                newState.byTrack.titleByPlatformId[platform.id] = platform.title
            }

            return newState
        }

        case plotActions.PlotInfoActionTypes.DidLoadPlotInfo: {
            const newState = {...state}

            newState.byTrack.availablePlatformIds = action.plot.platforms.map(p => p.id)
            
            for (const platform of action.plot.platforms) {
                newState.byTrack.titleByPlatformId[platform.id] = platform.title
            }

            return newState
        }

        case metricActions.ArtistMetricActionTypes.DidLoadArtistMetric: {
            const newState = {...state}

            newState.byArtist.availablePlatformIds = action.data.metrics.map(p => p.id)
            
            for (const metric of action.data.metrics) {
                newState.byArtist.titleByPlatformId[metric.id] = metric.title
            }

            return newState
        }

        default:
            return state
    }
}