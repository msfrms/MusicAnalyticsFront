import { SimilarArtist } from "../../core/SimilarArtist";

export enum SimilarArtistActionTypes {
    DidLoadSimilarArtists = "SimilarArtistActionTypes.DidLoadSimilarArtists",    
}

export type DidLoadSimilarArtistAction = {
    type: SimilarArtistActionTypes.DidLoadSimilarArtists
    artistId: number
    similarArtists: SimilarArtist[]
}

export function didDidLoadSimilarArtistAction(
    similarArtists: SimilarArtist[], 
    artistId: number
): DidLoadSimilarArtistAction {
    return {
        type: SimilarArtistActionTypes.DidLoadSimilarArtists,
        artistId: artistId,
        similarArtists: similarArtists
    }
}

export type SimilarArtistAction = DidLoadSimilarArtistAction