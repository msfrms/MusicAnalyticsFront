import * as actions from "../../actions/artist/ArtistMetricActions"

export type MetricValueByDate = {
    byDate: {
        [date: string]: number
    }
}
export type ByMetric = {
    byMetricId: {
        [id: string]: MetricValueByDate
    }
}
export type ArtistMetricsState = {
    byId: {
        [id: string]: ByMetric
    }
}

export const initialState: ArtistMetricsState = {
    byId: {}
}

export function reducer(
    state: ArtistMetricsState = initialState,
    action: actions.ArtistMetricAction
): ArtistMetricsState {
    switch (action.type) {
        case actions.ArtistMetricActionTypes.DidLoadArtistMetric: {
            const newState = { ...state }
            var byArtist = newState.byId[action.artistId]
            if (byArtist === undefined)
                byArtist = {
                    byMetricId: {}
                }

            for (const metric of action.data.metrics) {
                var byDate = byArtist.byMetricId[metric.id]
                if (byDate === undefined)
                    byDate = {
                        byDate: {}
                    }
                for (const timeline of metric.timelines) {
                    byDate.byDate[timeline.date] = timeline.value
                }
                byArtist.byMetricId[metric.id] = byDate
            }

            newState.byId[action.artistId] = byArtist

            return newState
        }
        default:
            return state
    }
}
