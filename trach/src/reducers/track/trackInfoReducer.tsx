import * as actions from '../../actions/track/TrackInfoActions'

export type TrackInfoState = {
    inProgress: boolean
    failed: string
}

export type TracksInfoState = {
    byTrackId: {
        [id: number]: TrackInfoState
    }
}

export const initialState: TracksInfoState = {
    byTrackId: {}
}

export function isLoaded(state: TrackInfoState | undefined): boolean {
    return state !== undefined && !state.inProgress && state.failed === ""
}

export function reducer(state = initialState, action: actions.TrackInfoAction): TracksInfoState {
    
    switch (action.type) {
        case actions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState = {...state}

            var trackState = newState.byTrackId[action.trackId]
            if (trackState === undefined)
                trackState = {
                    inProgress: false,
                    failed: ""
                }
            trackState.failed = ""
            trackState.inProgress = false

            newState.byTrackId[action.trackId] = trackState

            return newState
        }

        case actions.TrackInfoActionTypes.FailedTrackInfo: {
            const newState = {...state}
            // eslint-disable-next-line
            var trackState = newState.byTrackId[action.trackId]

            if (trackState === undefined)
                trackState = {
                    inProgress: false,
                    failed: ""
                }

            trackState.failed = action.text
            trackState.inProgress = false
    
            newState.byTrackId[action.trackId] = trackState
                 
            return newState
        }

        case actions.TrackInfoActionTypes.InProgressTrackInfo: {
            const newState = {...state}
            // eslint-disable-next-line
            var trackState = newState.byTrackId[action.trackId]

            if (trackState === undefined)
                trackState = {
                    inProgress: false,
                    failed: ""
                }
                
            trackState.failed = ""
            trackState.inProgress = true
    
            newState.byTrackId[action.trackId] = trackState
                 
            return newState
        }

        default:
            return state

    }
}