import { AlbumProps, TrackInfoProps } from '../../../trackinfo/TrackInfoComponent'
import store from '../../../../app/store'
import { AppState } from '../../../../reducers/mainReducer'
import * as trackInfo from '../../../../reducers/track/trackInfoReducer'
import moment from 'moment'
import { HistoryRouter } from '../../../../core/Router'
import { loadAlbumInfoActionCreator } from '../../../../actions/album/AlbumInfoActionCreators'
import { loadAlbumPlotInfoActionCreator } from '../../../../actions/album/AlbumPlotInfoActionCreators'
import { saveReportByExistTrackInPlaylistsToCsvFile } from '../../../../actions/ReportActionCreators'

export function artistSelector(trackId: number): TrackInfoProps {
    
    const state: AppState = store.getState()
    const track = state.tracks.byTrackId[trackId]
    const isLoaded = trackInfo.isLoaded(state.tracksInfo.byTrackId[trackId])

    if (isLoaded) {
        const artists = state.artists.byTrackId[trackId].map(id => state.artists.byArtistId[id])
        const genres = state.genres.byTrackId[trackId]
        const label = state.labels.byTrackId[trackId].join(", ")
        const links = state.playUrls.byTrackId[trackId]
        const albumId = state.albums.albumIdByTrackId[trackId]
        const titleOfAlbum = state.albums.titleByAlbumId[albumId]
        const releaseDateString: string | undefined = state.releaseDate.byAlbumId[albumId]
        
        var releaseDate: Date | undefined = undefined
        
        if (releaseDateString !== undefined && releaseDateString.length > 0)
            releaseDate = moment(releaseDateString, 'DD.MM.YYYY').toDate()
        const statsByArtist = state.statsByArtist

        var album: AlbumProps | undefined = undefined

        if (titleOfAlbum !== undefined)
            album = {
                title: titleOfAlbum,
                onClick: (router: HistoryRouter) => {
                    loadAlbumInfoActionCreator(trackId)
                    loadAlbumPlotInfoActionCreator(trackId)
                    router.push(`/album/${albumId}`)
                }
            }

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
            album: album,
            date: releaseDate,
            onCreatedReport: () => saveReportByExistTrackInPlaylistsToCsvFile(trackId),
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
