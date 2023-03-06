import store from '../../../../app/store'
import { AppState } from '../../../../reducers/mainReducer'
import { HistoryRouter } from '../../../../core/Router'
import { AlbumGridProps } from '../../../albumgrid/AlbumGridComponent'

export function albumsInChartSelector(artistId: number): AlbumGridProps {
    const state: AppState = store.getState()
    const albums = state.albumsInCharts.byArtistId[artistId]

    if (albums === undefined || albums.length === 0) {
        return {
            header: 'Альбомы в чартах',
            albums: [],
        }
    }
    else {
        return {
            header: `Альбомы в чартах`,
            albums: albums.map(id => {
                const album = state.albums.byId[id]
                const subtitle = state.chartAlbumSubtitles.mainSubtitleByTrackId[id]
                const others = state.chartAlbumSubtitles.otherSubtitlesByTrackId[id]
                const year = state.releaseDate.byAlbumId[id]
                var otherTitle: string | undefined = undefined
                if (others.length > 0)
                    otherTitle = `еще в ${others.length} чартах`
                return {
                    title: album.title,
                    coverUrl: album.coverUrl ?? "",
                    subtitle: subtitle,
                    year: year,
                    other: otherTitle,
                    onClick: (router: HistoryRouter) => router.push(`/album/${id}`)
                }
            })
        }
    }
}
