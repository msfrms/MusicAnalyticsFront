import { FoundItem, SearchAction, SearchActionTypes } from '../actions/SearchActions'

export type SearchState = {
    search: string
    tracks: FoundItem[]
    artists: FoundItem[]
    albums: FoundItem[]
}

export const initialState: SearchState = {
    search: '',
    tracks: [],
    artists: [],
    albums: []
}

export function reducer(state = initialState, action: SearchAction): SearchState {
    switch (action.type) {
        case SearchActionTypes.Search: {
            return {
                search: action.search,
                artists: action.artists,
                tracks: action.tracks,
                albums: action.albums
            }
        }
        default:
            return state
    }
}
