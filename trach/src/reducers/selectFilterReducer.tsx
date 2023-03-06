import { PlaylistType } from '../core/MusicSection'
import { MusicCategory } from '../core/MusicCategory'
import { PlaylistDateFilterTypes } from '../actions/track/PlaylistActions'
import * as actions from '../actions/SelectFilterActions'

export type SelectFilterState = {
    platformId?: string
    playlistType: PlaylistType
    category: MusicCategory
    date?: string
    playlist: {
        [trackId: number]: {
            type: PlaylistDateFilterTypes
            date?: string
        }
    }
    plot: {
        [trackId: number]: {
            type: PlaylistType
            startDate?: string
            endDate?: string
        }
    }
}

export const initialState: SelectFilterState = {
    playlistType: PlaylistType.Chart,
    category: MusicCategory.Track,
    platformId: undefined,
    date: undefined,
    playlist: {},
    plot: {}
}

export function reducer(state = initialState, action: actions.SelectFilterAction): SelectFilterState {
    
    switch (action.type) {

        case actions.SelectFilterActionTypes.Platform:
            return {
                ...state,
                platformId: action.platform
            }

        case actions.SelectFilterActionTypes.PlaylistType:
            return {
                ...state,
                playlistType: action.playlistType
            }

        case actions.SelectFilterActionTypes.MusicCategory:
            return {
                ...state,
                category: action.category
            }

        case actions.SelectFilterActionTypes.Date:
            return {
                ...state,
                date: action.date
            }

        case actions.SelectFilterActionTypes.PlaylistCategory: {
            const newState = JSON.parse(JSON.stringify(state.playlist))

            newState[action.trackId] = {
                type: action.category,
                date: action.date
            }

            return {
                ...state,
                playlist: newState
            }
        }

        case actions.SelectFilterActionTypes.PlotFilter:
            const plotState: typeof state.plot = JSON.parse(JSON.stringify(state.plot))

            const plotTrackState = plotState[action.trackId]

            if (plotTrackState !== undefined) {
                if (action.startDate !== undefined) {
                    plotTrackState.startDate = action.startDate
                }
                if (action.endDate !== undefined) {
                    plotTrackState.endDate = action.endDate
                }
                plotTrackState.type = action.section
            }
            else {
                plotState[action.trackId] = {
                    type: action.section,
                    startDate: action.startDate,
                    endDate: action.endDate
                }
            }

            return {
                ...state,
                plot: plotState
            }

        default:
            return state
    }
}
