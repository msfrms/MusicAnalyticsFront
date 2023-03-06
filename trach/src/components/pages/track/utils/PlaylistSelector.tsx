import { PlaylistDateFilterTypes } from '../../../../actions/track/PlaylistActions'
import { GeneralLoadDataProps, GeneralLoadDataTypes } from '../../../core/GeneralLoadDataComponent'
import { PlaylistProps } from '../../../playlist/PlaylistComponent'
import {
    BreadcrumbsActiveState,
    BreadcrumbsItemType,
    BreadcrumbsProps
} from '../../../breadcrumbs/BreadcrumbsComponent'
import store from '../../../../app/store'

import moment from 'moment'
import { AppState } from '../../../../reducers/mainReducer'
import { selectedEndDateAction, selectedStartDateAction } from '../../../../actions/track/PlotSelectDateActions'
import { loadPlotInfoActionCreator } from '../../../../actions/track/PlotInfoActionCreators'
import { PlaylistType } from '../../../../core/MusicSection'
import { selectPlaylistCategory, selectPlaylistTypeAction } from '../../../../actions/SelectFilterActions'
import { PlaylistState } from '../../../../reducers/playlistsReducer'
import { trackPlaylistActionCreators } from '../../../../actions/track/TrackPlaylistActionCreators'
import { loadAlbumPlotInfoActionCreator } from '../../../../actions/album/AlbumPlotInfoActionCreators'
import { HistoryRouter } from '../../../../core/Router'
import { saveReportByTrackOrAlbumToCsvFile } from '../../../../actions/ReportActionCreators'
import { maxDateInDatabase } from '../../../../core/Constants'

const DateFormat = require('dateformat')

function playlistFilterTypes(trackId: number): PlaylistDateFilterTypes {
    const state = store.getState()
    const playlistState = state.selectFilter.playlist[trackId]
    return playlistState === undefined
        ? PlaylistDateFilterTypes.All
        : playlistState.type
}

export function playlistBreadcrumbsSelector(trackId: number) {

    const nextState: AppState = store.getState()
    const dispatch = store.dispatch

    const playlistDate = (() => {
        const dateState = nextState.selectFilter.playlist[trackId]
        const defaultDate: Date = maxDateInDatabase()
        if (dateState !== undefined) {
            return dateState.date !== undefined
                ? moment(dateState.date, 'DD.MM.YYYY').toDate()
                : defaultDate
        }
        else {
            return defaultDate
        }
    })()

    const filterByDateInPlaylistActive: BreadcrumbsActiveState = (() => {
        const playlistType = playlistFilterTypes(trackId)
        switch (playlistType) {

            case PlaylistDateFilterTypes.All:
                return BreadcrumbsActiveState.Left

            case PlaylistDateFilterTypes.ForDate:
                return BreadcrumbsActiveState.Right

            default:
                return BreadcrumbsActiveState.Left
        }
    })()

    const props: BreadcrumbsProps = {
        active: filterByDateInPlaylistActive,
        info: "Данные по плейлистам за некоторые дни могут отсутствовать, мы работаем над исправлением этой проблемы",
        leftTitle: {
            title: 'Плейлисты за все время',
            onSelected: () => {
                dispatch(selectPlaylistCategory(trackId, undefined))
                trackPlaylistActionCreators(trackId)
            }
        },
        rightTitle: {
            onSelected: () => {
                const dateString = DateFormat(playlistDate, "dd.mm.yyyy")
                dispatch(selectPlaylistCategory(trackId, dateString))
                trackPlaylistActionCreators(trackId)
            },
            item: {
                type: BreadcrumbsItemType.SingleDate,
                title: 'Плейлисты за',
                onSelected: (date: Date) => {
                    const dateString = DateFormat(date, "dd.mm.yyyy")
                    dispatch(selectPlaylistCategory(trackId, dateString))
                    trackPlaylistActionCreators(trackId)
                },
                initialDate: playlistDate
            }
        }
    }
    return props
}

