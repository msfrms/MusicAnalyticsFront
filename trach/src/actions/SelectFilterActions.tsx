import { PlaylistType } from '../core/MusicSection'
import { MusicCategory } from '../core/MusicCategory'
import { PlaylistDateFilterTypes } from './track/PlaylistActions'

export enum SelectFilterActionTypes {
    Platform = "SelectFilterActionTypes.Platform",
    PlaylistType = "SelectFilterActionTypes.SelectFilterActionTypes.PlaylistType",
    MusicCategory = "SelectFilterActionTypes.MusicCategory",
    Date = "SelectFilterActionTypes.Date",
    PlaylistCategory = "SelectFilterActionTypes.PlaylistCategory",
    PlotFilter = "SelectFilterActionTypes.PlotFilter",
}

export type SelectPlatformAction = {
    type: SelectFilterActionTypes.Platform
    platform: string    
}

export type SelectPlaylistTypeAction = {
    type: SelectFilterActionTypes.PlaylistType
    playlistType: PlaylistType
}

export type SelectMusicCategoryAction = {
    type: SelectFilterActionTypes.MusicCategory
    category: MusicCategory
}

export type SelectDateAction = {
    type: SelectFilterActionTypes.Date
    date: string
}

export type SelectPlaylistCategoryAction = {
    type: SelectFilterActionTypes.PlaylistCategory
    trackId: number
    category: PlaylistDateFilterTypes
    date?: string
}

export function selectPlaylistTypeAction(playlistType: PlaylistType): SelectPlaylistTypeAction {
    return {
        type: SelectFilterActionTypes.PlaylistType,
        playlistType: playlistType
    }
}

export function selectPlaylistCategory(
    trackId: number,
    date: string | undefined
): SelectPlaylistCategoryAction {
    return {
        type: SelectFilterActionTypes.PlaylistCategory,
        trackId: trackId,
        category: date !== undefined ? PlaylistDateFilterTypes.ForDate : PlaylistDateFilterTypes.All,
        date: date
    }
}

export type SelectFilterPlotAction = {
    type: SelectFilterActionTypes.PlotFilter
    trackId: number
    section: PlaylistType
    startDate?: string
    endDate?: string
}

export function selectFilterPlot(
    trackId: number, 
    section: PlaylistType, 
    startDate?: string, 
    endDate?: string
): SelectFilterPlotAction {
    return {
        type: SelectFilterActionTypes.PlotFilter,
        trackId: trackId,
        section: section,
        startDate: startDate,
        endDate: endDate
    }
}

export type SelectFilterAction = SelectDateAction
    | SelectMusicCategoryAction
    | SelectPlaylistTypeAction
    | SelectPlatformAction
    | SelectPlaylistCategoryAction
    | SelectFilterPlotAction
