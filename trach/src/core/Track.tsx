import { Platform } from './Platform'

export type TrackUrl = {
    platform: Platform
    trackUrl: string    
}

export type Track = {
    id: number
    title: string
    coverUrl?: string
}

export type PlayUrl = {
    url: string
    platform: string
}

export type BestPlatform = {
    name: Platform,
    maxPosition: number
}

export type ArtistChartTrack = {
    id: string
    name: string
    coverUrl: string
    best: BestPlatform
    numberOfPlatforms: number
}

export type ArtistPlaylistTrack = {
    trackName: string
    coverUrl: string
    platformName: string
    numberOfPlaylists: number
}

export type SearchTrack = {
    trackId: string
    albumId: string
    coverUrl: string
    name: string
    artist: string
}

export type SearchArtist = {
    artistId: string
    coverUrl: string
    name: string
}
