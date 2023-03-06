import moment from "moment"
import { loadArtistMerticsActionCreator } from "../../../../actions/artist/LoadArtistMerticsActionCreator"
import { saveReportByArtistAudienceToCsvFile } from "../../../../actions/ReportActionCreators"
import { selectedArtistEndDateAction, selectedArtistStartDateAction } from "../../../../actions/track/PlotSelectDateActions"
import store from "../../../../app/store"
import { AppState } from "../../../../reducers/mainReducer"
import {
    BreadcrumbsActiveState,
    BreadcrumbsItemType,
    BreadcrumbsProps
} from "../../../breadcrumbs/BreadcrumbsComponent"

const DateFormat = require('dateformat')

export function artistStatsBreadcrumbsSelector(artistId: number) {
    const state: AppState = store.getState()
    const dispatch = store.dispatch

    const selectedDateByArtist = state.selectedDateByTrack.byArtistId[artistId]

    var startDate = new Date()
    if (selectedDateByArtist?.startDate !== undefined)
        startDate = moment(selectedDateByArtist.startDate, 'DD.MM.YYYY').toDate()

    var endDate = new Date()
    if (selectedDateByArtist?.endDate !== undefined)
        endDate = moment(selectedDateByArtist.endDate, 'DD.MM.YYYY').toDate()

    const props: BreadcrumbsProps = {
        active: BreadcrumbsActiveState.Right,
        onClickDownload: () => saveReportByArtistAudienceToCsvFile(artistId),
        rightTitle: {
            onSelected: () => { },
            item: {
                type: BreadcrumbsItemType.RangeDate,
                title: 'Метрики за',
                startDate: {
                    value: startDate,
                    onSelected: (date) => {
                        const dateString = DateFormat(date, "dd.mm.yyyy")
                        dispatch(selectedArtistStartDateAction(artistId, dateString))
                        loadArtistMerticsActionCreator(artistId)
                    },
                },
                endDate: {
                    value: endDate,
                    onSelected: (date) => { 
                        const dateString = DateFormat(date, "dd.mm.yyyy")
                        dispatch(selectedArtistEndDateAction(artistId, dateString))
                        loadArtistMerticsActionCreator(artistId)
                    },
                }
            }
        }
    }
    return props
}
