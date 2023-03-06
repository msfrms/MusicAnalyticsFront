import { SimilarArtist } from "../../core/SimilarArtist";
import * as actions from "../../actions/artist/SimilarArtistActions"

export type SimilarArtistState = {
    byArtistId: {
        [id: string]: SimilarArtist[]
    }
}

export const initialState: SimilarArtistState = {
    byArtistId: {}
}

export function reducer(
    state = initialState, 
    action: actions.SimilarArtistAction
): SimilarArtistState {
    switch (action.type) {
        case actions.SimilarArtistActionTypes.DidLoadSimilarArtists:
            const newState = {...state}
            newState.byArtistId[action.artistId] = action.similarArtists
            return newState
        default:
            return state    
    }    
}