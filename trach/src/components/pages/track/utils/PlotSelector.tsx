import { selectedTrackPlatformAction } from '../../../../actions/track/LegendActions'
import store from '../../../../app/store'
import { platformToColor } from '../../../../core/Platform'
import { AppState } from '../../../../reducers/mainReducer'
import { TrackPositionPlotProps } from '../../../trackplot/TrackPositionPlotComponent'

export function plotSelector(trackId: number): TrackPositionPlotProps {
    const state: AppState = store.getState()
    const dispatch = store.dispatch
    const loaded = state.legend.forTrack.byTrackId[trackId] !== undefined

    if (loaded) {
        const selectedByTrack = state.legend.forTrack.byTrackId[trackId]?.selectedByPlatformId

        const enableIds = state.platforms
            .byTrack
            .availablePlatformIds
            .filter(id => state.legend.forTrack.byTrackId[trackId].enabledByPlatformId[id])

        const enableAndSelectedIds = enableIds.filter(id => selectedByTrack[id])

        const disableIds = state.platforms
            .byTrack
            .availablePlatformIds
            .filter(id => !state.legend.forTrack.byTrackId[trackId].enabledByPlatformId[id])

        return {
            legend: {
                enableItems: enableIds.map(id => {
                    const maxPosition = state.statsByTrack.byPlatform[id].byTrackId[trackId].maxPosition
                    const daysInChart: (days: number) => string = (days: number) => {

                        if (days < 30)
                            return `${days} дн.`
                        else {
                            const d = days % 30
                            if (d === 0)
                                return `${days / 30} мес.`
                            else
                                return `${Math.floor(days / 30)} мес. ${d} дн.`
                        }
                    }

                    return {
                        title: state.platforms.byTrack.titleByPlatformId[id],
                        color: platformToColor(id),
                        isSelected: selectedByTrack[id],
                        maxPosition: maxPosition,
                        numberOfUnitInTop: daysInChart(state.statsByTrack.byPlatform[id].byTrackId[trackId].daysInChart),
                        onSelected: () => {
                            dispatch(selectedTrackPlatformAction(trackId, id))
                        }
                    }
                }),
                disableItems: disableIds.map(id => state.platforms.byTrack.titleByPlatformId[id])
            },
            plot: {
                labels: state.plotDateLines.forTrackPlot.datesByTrackId[trackId],
                lines: enableAndSelectedIds.map(id => {
                    return {
                        label: state.platforms.byTrack.titleByPlatformId[id],
                        color: platformToColor(id),
                        values: state.plotDateLines.forTrackPlot.datesByTrackId[trackId].map(date => {
                            const positionByDate = state.positions.byPlatform[id].byDate[date]
                            if (positionByDate === undefined)
                                // TODO: убрать костыль
                                return 110
                            else
                                return positionByDate.positionByIndex[0]
                        })
                    }
                })
            }
        }
    }
    else
        return {
            legend: {
                enableItems: [],
                disableItems: []
            },
            plot: {
                labels: [],
                lines: []
            }
        }
}
