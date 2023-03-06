import { Artist } from "./chart/TrackActions"

export enum ArtistActionTypes {
    DidLoadArtists = "ArtistActionTypes.DidLoadArtists"
}

export type DidLoadArtistsAction = {
    type: ArtistActionTypes.DidLoadArtists
    trackId: number
    artists: Artist[]
}

export function didLoadArtists(artists: Artist[], byTrackId: number): DidLoadArtistsAction {
    return {
        type: ArtistActionTypes.DidLoadArtists,
        trackId: byTrackId,
        artists: artists
    }
}
