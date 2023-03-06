import * as actions from '../../actions/track/TrackInfoActions'

export type StatsByArtistState = {
    byArtistId: {
        [id: number]: {
            numberOfTrackInChart: number
            numberOfTracksInPlaylists: number
        }
    }
}

export const initialState: StatsByArtistState = {
    byArtistId: {}
}

export function reducer(state = initialState, action: actions.DidLoadTrackInfoAction): StatsByArtistState {
    switch (action.type) {
        case actions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState = {...state}

            for (const artist of action.artists) {
                newState.byArtistId[artist.id] = {
                    numberOfTrackInChart: artist.tracksInChart,
                    numberOfTracksInPlaylists: artist.tracksInPlaylists
                }
            }

            return newState
        }

        default:
            return state
    }
}