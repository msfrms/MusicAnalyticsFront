import * as chartActions from '../../actions/chart/TrackActions'
import * as trackInfoActions from '../../actions/track/TrackInfoActions'

export type LabelState = {
    byTrackId: {
        [trackId: number]: string[]
    }
}

export const initialState: LabelState = {
    byTrackId: {}
}

export function reducer(state = initialState, action: chartActions.TracksAction): LabelState {

    switch (action.type) {
                
        case chartActions.TrackActionTypes.DidLoadTracks: {
            const newState: LabelState = {...state}

            for (const track of action.labels) {
                newState.byTrackId[track.trackId] = track.labels
            }
            return newState
        }

        case trackInfoActions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState: LabelState = {...state}

            newState.byTrackId[action.trackId] = action.labels
            
            return newState
        }

        default:
            return state
            
    }
}
