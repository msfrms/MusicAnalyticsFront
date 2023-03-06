import store from '../app/store'
import { MusicCategory } from './MusicCategory'
import { AppState } from '../reducers/mainReducer'
import { PlaylistType } from './MusicSection'

export function isDisabled(): boolean {
    const state: AppState = store.getState()
    const isFetureDisabled = state.selectFilter.category === MusicCategory.Artist
        && state.selectFilter.playlistType === PlaylistType.Chart
    return isFetureDisabled
}

export function textForFeatureDisabled(): string {
    if (isDisabled()) {
        return "К сожалению это пока не реализовано, мы работаем над исправлением этой проблемы"
    }
    return ""
}
