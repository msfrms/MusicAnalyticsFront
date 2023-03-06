import { Track } from '../../core/Track'
import * as chartActions from '../../actions/chart/TrackActions'
import * as trackInfoActions from '../../actions/track/TrackInfoActions'
import * as tracksInCharts from '../../actions/artist/ArtistInfoActions'

export type TrackState = {
    byTrackId: {
        [trackId: number]: Track
    }
}

export const initialState: TrackState = {
    byTrackId: {}
}

export function reducer(state = initialState, action: chartActions.TracksAction): TrackState {

    switch (action.type) {

        case chartActions.TrackActionTypes.DidLoadTracks: {
            const newState: TrackState = { ...state }

            for (const track of action.tracks) {
                newState.byTrackId[track.id] = track
            }

            return newState
        }

        case trackInfoActions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState: TrackState = { ...state }

            newState.byTrackId[action.trackId] = {
                id: action.trackId,
                title: action.title,
                coverUrl: action.coverUrl
            }

            return newState
        }

        case tracksInCharts.ArtistInfoActionTypes.DidLoadTracksInPlaylists: {
            const newState: TrackState = { ...state }

            for (const track of action.tracks) {
                newState.byTrackId[track.id] = {
                    id: track.id,
                    title: track.title,
                    coverUrl: track.coverUrl
                }
            }

            return newState
        }

        default:
            return state

    }
}
