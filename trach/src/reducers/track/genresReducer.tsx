import * as actions from '../../actions/track/TrackInfoActions'

export type GenreState = {
    byTrackId: {
        [id: number]: string[]
    }
}

export const initialState: GenreState = {
    byTrackId: {}
}

export function reducer(state = initialState, action: actions.DidLoadTrackInfoAction): GenreState {
    switch (action.type) {
        case actions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState = {...state}

            newState.byTrackId[action.trackId] = action.genres

            return state
        }

        default:
            return state

    }
}
