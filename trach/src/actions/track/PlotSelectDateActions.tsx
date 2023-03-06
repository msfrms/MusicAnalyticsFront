import { DidLoadArtistMetricAction } from "../artist/ArtistMetricActions"
import { DidLoadPlotInfoAction } from "./PlotInfoActions"

export enum SelectedDateActionContext {
    ForTrack = "SelectedDateActionContext.ForTrack",
    ForArtist = "SelectedDateActionContext.ForArtist"    
}

export enum SelectedDateActionTypes {
    SelectedStartDate = "SelectedDateActionTypes.SelectedStartDate",
    SelectedEndDate = "SelectedDateActionTypes.SelectedEndDate"    
}

export type SelectedStartDateAction = {
    type: SelectedDateActionTypes.SelectedStartDate
    context: SelectedDateActionContext
    id: number
    date: string
}

export type SelectedEndDateAction = {
    type: SelectedDateActionTypes.SelectedEndDate
    context: SelectedDateActionContext
    id: number
    date: string
}

export function selectedStartDateAction(trackId: number, date: string): SelectedStartDateAction {
    return {
        type: SelectedDateActionTypes.SelectedStartDate,
        context: SelectedDateActionContext.ForTrack,
        id: trackId,
        date: date
    }
}

export function selectedEndDateAction(trackId: number, date: string): SelectedEndDateAction {
    return {
        type: SelectedDateActionTypes.SelectedEndDate,
        context: SelectedDateActionContext.ForTrack,
        id: trackId,
        date: date
    }
}

export function selectedArtistStartDateAction(artistId: number, date: string): SelectedStartDateAction {
    return {
        type: SelectedDateActionTypes.SelectedStartDate,
        context: SelectedDateActionContext.ForArtist,
        id: artistId,
        date: date
    }
}

export function selectedArtistEndDateAction(artistId: number, date: string): SelectedEndDateAction {
    return {
        type: SelectedDateActionTypes.SelectedEndDate,
        context: SelectedDateActionContext.ForArtist,
        id: artistId,
        date: date
    }
}

export type SelectedDateAction = SelectedStartDateAction 
| SelectedEndDateAction 
| DidLoadPlotInfoAction 
| DidLoadArtistMetricAction