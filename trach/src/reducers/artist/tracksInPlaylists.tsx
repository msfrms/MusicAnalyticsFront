import * as actions from "../../actions/artist/ArtistInfoActions"
import * as albumInCharts from "../../actions/album/AlbumInChartsAction"

export type TracksInPlaylistsState = {
    byArtistId: {
        [id: number]: number[]
    }
}

export const initialState: TracksInPlaylistsState = {
    byArtistId: {}
}

export function reducer(
    state = initialState,
    action: actions.ArtistInfoAction,
    isChart: boolean,
    isTrack: boolean
): TracksInPlaylistsState {

    switch (action.type) {

        case actions.ArtistInfoActionTypes.DidLoadTracksInPlaylists: {
            if (action.isChart !== isChart || isTrack !== true)
                return state

            const newState = JSON.parse(JSON.stringify(state))

            newState.byArtistId[action.artistId] = action.tracks.map(track => track.id)

            return newState
        }

        case albumInCharts.AlbumChartsActionTypes.DidLoadAlbums: {
            if (isTrack === true)
                return state

            const newState = JSON.parse(JSON.stringify(state))

            newState.byArtistId[action.artistId] = action.albums.map(a => a.id)

            return newState
        }

        default:
            return state
    }
}