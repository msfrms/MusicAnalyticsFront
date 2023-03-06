import {
    GeneralLoadDataProps,
    GeneralLoadDataTypes,
    GeneralLoadDataEmptyComponent
} from '../../core/GeneralLoadDataComponent'
import MenuComponent, { MenuProps } from '../../menu/MenuComponent'
import TrackInfoComponent, { TrackInfoProps } from '../../trackinfo/TrackInfoComponent'
import PlaylistComponent, { PlaylistProps } from '../../playlist/PlaylistComponent'
import PlaylistLoaderComponent from '../../playlist/PlaylistLoaderComponent'
import TrackPositionPlotComponent, { TrackPositionPlotProps } from '../../trackplot/TrackPositionPlotComponent'
import BreadcrumbsComponent, { BreadcrumbsProps } from '../../breadcrumbs/BreadcrumbsComponent'
import { useStyles } from './TrackPageComponentStyles'
import { trackPageSelector } from './utils/TrackPageSelector'

import React, { Component } from 'react'

import { connectAdvanced } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import { Route, useHistory, useRouteMatch } from 'react-router-dom'
import ReportComponent from '../../auth/ReportComponent'
import store from '../../../app/store'
import { authorizeActionCreator, LoginChangeAction, PasswordChangeAction } from '../../../actions/auth/AuthActionCreators'
import { AppState } from '../../../reducers/mainReducer'

export type TrackPageProps = {
    menu: MenuProps
    artist: TrackInfoProps
    playlist?: GeneralLoadDataProps<PlaylistProps>
    trackPositionPlot: TrackPositionPlotProps
    filterByDateInPlaylist?: BreadcrumbsProps
    filterByDateInPlot: BreadcrumbsProps
    trackId: number
    didMount: () => void
}

function PlaylistDataComponent(props: GeneralLoadDataProps<PlaylistProps>) {

    switch (props.type) {

        case GeneralLoadDataTypes.LoadingData:
            return (
                <PlaylistLoaderComponent />
            )

        case GeneralLoadDataTypes.LoadedData:
            return (
                <PlaylistComponent {...props.data} />
            )

        case GeneralLoadDataTypes.EmptyData:
            return (
                <div style={{ paddingTop: 20 }}>
                    <GeneralLoadDataEmptyComponent {...props} />
                </div>
            )
    }
}

export function TrackPageWrapComponent(props: TrackPageProps) {
    const classes = useStyles()
    const Playlist = () => {
        if (props.filterByDateInPlaylist !== undefined && props.playlist !== undefined)
            return (
                <div>
                    <BreadcrumbsComponent {...props.filterByDateInPlaylist} />
                    <PlaylistDataComponent {...props.playlist} />
                </div>
            )
        else
            return (
                <div />
            )

    }

    const history = useHistory()
    const { url } = useRouteMatch()

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item container direction="row">
                    <MenuComponent {...props.menu} />
                    <TrackInfoComponent {...props.artist} />
                    <BreadcrumbsComponent {...props.filterByDateInPlot} />
                    <TrackPositionPlotComponent {...props.trackPositionPlot} />
                    <Playlist />
                </Grid>
            </Grid>
            <Route
                path={`${url}/report`}
                children={({ match }) => {
                    // TODO: вынести все в отдельный selector
                    const artists = props.artist.artists.map(n => n.name).join(", ")
                    const track = `${artists} - ${props.artist.trackName}`
                    const dispatch = store.dispatch
                    const state: AppState = store.getState()
                    var auth = undefined
                    if (state.auth.isValid) {
                        auth = () => authorizeActionCreator(history, props.trackId)
                    }
                    return (
                        <ReportComponent
                            isOpen={Boolean(match)}
                            isError={state.auth.authorized.isError}
                            onClose={() => history.goBack()}
                            onLogin={(text) => dispatch(LoginChangeAction(text))}
                            onPassword={(text) => dispatch(PasswordChangeAction(text))}
                            onAuth={auth}
                            track={track}
                        />
                    )
                }}
            />
        </div>
    )
}

export class TrackPageComponent extends Component<TrackPageProps | undefined> {

    componentDidMount() {
        this.props.didMount()
    }

    render() {
        return (
            <TrackPageWrapComponent {...this.props} />
        )
    }
}

export default connectAdvanced(trackPageSelector)(TrackPageComponent)
