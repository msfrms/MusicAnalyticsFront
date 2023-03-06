import { Change } from '../../../../core/Plot'
import { TrackProps } from '../../../track/TrackComponent'
import { ChartPageProps } from '../ChartPageComponent'
import {
    GeneralLoadDataProps,
    GeneralLoadDataTypes,
} from '../../../core/GeneralLoadDataComponent'
import { PlaylistType } from '../../../../core/MusicSection'
import * as main from '../../../../reducers/mainReducer'
import * as tracksActionCreator from '../../../../actions/chart/LoadChartActionCreator'
import * as selectFilterActions from '../../../../actions/SelectFilterActions'
import * as filterSelectors from './FilterSelectors'
import { menuSelector } from '../../../menu/utils/MenuSelector'
import * as Feature from '../../../../core/Feature'
import { Artist } from '../../../../actions/chart/TrackActions'

import moment from 'moment'
import { HistoryRouter } from '../../../../core/Router'
import { Track } from '../../../../core/Track'
import store from '../../../../app/store'
import { TrackTypes } from '../../../../core/MusicCategory'
import { maxDateInDatabase } from '../../../../core/Constants'

const DateFormat = require('dateformat')


function createTracksProps() {
    return (dispatch: (action: any) => void) => {
        const today = DateFormat(maxDateInDatabase(), 'dd.mm.yyyy')
        const nextState: main.AppState = store.getState()
        const dateString = nextState.selectFilter.date ?? today

        const platform = nextState.selectFilter.platformId
            ?? nextState.platforms.byTrack.availablePlatformIds[0]
        const state = ((newState: main.AppState) => {
            switch (newState.selectFilter.playlistType) {

                case PlaylistType.Chart:
                    return newState.chart

                case PlaylistType.New:
                    return newState.newTracks
            }
        })(nextState)

        if (Feature.isDisabled()) {
            return {
                type: GeneralLoadDataTypes.EmptyData,
                text: Feature.textForFeatureDisabled()
            } as GeneralLoadDataProps<TrackProps[]>
        }

        const trackIds = state.loadedTrackIds?.byPlatform[platform]?.byDate[dateString]
        const loadingByPlatform = state.inProgress.byPlatform[platform]?.byDate[dateString]
        const mapToTrack = (trackId: number, index: number) => {
            const track: Track = nextState.tracks.byTrackId[trackId]
            const artists = nextState
                .artists
                .byTrackId[trackId]
                .map(id => nextState.artists.byArtistId[id])
            const label = nextState.labels.byTrackId[trackId].join(", ")
            const position = nextState
                .positions
                .byPlatform[platform]
                ?.byDate[dateString]
                ?.positionByIndex[index]

            const diff = nextState
                .positions
                .byPlatform[platform]
                ?.byDate[dateString]
                ?.diffByIndex[index]

            const type: TrackTypes = nextState.trackTypes.byId[trackId]

            const stats = nextState.statsByTrack.byPlatform[platform]?.byTrackId[trackId]
            return {
                title: {
                    value: track.title,
                    onClick: (router: HistoryRouter) => {
                        switch (type) {
                            case TrackTypes.Track:
                                router.push(`/track/${track.id}`)
                                break
                            case TrackTypes.Album:
                                router.push(`/album/${track.id}`)
                                break
                        }
                    }
                },
                artist: artists.map((artist: Artist) => {
                    return {
                        value: artist.name,
                        onClick: (router: HistoryRouter) => router.push(`/artist/${artist.id}`)
                    }
                }),
                label: label,
                coverUrl: track.coverUrl ?? "",
                changePosition: {
                    change: diff.progress.toString() as Change,
                    value: diff.shift
                },
                position: position,
                maxPosition: stats.maxPosition,
                daysInChart: stats.daysInChart,
                infoOnClick: (router: HistoryRouter) => {
                    switch (type) {
                        case TrackTypes.Track:
                            router.push(`/track/${track.id}`)
                            break
                        case TrackTypes.Album:
                            router.push(`/album/${track.id}`)
                            break
                    }
                }
            } as TrackProps
        }

        if (loadingByPlatform) {
            return {
                type: GeneralLoadDataTypes.LoadingData
            } as GeneralLoadDataProps<TrackProps[]>
        }
        else {
            const tracksProps: TrackProps[] = trackIds !== undefined
                ? trackIds.map(mapToTrack)
                : []

            if (tracksProps.length > 0) {
                return {
                    type: GeneralLoadDataTypes.LoadedData,
                    data: tracksProps
                } as GeneralLoadDataProps<TrackProps[]>
            }
            else {
                return {
                    type: GeneralLoadDataTypes.EmptyData,
                    text: "Нет данных за " + dateString + ", мы работаем над исправлением этой проблемы"
                } as GeneralLoadDataProps<TrackProps[]>
            }
        }
    }
}

export function chartPageSelector(dispatch: (action: any) => void) {
    return (nextState: main.AppState, nextOwnProps: any) => {
        const selectedDate = (() => {
            if (nextState.selectFilter.date !== undefined) {
                return moment(nextState.selectFilter.date, 'DD.MM.YYYY').toDate()
            }
            else {
                return maxDateInDatabase()
            }
        })()
        const props: ChartPageProps = {
            menu: menuSelector(),
            chartsFilterProps: filterSelectors.createMusicSectionProps(nextState)(dispatch),
            tracksFilterProps: filterSelectors.createMusicCategoryProps(nextState.selectFilter.category)(dispatch),
            platformFilterProps: filterSelectors.createPlatformProps()(dispatch),
            dateProps: {
                initialDate: selectedDate,
                onSelected: (date: Date) => {
                    dispatch({
                        type: selectFilterActions.SelectFilterActionTypes.Date,
                        date: DateFormat(date, 'dd.mm.yyyy')
                    } as selectFilterActions.SelectDateAction)
                    dispatch(tracksActionCreator.loadTracksActionCreator())
                }
            },
            itemProps: createTracksProps()(dispatch),
            didLoad: () => {
                dispatch({
                    type: selectFilterActions.SelectFilterActionTypes.Date,
                    date: DateFormat(selectedDate, 'dd.mm.yyyy')
                } as selectFilterActions.SelectDateAction)
                dispatch(tracksActionCreator.loadTracksActionCreator())
            }
        }
        return props
    }
}
