import { TrackInfoProps } from '../../../trackinfo/TrackInfoComponent'
import store from '../../../../app/store'
import { AppState } from '../../../../reducers/mainReducer'
import * as trackInfo from '../../../../reducers/track/trackInfoReducer'
import moment from 'moment'
import { HistoryRouter } from '../../../../core/Router'

export function artistAlbumSelector(albumId: number): TrackInfoProps {

    const state: AppState = store.getState()
    const track = state.tracks.byTrackId[albumId]
    const isLoaded = trackInfo.isLoaded(state.tracksInfo.byTrackId[albumId])

    if (isLoaded) {
        const artists = state.artists.byTrackId[albumId].map(id => state.artists.byArtistId[id])
        const genres = state.genres.byTrackId[albumId]
        const label = state.labels.byTrackId[albumId].join(", ")
        const links = state.playUrls.byTrackId[albumId]
        const releaseDateString: string | undefined = state.releaseDate.byAlbumId[albumId]
        var releaseDate: Date | undefined = undefined
        if (releaseDateString !== undefined && releaseDateString.length > 0)
            releaseDate = moment(releaseDateString, 'DD.MM.YYYY').toDate()
        const statsByArtist = state.statsByArtist
        return {
            coverUrl: track.coverUrl ?? "",
            trackName: track.title,
            artists: artists.map(a => {
                return {
                    name: a.name,
                    onClick: (router: HistoryRouter) => router.push(`/artist/${a.id}`),
                    numberOfTracksInChart: statsByArtist.byArtistId[a.id].numberOfTrackInChart,
                    numberOfTracksInPlaylists: statsByArtist.byArtistId[a.id].numberOfTracksInPlaylists
                }
            }),
            genres: genres,
            label: label,
            album: undefined,
            date: releaseDate,
            links: links.map(link => {
                return {
                    name: link.platform,
                    onClick: () => window.open(link.url)
                }
            })
        }
    }
    else
        return {
            coverUrl: "",
            trackName: "",
            artists: [],
            genres: [],
            label: "",
            onCreatedReport: console.log,
            links: []
        }
}
