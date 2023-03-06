import store from '../../../../app/store'
import { TracksGridProps, TrackGridProps } from '../../../tracksgrid/TracksGridComponent'
import { AppState } from '../../../../reducers/mainReducer'
import { HistoryRouter } from '../../../../core/Router'

export function tracksInPlaylistsSelector(artistId: number): TracksGridProps {
    const state: AppState = store.getState()
    const tracks = state.tracksInPlaylists.byArtistId[artistId]

    if (tracks === undefined || tracks.length === 0) {
        return {
            header: 'Треки в новинках и плейлистах',
            tracks: [],
        }
    }
    else {
        return {
            header: `Треки в новинках и плейлистах`,
            tracks: tracks.map(trackId => {
                const track = state.tracks.byTrackId[trackId]
                const subtitle = state.playlistTrackSubtitles.mainSubtitleByTrackId[trackId]
                const otherPlatformsCount = state.playlistTrackSubtitles
                    .otherSubtitlesByTrackId[trackId]
                    .length
                const props: TrackGridProps = {
                    coverUrl: track.coverUrl ?? "",
                    title: track.title,
                    subtitle: subtitle,
                    info: otherPlatformsCount > 0 ? `еще в ${otherPlatformsCount} плейлистах` : undefined,
                    onClick: (router: HistoryRouter) => router.push(`/track/${track.id}`)
                }

                return props
            })
        }
    }
}