export function plotBreadcrumbsSelector(trackId: number, isTrack: boolean) {

    const state: AppState = store.getState()
    const dispatch = store.dispatch
    const selectedDateByTrack = state.selectedDateByTrack.byTrackId[trackId]

    var startDate = maxDateInDatabase()
    if (selectedDateByTrack?.byChart.startDate !== undefined)
        startDate = moment(selectedDateByTrack.byChart.startDate, 'DD.MM.YYYY').toDate()

    var endDate = maxDateInDatabase()
    if (selectedDateByTrack?.byChart.endDate !== undefined)
        endDate = moment(selectedDateByTrack.byChart.endDate, 'DD.MM.YYYY').toDate()

    const active: BreadcrumbsActiveState = (() => {
        switch (state.selectFilter.playlistType) {

            case PlaylistType.Chart:
                return BreadcrumbsActiveState.Left

            case PlaylistType.New:
                return BreadcrumbsActiveState.Right
        }
    })()

    const props: BreadcrumbsProps = {
        active: active,
        info: "Данные по треку за некоторые дни по некоторым чартам могут отсутствовать, мы работаем над исправлением этой проблемы",
        leftTitle: {
            title: 'Чарты',
            onSelected: () => {
                dispatch(selectPlaylistTypeAction(PlaylistType.Chart))
                if (isTrack)
                    loadPlotInfoActionCreator(trackId)
                else
                    loadAlbumPlotInfoActionCreator(trackId)
            }
        },
        onClickDownload: (router: HistoryRouter) => {
            // TODO: временно отключил выгрузку по логину
            saveReportByTrackOrAlbumToCsvFile(trackId)    
            // if (state.auth.authorized.email === null) {
            //     if (isTrack)
            //         router.push(`/track/${trackId}/report`)
            //     else
            //         router.push(`/album/${trackId}/report`)    
            // }
            // else
            //     saveReportByTrackOrAlbumToCsvFile(trackId)    
        },
        rightTitle: {
            onSelected: () => {
                dispatch(selectPlaylistTypeAction(PlaylistType.New))
                if (isTrack)
                    loadPlotInfoActionCreator(trackId)
                else
                    loadAlbumPlotInfoActionCreator(trackId)
            },
            item: {
                type: BreadcrumbsItemType.RangeDate,
                title: 'Новинки',
                startDate: {
                    value: startDate,
                    maxDate: endDate,
                    onSelected: (date: Date) => {
                        const dateString = DateFormat(date, "dd.mm.yyyy")
                        dispatch(selectedStartDateAction(trackId, dateString))
                        if (isTrack)
                            loadPlotInfoActionCreator(trackId)
                        else
                            loadAlbumPlotInfoActionCreator(trackId)
                    }
                },
                endDate: {
                    value: endDate,
                    maxDate: maxDateInDatabase(),
                    onSelected: (date: Date) => {
                        const dateString = DateFormat(date, "dd.mm.yyyy")
                        dispatch(selectedEndDateAction(trackId, dateString))
                        if (isTrack)
                            loadPlotInfoActionCreator(trackId)
                        else
                            loadAlbumPlotInfoActionCreator(trackId)
                    }
                }
            }
        }
    }
    return props
}

export function playlistSelector(trackId: number) {

    const nextState: AppState = store.getState()

    const playlistDate = (() => {
        const dateState = nextState.selectFilter.playlist[trackId]
        if (dateState !== undefined) {
            return dateState.date !== undefined
                ? moment(dateState.date, 'DD.MM.YYYY').toDate()
                : maxDateInDatabase()
        }
        else {
            return maxDateInDatabase()
        }
    })()

    const playlistDateString = DateFormat(playlistDate, 'dd.mm.yyyy')

    const playlistState: PlaylistState = nextState.playlists

    const emptyText = (() => {

        const playlistType = playlistFilterTypes(trackId)

        switch (playlistType) {

            case PlaylistDateFilterTypes.All:
                return "Нет данных за все время, мы работаем над исправлением этой проблемы"

            case PlaylistDateFilterTypes.ForDate:
                return "Нет данных за " + playlistDateString + ", мы работаем над исправлением этой проблемы"
        }
    })()

    const playlistForTrack = playlistState[trackId]

    if (playlistForTrack === undefined || playlistForTrack.loaded === undefined) {
        return {
            type: GeneralLoadDataTypes.EmptyData,
            text: emptyText
        } as GeneralLoadDataProps<PlaylistProps>
    }
    else {
        if (playlistForTrack.loading) {
            return {
                type: GeneralLoadDataTypes.LoadingData,
            } as GeneralLoadDataProps<PlaylistProps>
        }
        else if (playlistForTrack.error.length > 0 || playlistForTrack.loaded.length === 0) {
            return {
                type: GeneralLoadDataTypes.EmptyData,
                text: emptyText
            } as GeneralLoadDataProps<PlaylistProps>
        }
        else {
            return {
                type: GeneralLoadDataTypes.LoadedData,
                data: {
                    items: playlistForTrack.loaded.map(playlist => {
                        var metrics = ""
                        if (playlist.metrics.length > 0)
                            metrics = playlist.metrics[0]
                        return {
                            coverUrl: playlist.coverUrl ?? "",
                            platformName: playlist.platform,
                            name: playlist.title,
                            author: playlist.author,
                            position: playlist.position,
                            metrics: metrics,
                            onClick: console.log
                        }
                    })
                }
            } as GeneralLoadDataProps<PlaylistProps>
        }
    }
}
