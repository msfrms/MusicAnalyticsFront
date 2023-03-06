import { Playlist } from '../../core/Playlist'

export enum PlaylistActionTypes {
    StartLoadPlaylists = "PlaylistActionTypes.StartLoadPlaylists",
    ErrorLoadPlaylists = "PlaylistActionTypes.ErrorLoadPlaylists",
    FinishLoadPlaylists = "PlaylistActionTypes.FinishLoadPlaylists",
    ChangeDate = "PlaylistActionTypes.ChangeDate"
}

export enum PlaylistDateFilterTypes {
    All = "PlaylistDateFilter.All",
    ForDate = "PlaylistDateFilter.ForDate"
}

export type PlaylistDateFilterAll = {
    type: PlaylistDateFilterTypes.All
}

export type PlaylistDateFilterForDate = {
    type: PlaylistDateFilterTypes.ForDate
    date: string
}

export type StartLoadPlaylistsAction = {
    type: PlaylistActionTypes.StartLoadPlaylists
    dateFilter: PlaylistDateFilterAll | PlaylistDateFilterForDate
    trackId: number
}

export type ErrorLoadPlaylistsAction = {
    type: PlaylistActionTypes.ErrorLoadPlaylists
    dateFilter: PlaylistDateFilterAll | PlaylistDateFilterForDate
    trackId: number
    error: string
}

export type FinishLoadPlaylistsAction = {
    type: PlaylistActionTypes.FinishLoadPlaylists
    dateFilter: PlaylistDateFilterAll | PlaylistDateFilterForDate
    trackId: number
    playlists: Playlist[]
}

export function finishLoadPlaylistsAction(
    trackId: number,
    date: string | undefined,
    playlists: Playlist[]
): FinishLoadPlaylistsAction {
    const filter: PlaylistDateFilterAll | PlaylistDateFilterForDate = date === undefined
        ? {type: PlaylistDateFilterTypes.All}
        : {type: PlaylistDateFilterTypes.ForDate, date: date}
    return {
        type: PlaylistActionTypes.FinishLoadPlaylists,
        dateFilter: filter,
        trackId: trackId,
        playlists: playlists
    }
}

export function errorLoadPlaylistsAction(
    trackId: number,
    date: string | undefined,
    error: string = "Нет данных, мы работаем над исправлением этой проблемы"
): ErrorLoadPlaylistsAction {
    const filter: PlaylistDateFilterAll | PlaylistDateFilterForDate = date === undefined
        ? {type: PlaylistDateFilterTypes.All}
        : {type: PlaylistDateFilterTypes.ForDate, date: date}
    return {
        type: PlaylistActionTypes.ErrorLoadPlaylists,
        dateFilter: filter,
        trackId: trackId,
        error: error
    }
}

export function startLoadPlaylistsAction(
    trackId: number,
    date: string | undefined,
): StartLoadPlaylistsAction {
    const filter: PlaylistDateFilterAll | PlaylistDateFilterForDate = date === undefined
        ? {type: PlaylistDateFilterTypes.All}
        : {type: PlaylistDateFilterTypes.ForDate, date: date}
    return {
        type: PlaylistActionTypes.StartLoadPlaylists,
        dateFilter: filter,
        trackId: trackId
    }
}

export type PlaylistAction = StartLoadPlaylistsAction | ErrorLoadPlaylistsAction | FinishLoadPlaylistsAction     
