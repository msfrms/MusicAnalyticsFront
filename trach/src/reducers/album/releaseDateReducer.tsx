import * as actions from '../../actions/track/TrackInfoActions'
import * as albumsInCharts from '../../actions/album/AlbumInChartsAction'

export type ReleaseDateState = {
    byAlbumId: {
        [id: number]: string
    }
}

export const initialState: ReleaseDateState = {
    byAlbumId: {}
}

export function reducer(state = initialState, action: actions.TrackInfoAction): ReleaseDateState {
    switch (action.type) {
        case actions.TrackInfoActionTypes.DidLoadTrackInfo:
            if (action.album !== undefined) {
                const newState = { ...state }

                if (action.album.releaseDate !== undefined)
                    newState.byAlbumId[action.album.id] = action.album.releaseDate

                return newState
            }
            else
                return state

        case albumsInCharts.AlbumChartsActionTypes.DidLoadAlbums: {
            const newState = { ...state }

            for (const album of action.albums) {
                if (album.year !== undefined)
                    newState.byAlbumId[album.id] = `${album.year}`
            }

            return newState
        }

        default:
            return state
    }
}