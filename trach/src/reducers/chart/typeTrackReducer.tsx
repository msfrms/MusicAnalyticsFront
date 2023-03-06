import { TrackTypes } from "../../core/MusicCategory"
import * as actions from '../../actions/chart/TrackActions'

export type TypeTrackState = {
    byId: {
        [id: number]: TrackTypes
    }
}

export const initialState: TypeTrackState = {
    byId: {}
}

export function reducer(state = initialState, action: actions.TracksAction): TypeTrackState {
    switch (action.type) {
        case actions.TrackActionTypes.DidLoadTracks: {
            const newState = {...state}
            for (const type of action.trackTypes) {
                newState.byId[type.id] = type.type
            }

            return newState
        }

        default:
            return state
    }
}