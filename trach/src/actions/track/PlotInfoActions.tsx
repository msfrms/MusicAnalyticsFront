import { Plot } from "../../core/Plot";
import { DidLoadArtistMetricAction } from "../artist/ArtistMetricActions";
import { PlotResponse } from "./PlotInfoActionCreators";

export enum PlotInfoActionTypes {
    DidLoadPlotInfo = "PlotInfoActionTypes.DidLoadPlotInfo",
}

export type DidLoadPlotInfoAction = {
    type: PlotInfoActionTypes.DidLoadPlotInfo
    trackId: number
    plot: Plot
}

export function didLoadPlotInfoAction(trackId: number, plot: PlotResponse): DidLoadPlotInfoAction {
    return {
        type: PlotInfoActionTypes.DidLoadPlotInfo,
        trackId: trackId,
        plot: plot
    }
}

export type PlotInfoAction = DidLoadPlotInfoAction | DidLoadArtistMetricAction