import { DidLoadArtistMetricAction } from "../artist/ArtistMetricActions"
import { DidLoadPlotInfoAction } from "./PlotInfoActions"

export enum LegendActionContext {
    ForTrack = "LegendActionContext.ForTrack",
    ForArtist = "LegendActionContext.ForArtist",
}

export enum LegendActionTypes {
    SelectedPlatform = "LegendActionTypes.SelectedPlatform",
}

export type SelectedPlatformAction = {
    type: LegendActionTypes.SelectedPlatform
    context: LegendActionContext,
    id: number
    platformId: string
}

export function selectedTrackPlatformAction(trackId: number, platformId: string): SelectedPlatformAction {
    return {
        type: LegendActionTypes.SelectedPlatform,
        context: LegendActionContext.ForTrack,
        id: trackId,
        platformId: platformId
    }
}

export function selectedArtistPlatformAction(artistId: number, platformId: string): SelectedPlatformAction {
    return {
        type: LegendActionTypes.SelectedPlatform,
        context: LegendActionContext.ForArtist,
        id: artistId,
        platformId: platformId
    }
}

export type LegendAction = SelectedPlatformAction | DidLoadPlotInfoAction | DidLoadArtistMetricAction