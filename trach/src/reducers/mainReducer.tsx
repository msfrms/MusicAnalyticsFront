import * as artists from './chart/artistsReducer'
import * as genres from './track/genresReducer'
import * as labels from './chart/labelsReducer'
import * as playlists from './playlistsReducer'
import * as tracks from './chart/tracksReducer'
import * as trackTypes from './chart/typeTrackReducer'
import * as positions from './chart/positionReducer'
import * as statsByTrack from './chart/statsByTrackReducer'
import * as statsByArtist from './track/statsByArtistReducer'
import * as platforms from './chart/platformReducer'
import * as selectFilter from './selectFilterReducer'
import * as chart from './chart/chartReducer'
import * as search from './searchReducer'
import * as albums from './track/albumsReducer'
import * as releaseDate from './album/releaseDateReducer'
import * as tracksInfo from './track/trackInfoReducer'
import * as playUrls from './track/playUrlsReducer'
import * as selectedDate from './track/plotSelectDateReducer'
import * as plotLines from './track/plotDateLinesReducer'
import * as legend from './track/legendReducer'
import * as artistLinks from './artist/artistLinksReducer'
import * as trackSubtitles from './artist/trackSubtitleReducer'
import * as tracksInPlaylists from './artist/tracksInPlaylists'
import * as achievements from './artist/achievementArtistReducer'
import * as artistMetrics from './artist/artistMetricsReducer'
import * as artistSimilar from './artist/similarArtistsReducer'
import { PlaylistType } from '../core/MusicSection'
import * as auth from './auth/authReducer'

import { routerReducer, RouterState } from 'react-router-redux'

export type AppState = {
    auth: auth.AuthState
    tracks: tracks.TrackState
    trackTypes: trackTypes.TypeTrackState
    artists: artists.ArtistState
    artistMetrics: artistMetrics.ArtistMetricsState
    artistLinks: artistLinks.ArtistLinkState
    similarArtists: artistSimilar.SimilarArtistState
    labels: labels.LabelState
    positions: positions.PositionState
    statsByTrack: statsByTrack.StatsState
    statsByArtist: statsByArtist.StatsByArtistState
    platforms: platforms.PlatformState
    albums: albums.AlbumsState
    releaseDate: releaseDate.ReleaseDateState
    genres: genres.GenreState
    tracksInfo: tracksInfo.TracksInfoState
    playUrls: playUrls.PlayUrlsState
    selectedDateByTrack: selectedDate.SelectedDateByTrackState
    plotDateLines: plotLines.PlotDateLinesState
    legend: legend.LegendState
    chartTrackSubtitles: trackSubtitles.TrackSubtitleState
    playlistTrackSubtitles: trackSubtitles.TrackSubtitleState
    chartAlbumSubtitles: trackSubtitles.TrackSubtitleState
    tracksInCharts: tracksInPlaylists.TracksInPlaylistsState
    tracksInPlaylists: tracksInPlaylists.TracksInPlaylistsState
    albumsInCharts: tracksInPlaylists.TracksInPlaylistsState
    selectFilter: selectFilter.SelectFilterState
    achievements: achievements.AchievementState
    chart: chart.ChartState
    newTracks: chart.ChartState
    playlists: playlists.PlaylistState
    search: search.SearchState
    routing: RouterState
}

const initialState: AppState = {
    auth: auth.initialState,
    tracks: tracks.initialState,
    trackTypes: trackTypes.initialState,
    artists: artists.initialState,
    artistLinks: artistLinks.initialState,
    artistMetrics: artistMetrics.initialState,
    similarArtists: artistSimilar.initialState,
    labels: labels.initialState,
    positions: positions.initialState,
    statsByTrack: statsByTrack.initialState,
    statsByArtist: statsByArtist.initialState,
    platforms: platforms.initialState,
    albums: albums.initialState,
    releaseDate: releaseDate.initialState,
    genres: genres.initialState,
    tracksInfo: tracksInfo.initialState,
    playUrls: playUrls.initialState,
    selectedDateByTrack: selectedDate.initialState,
    plotDateLines: plotLines.initialState,
    legend: legend.initialState,
    chartTrackSubtitles: trackSubtitles.initialState,
    playlistTrackSubtitles: trackSubtitles.initialState,
    chartAlbumSubtitles: trackSubtitles.initialState,
    tracksInCharts: tracksInPlaylists.initialState,
    tracksInPlaylists: tracksInPlaylists.initialState,
    albumsInCharts: tracksInPlaylists.initialState,
    selectFilter: selectFilter.initialState,
    achievements: achievements.initialState,
    chart: chart.initialState,
    newTracks: chart.initialState,
    playlists: playlists.initialState,
    search: search.initialState,
    routing: {
        location: null
    }
}

export function reducer(state: AppState = initialState, action: any): AppState {
    return {
       auth: auth.reducer(state.auth, action),
       routing: routerReducer(state.routing, action),
       tracks: tracks.reducer(state.tracks, action),
       trackTypes: trackTypes.reducer(state.trackTypes, action),
       artists: artists.reducer(state.artists, action),
       artistLinks: artistLinks.reducer(state.artistLinks, action),
       artistMetrics: artistMetrics.reducer(state.artistMetrics, action),
       similarArtists: artistSimilar.reducer(state.similarArtists, action),
       labels: labels.reducer(state.labels, action),
       positions: positions.reducer(state.positions, action),
       statsByTrack: statsByTrack.reducer(state.statsByTrack, action),
       statsByArtist: statsByArtist.reducer(state.statsByArtist, action),
       platforms: platforms.reducer(state.platforms, action),
       albums: albums.reducer(state.albums, action),
       releaseDate: releaseDate.reducer(state.releaseDate, action),
       genres: genres.reducer(state.genres, action),
       tracksInfo: tracksInfo.reducer(state.tracksInfo, action),
       playUrls: playUrls.reducer(state.playUrls, action),
       selectedDateByTrack: selectedDate.reducer(state.selectedDateByTrack, action),
       plotDateLines: plotLines.reducer(state.plotDateLines, action),
       legend: legend.reducer(state.legend, action),
       chartTrackSubtitles: trackSubtitles.reducer(state.chartTrackSubtitles, action, true),
       playlistTrackSubtitles: trackSubtitles.reducer(state.playlistTrackSubtitles, action, false),
       chartAlbumSubtitles: trackSubtitles.reducer(state.chartAlbumSubtitles, action, true),
       tracksInCharts: tracksInPlaylists.reducer(state.tracksInCharts, action, true, true),
       tracksInPlaylists: tracksInPlaylists.reducer(state.tracksInPlaylists, action, false, true),
       albumsInCharts: tracksInPlaylists.reducer(state.albumsInCharts, action, true, false),
       selectFilter: selectFilter.reducer(state.selectFilter, action),
       achievements: achievements.reducer(state.achievements, action),
       chart: chart.reducer(state.chart, action, PlaylistType.Chart),
       newTracks: chart.reducer(state.newTracks, action, PlaylistType.New),
       playlists: playlists.reducer(state.playlists, action),
       search: search.reducer(state.search, action),
    }
}
