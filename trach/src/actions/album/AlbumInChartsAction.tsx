import { AlbumsResponse } from "./AlbumInChartsActionCreators"

export enum AlbumChartsActionTypes {
    DidLoadAlbums = "AlbumChartsActionTypes.DidLoadAlbums"
}

export type AlbumChart = {
    id: number,
    title: string,
    coverUrl?: string,
    bestPlatform: string,
    year?: number,
    otherPlatforms: string[]
}

export type AlbumChartsAction = {
    type: AlbumChartsActionTypes.DidLoadAlbums
    artistId: number,
    albums: AlbumChart[]
}

export function didLoadAlbumsChartAction(artistId: number, response: AlbumsResponse[]): AlbumChartsAction {
    return {
        type: AlbumChartsActionTypes.DidLoadAlbums,
        artistId: artistId,
        albums: response
    }
}
