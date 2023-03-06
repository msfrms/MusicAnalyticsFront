import { TrackPageProps } from '../TrackPageComponent'
import { 
    playlistSelector, 
    playlistBreadcrumbsSelector, 
    plotBreadcrumbsSelector 
} from './PlaylistSelector'
import { artistSelector } from './ArtistSelector'
import { menuSelector } from '../../../menu/utils/MenuSelector'
import * as main from '../../../../reducers/mainReducer'
import { loadTracksInfoActionCreator } from '../../../../actions/track/TrackActionCreators'
import { loadPlotInfoActionCreator } from '../../../../actions/track/PlotInfoActionCreators'
import { plotSelector } from './PlotSelector'
import { trackPlaylistActionCreators } from '../../../../actions/track/TrackPlaylistActionCreators'
import { loadAlbumInfoActionCreator } from '../../../../actions/album/AlbumInfoActionCreators'
import { artistAlbumSelector } from './ArtistAlbumSelector'
import { loadAlbumPlotInfoActionCreator } from '../../../../actions/album/AlbumPlotInfoActionCreators'
import { checkIsAuthorized } from '../../../../actions/auth/AuthActionCreators'

export function trackPageSelector(_: (action: any) => void) {
    return (_: main.AppState, nextOwnProps: any) => {    

        const trackId = nextOwnProps.match.params.id
        const url: string = nextOwnProps.match.url

        if (url.indexOf("track") >= 0) {
            const props: TrackPageProps = {
                didMount: () => {
                    loadTracksInfoActionCreator(trackId)
                    loadPlotInfoActionCreator(trackId)
                    trackPlaylistActionCreators(trackId)
                    checkIsAuthorized()
                },
                trackId: trackId,
                menu: menuSelector(),
                artist: artistSelector(trackId),
                playlist: playlistSelector(trackId),
                trackPositionPlot: plotSelector(trackId),
                filterByDateInPlaylist: playlistBreadcrumbsSelector(trackId),
                filterByDateInPlot: plotBreadcrumbsSelector(trackId, true)
            }
            return props
        }
        else if (url.indexOf("album") >= 0) {
            const props: TrackPageProps = {
                didMount: () => {
                    loadAlbumInfoActionCreator(trackId)
                    loadAlbumPlotInfoActionCreator(trackId)
                    checkIsAuthorized()
                },
                menu: menuSelector(),
                trackId: trackId,
                artist: artistAlbumSelector(trackId),                
                trackPositionPlot: plotSelector(trackId),                
                filterByDateInPlot: plotBreadcrumbsSelector(trackId, false)
            }
            return props 
        }
    }
}
