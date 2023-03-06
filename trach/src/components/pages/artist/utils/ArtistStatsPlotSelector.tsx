import { selectedArtistPlatformAction } from '../../../../actions/track/LegendActions'
import store from '../../../../app/store'
import { AppState } from '../../../../reducers/mainReducer'
import { ArtistStatsPlotProps } from '../../../artistplot/ArtistStatsPlotComponent'

export function artistStatsPlotSelector(artistId: number): ArtistStatsPlotProps {
    const state: AppState = store.getState()
    const dispatch = store.dispatch
    const artist = state.artists.byArtistId[artistId]
    const isLoaded = artist !== undefined && state.legend.forArtist.byArtistId[artistId] !== undefined
    if (isLoaded) {
        const name = artist.name
        const dates = state.plotDateLines.forArtistPlot.datesByArtistId[artistId]

        const selectedByTrack = state.legend.forArtist.byArtistId[artistId]?.selectedByPlatformId

        const enabledMetricIds = state.platforms
            .byArtist
            .availablePlatformIds
            .filter(id => state.legend.forArtist.byArtistId[artistId].enabledByPlatformId[id])
        const disableMetricIds = state.platforms
            .byArtist
            .availablePlatformIds
            .filter(id => !state.legend.forArtist.byArtistId[artistId].enabledByPlatformId[id])

        const enableAndSelectedIds = enabledMetricIds.filter(id => selectedByTrack[id])

        const colorForMatricId = (id: string) => {
            switch (id) {
                case "alive_audience":
                    return "#FF0000"
                case "total_audience":
                    return "#4986CC"
                case "total_shazams":
                    return "#00D2FF"
                default:
                    return ""
            }
        }
        const lines = enableAndSelectedIds.map(id => {
            const title = state.platforms.byArtist.titleByPlatformId[id]
            return {
                label: title,
                color: colorForMatricId(id),
                values: state.plotDateLines.forArtistPlot.datesByArtistId[artistId].map((date, index, array) => {
                    const value = state.artistMetrics.byId[artistId].byMetricId[id].byDate[date]

                    if (value === undefined) {
                        const prev = array[index - 1]
                        const next = array[index + 1]
                        if (prev !== undefined && next !== undefined) {
                            const prevValue = state.artistMetrics.byId[artistId]
                                .byMetricId[id]
                                .byDate[prev]
                            const nextValue = state.artistMetrics.byId[artistId]
                                .byMetricId[id]
                                .byDate[next]
                            return (prevValue + nextValue) / 2.0
                        }
                        else
                            return 0
                    }
                    else
                        return value
                })
            }
        })
        const descriptionByMetricId = (id: string) => {
            switch (id) {
                case "alive_audience":
                    return `Пользователи, которые активно слушают ${name}`
                case "total_audience":
                    return `Пользователи которые хотя бы раз слушали ${name}`
                case "total_shazams":
                    return `Сумма шазамов по популярным трекам ${name}`
                default:
                    return ""
            }
        }
        return {
            plot: {
                lines: lines,
                labels: dates
            },
            legend: {
                enableItems: enabledMetricIds.map(id => {
                    return {
                        title: state.platforms.byArtist.titleByPlatformId[id],
                        color: colorForMatricId(id),
                        isSelected: selectedByTrack[id],
                        description: descriptionByMetricId(id),
                        onSelected: () => {
                            dispatch(selectedArtistPlatformAction(artistId, id))
                        }
                    }
                }),
                disableItems: disableMetricIds.map(id => state.platforms.byArtist.titleByPlatformId[id])
            }
        }
    }
    else {
        return {
            plot: {
                lines: [],
                labels: []
            },
            legend: {
                enableItems: [],
                disableItems: []
            }
        }
    }
}
