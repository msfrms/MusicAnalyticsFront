import * as actions from "../../actions/artist/ArtistInfoActions"
import * as albumsInCharts from '../../actions/album/AlbumInChartsAction'

export type TrackSubtitleState = {
    mainSubtitleByTrackId: {
        [id: number]: string
    }
    otherSubtitlesByTrackId: {
        [id: number]: string[]
    }
}

export const initialState: TrackSubtitleState = {
    mainSubtitleByTrackId: {},
    otherSubtitlesByTrackId: {}
}

export function reducer(
    state = initialState,
    action: actions.ArtistInfoAction,
    isChart: boolean
): TrackSubtitleState {
    switch (action.type) {
        case actions.ArtistInfoActionTypes.DidLoadTracksInPlaylists: {
            if (action.isChart !== isChart) {
                return state
            }

            const newState = JSON.parse(JSON.stringify(state))

            for (const track of action.tracks) {
                newState.mainSubtitleByTrackId[track.id] = track.subtitle
                newState.otherSubtitlesByTrackId[track.id] = track.platforms
            }

            return newState
        }

        case albumsInCharts.AlbumChartsActionTypes.DidLoadAlbums: {
            const newState = JSON.parse(JSON.stringify(state))

            for (const album of action.albums) {
                newState.mainSubtitleByTrackId[album.id] = album.bestPlatform
                newState.otherSubtitlesByTrackId[album.id] = album.otherPlatforms
            }

            return newState
        }

        default:
            return state
    }
}