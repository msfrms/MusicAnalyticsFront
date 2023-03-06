import * as chartActions from '../../actions/chart/TrackActions'
import * as plotActions from '../../actions/track/PlotInfoActions'
import { Stats } from "../../core/Stats"

type PlatformByTrackId = {
    byTrackId: {
        [trackId: number]: Stats
    }
}

export type StatsState = {
    byPlatform: {
        [platform: string]: PlatformByTrackId
    }
}

export const initialState: StatsState = {
    byPlatform: {}
}

export function reducer(state: StatsState = initialState, action: chartActions.TracksAction): StatsState {
    switch (action.type) {
        case chartActions.TrackActionTypes.DidLoadTracks: {
            const newState: StatsState = {...state}
            var platformState: PlatformByTrackId = newState.byPlatform[action.platform]
            if (platformState === undefined)
                platformState = {
                    byTrackId: {}
                }
            for (const stat of action.stats) {
                platformState.byTrackId[stat.trackId] = stat.stats
            }
            newState.byPlatform[action.platform] = platformState
            return newState
        }

        case plotActions.PlotInfoActionTypes.DidLoadPlotInfo: {
            const newState = {...state}

            for (const platform of action.plot.platforms) {
                var byPlatform = newState.byPlatform[platform.id]
                if (byPlatform === undefined)
                    byPlatform = {
                        byTrackId: {}
                    }
                if (platform.stats !== undefined)    
                    byPlatform.byTrackId[action.trackId] = platform.stats

                newState.byPlatform[platform.id] = byPlatform    
            }

            return newState
        }

        default:
            return state
    }
}