import { Album } from "../../core/Album"
import { PlayUrl } from "../../core/Track"
import { AlbumChartsAction } from "../album/AlbumInChartsAction"
import { AlbumInfoResponse } from "../album/AlbumInfoActionCreators"
import { TrackInfoResponse } from "./TrackActionCreators"

export enum TrackInfoActionTypes {
    DidLoadTrackInfo = "TrackInfoActionTypes.DidLoadTrackInfo",
    InProgressTrackInfo = "TrackInfoActionTypes.InProgressTrackInfo",
    FailedTrackInfo = "TrackInfoActionTypes.FailedLoadedTracks"
}

export type ArtistWithStats = {
    id: number
    name: string
    tracksInChart: number
    tracksInPlaylists: number
}

export type DidLoadTrackInfoAction = {
    type: TrackInfoActionTypes.DidLoadTrackInfo
    trackId: number
    title: string
    coverUrl?: string
    album?: Album
    artists: ArtistWithStats[]
    genres: string[]
    labels: string[]
    playUrls: PlayUrl[]
}

export type InProgressTrackInfoAction = {
    type: TrackInfoActionTypes.InProgressTrackInfo
    trackId: number
}

export type FailedTrackInfoAction = {
    type: TrackInfoActionTypes.FailedTrackInfo
    trackId: number
    text: string
}

export function inProgressTrackInfoAction(trackId: number): InProgressTrackInfoAction {
    return {
        type: TrackInfoActionTypes.InProgressTrackInfo,
        trackId: trackId
    }
}

export function didLoadTrackInfoAction(response: TrackInfoResponse): DidLoadTrackInfoAction {
    return {
        type: TrackInfoActionTypes.DidLoadTrackInfo,
        trackId: response.id,
        title: response.title,
        coverUrl: response.coverUrl,
        album: response.album,
        artists: response.artists,
        genres: response.genres,
        labels: response.labels,
        playUrls: response.playUrls
    }
}

export function didLoadAlbumInfoAction(response: AlbumInfoResponse): DidLoadTrackInfoAction {
    var genres: string[] = []
    if (response.genre !== undefined)
        genres.push(response.genre)

    var labels: string[] = []
    if (response.label !== undefined)
        labels.push(response.label)

    return {
        type: TrackInfoActionTypes.DidLoadTrackInfo,
        trackId: response.id,
        title: response.title,
        coverUrl: response.coverUrl,
        album: {
            id: response.id,
            title: "",
            releaseDate: response.releaseDate
        },
        artists: response.artists,
        genres: genres,
        labels: labels,
        playUrls: response.links
    }
}

export function failedTrackInfoAction(trackId: number, text: string): FailedTrackInfoAction {
    return {
        type: TrackInfoActionTypes.FailedTrackInfo,
        trackId: trackId,
        text: text
    }
}

export type TrackInfoAction = DidLoadTrackInfoAction
    | InProgressTrackInfoAction
    | FailedTrackInfoAction
    | AlbumChartsAction