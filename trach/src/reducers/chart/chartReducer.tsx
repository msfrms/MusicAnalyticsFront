import * as actions from '../../actions/chart/TrackActions'
import { PlaylistType } from '../../core/MusicSection'

export type ByDate<T> = {
    byDate: {
        [date: string]: T
    }
}

export type ByPlatform<T> = {
    byPlatform: {
        [platform: string]: ByDate<T> 
    }
}

export type ChartState = {
    failed: ByPlatform<string>
    inProgress: ByPlatform<boolean>
    loadedTrackIds: ByPlatform<number[]>
}

export const initialState: ChartState = {
    failed: {
        byPlatform: {}
    },
    inProgress: {
        byPlatform: {}
    },
    loadedTrackIds: {
        byPlatform: {}
    },
}

export function reducer(
    state = initialState, 
    action: actions.TracksAction,  
    playlistType: PlaylistType): ChartState {
    
    switch (action.type) {

        case actions.TrackActionTypes.DidLoadTracks: {
            
            if (action.playlistType !== playlistType)
                return state

            const newState = JSON.parse(JSON.stringify(state))
            const failed = newState.failed
            const loadedTrackIds = newState.loadedTrackIds
            const inProgress = newState.inProgress
        
            var loadedByPlatform = loadedTrackIds.byPlatform[action.platform]
            if (loadedByPlatform === undefined)
                loadedByPlatform = {
                    byDate: {}
                }

            var failedByPlatform = failed.byPlatform[action.platform]
            if (failedByPlatform === undefined)
                failedByPlatform = {
                    byDate: {}
                }

            var loadingByPlatform = inProgress.byPlatform[action.platform]
            if (loadingByPlatform === undefined)
                loadingByPlatform = {
                    byDate: {}
                }  

            loadedByPlatform.byDate[action.date] = action.tracks.map(t => t.id)
            failedByPlatform.byDate[action.date] = ""
            loadingByPlatform.byDate[action.date] = false

            loadedTrackIds.byPlatform[action.platform] = loadedByPlatform
            inProgress.byPlatform[action.platform] = loadingByPlatform
            failed.byPlatform[action.platform] = failedByPlatform

            return {
                inProgress: inProgress,
                failed: state.failed,
                loadedTrackIds: loadedTrackIds
            }
        }

        case actions.TrackActionTypes.FailedLoadedTracks: {

            if (action.playlistType !== playlistType)
                return state

            const newState = JSON.parse(JSON.stringify(state))
            const failed = newState.failed
            const inProgress = newState.inProgress

            if (action.playlistType !== playlistType)
                return state

            failedByPlatform = failed.byPlatform[action.platform]
            if (failedByPlatform === undefined)
                failedByPlatform = {
                    byDate: {}
                }

            loadingByPlatform = inProgress.byPlatform[action.platform]
            if (loadingByPlatform === undefined)
                loadingByPlatform = {
                    byDate: {}
                } 

            failedByPlatform.byDate[action.date] = action.text
            loadingByPlatform.byDate[action.date] = false

            inProgress.byPlatform[action.platform] = loadingByPlatform
            failed.byPlatform[action.platform] = failedByPlatform

            return {
                inProgress: state.inProgress,
                failed: failed,
                loadedTrackIds: state.loadedTrackIds
            }
        }

        case actions.TrackActionTypes.LoadingTracks: {
            
            if (action.playlistType !== playlistType)
                return state

            const newState = JSON.parse(JSON.stringify(state))
            const failed = newState.failed
            const inProgress = newState.inProgress

            failedByPlatform = failed.byPlatform[action.platform]
            if (failedByPlatform === undefined)
                failedByPlatform = {
                    byDate: {}
                }

            loadingByPlatform = inProgress.byPlatform[action.platform]
            if (loadingByPlatform === undefined)
                loadingByPlatform = {
                    byDate: {}
                } 

            loadingByPlatform.byDate[action.date] = true
            failedByPlatform.byDate[action.date] = ""

            inProgress.byPlatform[action.platform] = loadingByPlatform
            failed.byPlatform[action.platform] = failedByPlatform

            return {
                inProgress: inProgress,
                failed: state.failed,
                loadedTrackIds: state.loadedTrackIds
            } 
        }

        default:
            return state
    }
}
