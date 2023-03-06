import { SearchResponse } from './SearchActionCreator'

export enum SearchActionTypes {
    Search = "SearchActionTypes.Search"
}

export type FoundItem = {
    id: number
    title: string
    subtitle?: string
    coverUrl?: string
}

export type SearchAction = {
    type: SearchActionTypes.Search
    search: string
    tracks: FoundItem[]
    artists: FoundItem[]
    albums: FoundItem[]
}

export function searchItems(search: string, response: SearchResponse): SearchAction {
    return {
        type: SearchActionTypes.Search,
        search: search,
        tracks: response.tracks,
        artists: response.artists,
        albums: response.albums
    }
}

export function searchEmpty(search: string): SearchAction {
    return {
        type: SearchActionTypes.Search,
        search: search,
        tracks: [],
        artists: [],
        albums: []
    }
}
