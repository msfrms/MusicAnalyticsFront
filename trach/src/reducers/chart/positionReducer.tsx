import * as chartActions from '../../actions/chart/TrackActions'
import * as plotActions from '../../actions/track/PlotInfoActions'
import { TrackProgress } from "../../core/Position"

type ByDiff = {
    progress: TrackProgress
    shift?: number
}

type ByTrackIndex = {
    positionByIndex: number[]
    diffByIndex: ByDiff[]
}

type ByDate = {
    byDate: {
        [date: string]: ByTrackIndex
    }
}

export type PositionState = {
    byPlatform: {
        [platform: string]: ByDate
    }
}

export const initialState: PositionState = {
    byPlatform: {}
}

export function reducer(
    state: PositionState = initialState, 
    action: chartActions.TracksAction
    ): PositionState {

    switch (action.type) {
        case chartActions.TrackActionTypes.DidLoadTracks: {
            const newState = {...state}

            var platform = newState.byPlatform[action.platform]
            if (platform === undefined)
                platform = {
                    byDate: {}
                }

            var date = platform.byDate[action.date]
            if (date === undefined)
                date = {
                    positionByIndex: [],
                    diffByIndex: []
                }

            date.positionByIndex = action.positions.map(p => p.position.value)    
            date.diffByIndex = action.positions.map(p => {
                return {
                    progress: p.position.progress,
                    shift: p.position.shift
                }
            })

            platform.byDate[action.date] = date
            newState.byPlatform[action.platform] = platform

            return newState
        }

        case plotActions.PlotInfoActionTypes.DidLoadPlotInfo: {
            const newState = {...state}

            for (const p of action.plot.platforms) {
                // eslint-disable-next-line
                var platform = newState.byPlatform[p.id]
                if (platform === undefined)
                    platform = {
                        byDate: {}
                    }

                for (const timeline of p.timelines) {
                    // eslint-disable-next-line
                    var date = platform.byDate[timeline.date]
                    if (date === undefined)
                        date = {
                            positionByIndex: [],
                            diffByIndex: []
                        }
                    date.positionByIndex.push(timeline.position)
                    platform.byDate[timeline.date] = date
                }

                newState.byPlatform[p.id] = platform
            }

            return newState
        }

        default:
            return state

    }
}