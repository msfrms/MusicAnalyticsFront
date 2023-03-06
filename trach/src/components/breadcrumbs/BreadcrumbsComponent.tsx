import { FlatButton } from '../core/FlatButton'
import { GeneralInfoTooltipComponent } from '../infotooltip/InfoTooltipComponent'
import { useStyles, InfoIcon, DownloadIcon } from './BreadcrumbsComponentStyles'
import DatePickerComponent from '../datepicker/DatePickerComponent'

import React from 'react'

import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { useHistory } from 'react-router-dom'
import { HistoryRouter } from '../../core/Router'

export enum BreadcrumbsItemType {
    Text = 'item_text',
    SingleDate = 'item_single_date',
    RangeDate = 'item_range_date',
}

export type BreadcrumbsTextItemType = {
    type: BreadcrumbsItemType.Text
    title: string
}

export type BreadcrumbsSingleDateItemType = {
    type: BreadcrumbsItemType.SingleDate
    title: string
    initialDate: Date
    onSelected: (date: Date) => void
}

export type DateProps = {
    value: Date
    onSelected: (date: Date) => void
    minDate?: Date
    maxDate?: Date
}

export type BreadcrumbsRangeDateItemType = {
    type: BreadcrumbsItemType.RangeDate
    title: string
    startDate: DateProps
    endDate: DateProps
}

export enum BreadcrumbsActiveState {
    Left = "left_props",
    Right = "right_props"
}

export type BreadcrumbsProps = {
    active: BreadcrumbsActiveState
    info?: string
    leftTitle?: {
        title: string
        onSelected: () => void
    }
    rightTitle: {
        onSelected: () => void
        isDisabled?: boolean
        item: BreadcrumbsTextItemType | BreadcrumbsSingleDateItemType | BreadcrumbsRangeDateItemType
    }
    onClickDownload?: (router: HistoryRouter) => void
}

export default function BreadcrumbsComponent(props: BreadcrumbsProps) {
    const classes = useStyles()
    const leftTextStyle = props.active === BreadcrumbsActiveState.Left ? classes.activeText : classes.inactiveText
    const rightTextStyle = props.active === BreadcrumbsActiveState.Right ? classes.activeText : classes.inactiveText
    const RightDateNode = () => {
        switch (props.rightTitle.item.type) {
            case BreadcrumbsItemType.SingleDate:
                return (
                    <Grid item>
                        <DatePickerComponent disabled={props.active === BreadcrumbsActiveState.Left} {...props.rightTitle.item} />
                    </Grid>
                )

            case BreadcrumbsItemType.RangeDate:
                return (
                    <Grid item container direction="row" alignItems="center">
                        <Grid className={classes.leftSpace} item>
                            <DatePickerComponent
                                minDate={props.rightTitle.item.startDate.minDate}
                                maxDate={props.rightTitle.item.startDate.maxDate}
                                initialDate={props.rightTitle.item.startDate.value}
                                onSelected={props.rightTitle.item.startDate.onSelected} />
                        </Grid>
                        <Grid item>
                            <span className={classes.separatorDateText}>–</span>
                        </Grid>
                        <Grid item>
                            <DatePickerComponent
                                minDate={props.rightTitle.item.endDate.minDate}
                                maxDate={props.rightTitle.item.endDate.maxDate}
                                initialDate={props.rightTitle.item.endDate.value}
                                onSelected={props.rightTitle.item.endDate.onSelected} />
                        </Grid>
                    </Grid>
                )

            default:
                return null
        }
    }
    const DownloadIconNode = () => {
        const history: HistoryRouter = useHistory()
        if (props.onClickDownload !== undefined) {
            return (
                <Grid xs container item justify="flex-end">
                    <FlatButton className={classes.download} onClick={() => {
                        if (props.onClickDownload !== undefined) {
                            props.onClickDownload(history)
                        }
                    }}>
                        <DownloadIcon />
                    </FlatButton>
                </Grid>
            )
        }
        else {
            return null
        }
    }
    const RightItemNode = () => {
        if (props.rightTitle.isDisabled !== undefined && props.rightTitle.isDisabled === true) {
            return (
                <GeneralInfoTooltipComponent
                    text="К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы"
                    showInElement={
                        <FlatButton className={rightTextStyle} onClick={props.rightTitle.onSelected}>
                            {props.rightTitle.item.title}
                        </FlatButton>
                    } />
            )
        }
        return (
            <FlatButton className={rightTextStyle} onClick={props.rightTitle.onSelected}>
                {props.rightTitle.item.title}
            </FlatButton>
        )
    }
    const LeftItemNode = () => {
        if (props.leftTitle === undefined)
            return null
        return (
            <Grid item>
                <FlatButton className={leftTextStyle} onClick={props.leftTitle.onSelected}>
                    {props.leftTitle.title}
                </FlatButton>
            </Grid>
        )
    }
    const SlashNode = () => {
        if (props.leftTitle === undefined)
            return null
        return (
            <Grid item className={classes.inactiveText}>/</Grid>
        )
    }
    const InfoNode = () => {
        if (props.info === undefined)
            return null
        return (
            <Grid item>
                <GeneralInfoTooltipComponent
                    text={props.info}
                    showInElement={
                        <Box className={classes.infoIcon}>
                            <InfoIcon />
                        </Box>
                    } />
            </Grid>
        )
    }
    return (
        <Grid className={classes.root} container direction="row" alignItems="center">
            <LeftItemNode />
            <SlashNode />
            <Grid item>
                <RightItemNode />
            </Grid>
            <Grid item>
                <RightDateNode />
            </Grid>
            <InfoNode />           
            <DownloadIconNode />
        </Grid>
    )
}
