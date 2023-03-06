import { PlayUrl } from "../../core/Track"
import * as actions from '../../actions/track/TrackInfoActions'

export type PlayUrlsState = {
    byTrackId: {
        [id: number]: PlayUrl[]
    }
}

export const initialState: PlayUrlsState = {
    byTrackId: {}
}

export function reducer(state = initialState, action: actions.DidLoadTrackInfoAction): PlayUrlsState {
    switch (action.type) {
        case actions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState = {...state}

            newState.byTrackId[action.trackId] = action.playUrls

            return newState
        }

        default:
            return state
    }
}