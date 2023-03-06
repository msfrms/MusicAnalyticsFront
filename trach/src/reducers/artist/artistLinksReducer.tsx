import * as actions from "../../actions/artist/ArtistInfoActions"

export type ArtistLinkState = {
    byArtistId: {
        [artistId: number]: actions.Link[]
    }
}

export const initialState: ArtistLinkState = {
    byArtistId: {}
}

export function reducer(state = initialState, action: actions.ArtistInfoAction): ArtistLinkState {
    switch (action.type) {
        case actions.ArtistInfoActionTypes.DidLoadArtistInfo: {
            const newState = {...state}

            newState.byArtistId[action.artist.id] = action.artist.links

            return newState
        }

        default:
            return state
    }
}