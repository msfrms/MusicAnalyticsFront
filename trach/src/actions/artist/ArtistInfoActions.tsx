import { AlbumChartsAction } from "../album/AlbumInChartsAction"
import { AchievementResponse } from "./LoadAchievementsActionCreator"
import { ArtistResponse } from "./LoadArtistInfoActionCreators"
import { TrackResponse } from "./LoadTracksInChartsActionCreator"

export enum ArtistInfoActionTypes {
    DidLoadArtistInfo = "ArtistInfoActionTypes.DidLoadArtistInfo",
    DidLoadTracksInPlaylists = "ArtistInfoActionTypes.DidLoadTracksInPlaylists",
    DidLoadAchievements = "ArtistInfoActionTypes.DidLoadAchievements"
}

export type Achievement = {
    title: string
    rating?: {
        value: number
        max: number
    }
    coverUrl?: string
}

export type Link = {
    title: string
    url: string
}

export type Artist = {
    id: number
    name: string
    coverUrl?: string
    links: Link[]
}

export type Track = {
    id: number
    title: string
    subtitle: string
    coverUrl?: string
    platforms: string[]
}

export type DidLoadArtistInfoAction = {
    type: ArtistInfoActionTypes.DidLoadArtistInfo
    artist: Artist
}

export function didLoadArtistInfoAction(response: ArtistResponse): DidLoadArtistInfoAction {
    return {
        type: ArtistInfoActionTypes.DidLoadArtistInfo,
        artist: response
    }
}

export type DidLoadTracksInPlaylistsAction = {
    type: ArtistInfoActionTypes.DidLoadTracksInPlaylists
    artistId: number
    tracks: Track[]
    isChart: boolean
}

export function didLoadTracksInPlaylistsAction(
    artistId: number,
    response: TrackResponse[],
    isChart: boolean
): DidLoadTracksInPlaylistsAction {
    return {
        type: ArtistInfoActionTypes.DidLoadTracksInPlaylists,
        artistId: artistId,
        tracks: response,
        isChart: isChart
    }
}

export type DidLoadAchievementAction = {
    type: ArtistInfoActionTypes.DidLoadAchievements
    artistId: number
    achievements: Achievement[]
}

export function didLoadAchievementAction(
    artistId: number,
    response: AchievementResponse[]
): DidLoadAchievementAction {
    return {
        type: ArtistInfoActionTypes.DidLoadAchievements,
        artistId: artistId,
        achievements: response
    }
}

export type ArtistInfoAction = DidLoadArtistInfoAction
    | DidLoadTracksInPlaylistsAction
    | DidLoadAchievementAction
    | AlbumChartsAction