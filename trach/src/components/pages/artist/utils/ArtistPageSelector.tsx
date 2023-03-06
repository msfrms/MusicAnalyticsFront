import { ArtistPageProps } from '../ArtistPageComponent'
import { tracksInChartSelector } from './TracksInChartSelector'
import { tracksInPlaylistsSelector } from './TracksInPlaylistsSelector'
import { achievementsSelector } from './AchievementsSelector'
import { artistInfoSelector } from './ArtistInfoSelector'
import { menuSelector } from '../../../menu/utils/MenuSelector'
import * as main from '../../../../reducers/mainReducer'
import { loadArtistInfoActionCreator } from '../../../../actions/artist/LoadArtistInfoActionCreators'
import {
    loadTracksInChartsActionCreator,
    loadTracksInPlaylistsActionCreator
} from '../../../../actions/artist/LoadTracksInChartsActionCreator'
import { loadAchievementsActionCreator } from '../../../../actions/artist/LoadAchievementsActionCreator'
import { albumsInChartSelector } from './AlbumInChartSelector'
import { loadAlbumInChartsActionCreator } from '../../../../actions/album/AlbumInChartsActionCreators'
import { artistStatsPlotSelector } from './ArtistStatsPlotSelector'
import { artistStatsBreadcrumbsSelector } from './ArtistStatsBreadcrumbsSelector'
import { loadArtistMerticsActionCreator } from '../../../../actions/artist/LoadArtistMerticsActionCreator'
import { artistSimilarSelector } from './ArtistSimilarSelector'
import { loadSimilarArtistsActionCreator } from '../../../../actions/artist/LoadSimilarArtistsActionCreator'

export function artistPageSelector(dispatch: (action: any) => void) {
    return (_: main.AppState, nextOwnProps: any) => {
        const artistId = nextOwnProps.match.params.id
        const props: ArtistPageProps = {
            menu: menuSelector(),
            info: artistInfoSelector(artistId),
            tracksInChart: tracksInChartSelector(artistId),
            tracksInPlaylists: tracksInPlaylistsSelector(artistId),
            albumsInChart: albumsInChartSelector(artistId),
            achievement: achievementsSelector(artistId),
            filterByDateInPlot: artistStatsBreadcrumbsSelector(artistId),
            plotStats: artistStatsPlotSelector(artistId),
            similarArtists: artistSimilarSelector(artistId),
            didMount: () => {
                loadSimilarArtistsActionCreator(artistId)
                loadArtistMerticsActionCreator(artistId)
                loadArtistInfoActionCreator(artistId)
                loadTracksInChartsActionCreator(artistId)
                loadTracksInPlaylistsActionCreator(artistId)
                loadAchievementsActionCreator(artistId)
                loadAlbumInChartsActionCreator(artistId)
            }
        }
        return props
    }
}
