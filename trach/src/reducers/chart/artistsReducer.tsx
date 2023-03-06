import * as chartActions from '../../actions/chart/TrackActions'
import { Artist } from '../../actions/chart/TrackActions'
import * as trackInfoActions from '../../actions/track/TrackInfoActions'
import * as artistInfoActions from '../../actions/artist/ArtistInfoActions'

export type ArtistState = {
    byArtistId: {
        [artistId: number]: Artist
    }
    byTrackId: {
        [trackId: number]: number[]
    }
}

export const initialState: ArtistState = {
    byArtistId: {},
    byTrackId: {}
}

export function reducer(state = initialState, action: chartActions.TracksAction): ArtistState {
    switch (action.type) {
        case chartActions.TrackActionTypes.DidLoadTracks: {
            const newState: ArtistState = {...state}
            const artists: Artist[] = action.artists.flatMap(a => a.artists)
            
            for (const artist of artists) {
                newState.byArtistId[artist.id] = artist
            }
            
            for (const track of action.artists) {
                newState.byTrackId[track.trackId] = track.artists.map(a => a.id)
            }

            return newState
        }

        case trackInfoActions.TrackInfoActionTypes.DidLoadTrackInfo: {
            const newState = {...state}

            for (const artist of action.artists) {
                newState.byArtistId[artist.id] = artist
            }

            newState.byTrackId[action.trackId] = action.artists.map(a => a.id)

            return newState
        }

        case artistInfoActions.ArtistInfoActionTypes.DidLoadArtistInfo: {
            const newState = {...state}

            newState.byArtistId[action.artist.id] = {
                id: action.artist.id,
                name: action.artist.name,
                coverUrl: action.artist.coverUrl
            }

            return newState
        }

        default:
            return state
    }
}
