import { ArtistMetric } from "../../core/ArtistMetric"

export enum ArtistMetricActionTypes {
    DidLoadArtistMetric = "ArtistMetricActionTypes.DidLoadArtistMetric",    
}

export type DidLoadArtistMetricAction = {
    type: ArtistMetricActionTypes.DidLoadArtistMetric
    artistId: number
    data: ArtistMetric
}

export function didLoadArtistInfoAction(response: ArtistMetric, artistId: number): DidLoadArtistMetricAction {
    return {
        type: ArtistMetricActionTypes.DidLoadArtistMetric,
        artistId: artistId,
        data: response
    }
}

export type ArtistMetricAction = DidLoadArtistMetricAction