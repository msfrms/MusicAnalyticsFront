import * as actions from '../../actions/track/TrackInfoActions'
import * as albumInCharts from '../../actions/album/AlbumInChartsAction'
import { Track } from '../../core/Track'

export type AlbumsState = {
    albumIdByTrackId: {
        [trackId: number]: number
    }
    titleByAlbumId: {
        [id: number]: string
    }
    byId: {
        [albumId: number]: Track
    }
}

export const initialState: AlbumsState = {
    albumIdByTrackId: {},
    titleByAlbumId: {},
    byId: {}
}

export function reducer(state = initialState, action: actions.TrackInfoAction): AlbumsState {
    switch (action.type) {
        case actions.TrackInfoActionTypes.DidLoadTrackInfo:
            if (action.album !== undefined) {
                const newState = { ...state }

                newState.titleByAlbumId[action.album.id] = action.album.title
                newState.albumIdByTrackId[action.trackId] = action.album.id

                return newState
            }
            else
                return state

        case albumInCharts.AlbumChartsActionTypes.DidLoadAlbums: {
            const newState = { ...state }

            for (const album of action.albums) {
                newState.byId[album.id] = {
                    id: album.id,
                    title: album.title,
                    coverUrl: album.coverUrl
                }
            }

            return newState
        }
        default:
            return state
    }
}