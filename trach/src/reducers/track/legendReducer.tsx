import * as legendActions from '../../actions/track/LegendActions'
import * as plotActions from '../../actions/track/PlotInfoActions'
import * as metricActions from '../../actions/artist/ArtistMetricActions'

export type BoolPlatformId = {
    [platform: string]: boolean
}

type Platforms = {
    selectedByPlatformId: BoolPlatformId
    enabledByPlatformId: BoolPlatformId
}

type ById = {
    [id: number]: Platforms
}

export type LegendState = {
    forTrack: {
        byTrackId: ById
    },
    forArtist: {
        byArtistId: ById
    }
}

export const initialState: LegendState = {
    forTrack: {
        byTrackId: {}
    },
    forArtist: {
        byArtistId: {}
    }
}

export function reducer(state = initialState, action: legendActions.LegendAction): LegendState {
    switch (action.type) {
        case legendActions.LegendActionTypes.SelectedPlatform: {
            const newState = { ...state }
            var byTrack: Platforms = {
                selectedByPlatformId: {},
                enabledByPlatformId: {}
            }
            var selected = false

            switch (action.context) {
                case legendActions.LegendActionContext.ForTrack:
                    byTrack = newState.forTrack.byTrackId[action.id]
                    if (byTrack === undefined)
                        byTrack = {
                            selectedByPlatformId: {},
                            enabledByPlatformId: {}
                        }

                    selected = byTrack.selectedByPlatformId[action.platformId]

                    if (selected === undefined)
                        selected = false

                    selected = !selected

                    byTrack.selectedByPlatformId[action.platformId] = selected
                    newState.forTrack.byTrackId[action.id] = byTrack
                    break

                case legendActions.LegendActionContext.ForArtist:
                    byTrack = newState.forArtist.byArtistId[action.id]
                    if (byTrack === undefined)
                        byTrack = {
                            selectedByPlatformId: {},
                            enabledByPlatformId: {}
                        }

                    selected = byTrack.selectedByPlatformId[action.platformId]

                    if (selected === undefined)
                        selected = false

                    selected = !selected

                    byTrack.selectedByPlatformId[action.platformId] = selected
                    newState.forArtist.byArtistId[action.id] = byTrack
                    break
            }
            return newState
        }

        case plotActions.PlotInfoActionTypes.DidLoadPlotInfo: {
            const newState = { ...state }

            // eslint-disable-next-line
            var byTrack = newState.forTrack.byTrackId[action.trackId]
            if (byTrack === undefined)
                byTrack = {
                    selectedByPlatformId: {},
                    enabledByPlatformId: {}
                }

            for (const platform of action.plot.platforms) {
                byTrack.enabledByPlatformId[platform.id] = platform.timelines.length > 0
                byTrack.selectedByPlatformId[platform.id] = true
            }

            newState.forTrack.byTrackId[action.trackId] = byTrack

            return newState
        }

        case metricActions.ArtistMetricActionTypes.DidLoadArtistMetric: {
            const newState = { ...state }

            // eslint-disable-next-line
            var byArtrist = newState.forArtist.byArtistId[action.artistId]
            if (byArtrist === undefined)
                byArtrist = {
                    selectedByPlatformId: {},
                    enabledByPlatformId: {}
                }

            for (const metric of action.data.metrics) {
                byArtrist.enabledByPlatformId[metric.id] = metric.timelines.length > 0
                byArtrist.selectedByPlatformId[metric.id] = true
            }

            newState.forArtist.byArtistId[action.artistId] = byArtrist

            return newState
        }

        default:
            return state
    }
}