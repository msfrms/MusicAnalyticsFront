import { Playlist } from '../core/Playlist'
import { PlaylistAction, PlaylistActionTypes } from '../actions/track/PlaylistActions'

export type PlaylistItemState = {
    loaded: Playlist[]
    error: string
    loading: boolean
}

export type PlaylistState = {
    [trackId: number]: PlaylistItemState
}

export const initialState: PlaylistState = {}

export function reducer(state = initialState, action: PlaylistAction): PlaylistState {
    
    const changeState = 
    (itemState: PlaylistItemState) => {
        const newState = JSON.parse(JSON.stringify(state))
        newState[action.trackId] = itemState
        return newState 
    }

    switch (action.type) {

        case PlaylistActionTypes.StartLoadPlaylists: {
            return changeState({
                loading: true,
                loaded: [],
                error: ""
            })
        }

        case PlaylistActionTypes.ErrorLoadPlaylists: {
            return changeState({
                loading: false,
                loaded: [],
                error: action.error
            })
        }

        case PlaylistActionTypes.FinishLoadPlaylists: {
            return changeState({
                loading: false,
                loaded: action.playlists,
                error: ""
            })
        }

        default:
            return state
    }
}
