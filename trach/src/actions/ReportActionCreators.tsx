import { Constants } from '../core/Constants'

import fetch from 'cross-fetch'

import FileSaver from 'file-saver'
import { AppState } from '../reducers/mainReducer'
import store from '../app/store'
import { PlaylistType } from '../core/MusicSection'
import { MusicCategory } from '../core/MusicCategory'
import * as firebase from '../util/firebase'

export function saveReportByTrackOrAlbumToCsvFile(id: number) {
    const state: AppState = store.getState()
    const url = (() => {
        switch (state.selectFilter.playlistType) {
            case PlaylistType.Chart:
                switch (state.selectFilter.category) {
                    case MusicCategory.Track:
                        return Constants.api.track(id).charts.report
                    case MusicCategory.Album:
                        return Constants.api.album(id).charts.report
                    default:
                        return ""
                }
            case PlaylistType.New:
                switch (state.selectFilter.category) {
                    case MusicCategory.Track:
                        return Constants.api.track(id).news.report
                    case MusicCategory.Album:
                        return Constants.api.album(id).news.report
                    default:
                        return ""
                }
        }
    })()
    const type: string = (() => {
        switch (state.selectFilter.playlistType) {
            case PlaylistType.Chart:
                return "в_чартах"
            case PlaylistType.New:
                return "в_новинках"
        }
    })()
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
    })
        .then(
            response => response.text(),
            _ => undefined
        )
        .then(
            text => {
                const track = state.tracks.byTrackId[id].title
                const artists = state.artists.byTrackId[id]
                    .map(id => state.artists.byArtistId[id].name)
                    .join(", ")
                if (text !== undefined) {
                    var blob = new Blob([text], { type: "text/plain;charset=utf-8" })
                    FileSaver.saveAs(blob, `${artists}-${track}_${type}_stat.csv`)

                    const state: AppState = store.getState()

                    if (state.auth.authorized.email !== null) {
                        firebase.analytics.setUserId(state.auth.authorized.email)
                        firebase.analytics.setUserProperties({
                            "email": state.auth.authorized.email
                        })
                        firebase.analytics.logEvent("click_download_report")
                    }
                }
            }
        )
}

export function saveReportByArtistAudienceToCsvFile(id: number) {
    const state: AppState = store.getState()
    const url = Constants.api.artist(id).report    
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        },
    })
        .then(
            response => response.text(),
            _ => undefined
        )
        .then(
            text => {                
                const artist = state.artists.byArtistId[id].name
                if (text !== undefined) {
                    var blob = new Blob([text], { type: "text/plain;charset=utf-8" })
                    FileSaver.saveAs(blob, `${artist}_audience.csv`)                    
                }
            }
        )
}

export function saveReportByExistTrackInPlaylistsToCsvFile(trackId: number) {
    const state: AppState = store.getState()
    const track = state.tracks.byTrackId[trackId].title
    const artists = state.artists.byTrackId[trackId]
        .map(id => state.artists.byArtistId[id].name)
        .join(", ")
    fetch(Constants.api.track(trackId).report, {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8',
        }
    })
        .then(
            response => response.text(),
            error => undefined
        )
        .then(
            text => {
                if (text !== undefined) {
                    var blob = new Blob([text], { type: "text/plain;charset=utf-8" })
                    FileSaver.saveAs(blob, `${artists}-${track}_stat.csv`)
                }
            }
        )
}
