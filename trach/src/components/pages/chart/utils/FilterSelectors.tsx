import { PlaylistType } from '../../../../core/MusicSection'
import { MusicCategory } from '../../../../core/MusicCategory'
import { MenuItemProps } from '../../../filter/FilterComponent'
import * as actions from '../../../../actions/SelectFilterActions'
import { loadTracksActionCreator } from '../../../../actions/chart/LoadChartActionCreator'
import * as main from '../../../../reducers/mainReducer'

import store from '../../../../app/store'
import { selectPlaylistTypeAction } from '../../../../actions/SelectFilterActions'

export function createMusicSectionProps(state: main.AppState) {
    return (dispatch: (action: any) => void) => {
        const items: PlaylistType[] = [PlaylistType.Chart, PlaylistType.New]
        const index = items.indexOf(state.selectFilter.playlistType)
        const menuItem = (item: PlaylistType): MenuItemProps => {
            switch (item) {
                case PlaylistType.Chart:
                    return {
                        title: 'Чарты',
                        onClick: () => {
                            dispatch(selectPlaylistTypeAction(PlaylistType.Chart))
                            dispatch(loadTracksActionCreator())
                        }
                    }
                case PlaylistType.New:
                    return {
                        title: 'Новинки',
                        onClick: () => {
                            dispatch(selectPlaylistTypeAction(PlaylistType.New))
                            dispatch(loadTracksActionCreator())
                        }
                    }
            }
        }
        const prev: MenuItemProps[] = items.slice(0, index).map(menuItem)
        const current: MenuItemProps = menuItem(items[index])
        const next: MenuItemProps[] = items.slice(index + 1, items.length).map(menuItem)
        return {
            prev: prev,
            current: current,
            next: next
        }
    }
}

export function createMusicCategoryProps(selectedCategory: MusicCategory) {
    return (dispatch: (action: any) => void) => {
        const items: MusicCategory[] = [MusicCategory.Track, MusicCategory.Album, MusicCategory.Artist]
        const index = items.indexOf(selectedCategory)
        const menuItem = (item: MusicCategory): MenuItemProps => {
            switch (item) {
                case MusicCategory.Track:
                    return {
                        title: 'Треки',
                        onClick: () => {
                            dispatch({
                                type: actions.SelectFilterActionTypes.MusicCategory,
                                category: MusicCategory.Track
                            } as actions.SelectMusicCategoryAction)
                            loadTracksActionCreator()(dispatch)
                        }
                    }
                case MusicCategory.Album:
                    return {
                        title: 'Альбомы',
                        onClick: () => {
                            dispatch({
                                type: actions.SelectFilterActionTypes.MusicCategory,
                                category: MusicCategory.Album
                            } as actions.SelectMusicCategoryAction)
                            loadTracksActionCreator()(dispatch)
                        }
                    }
                case MusicCategory.Artist:
                    return {
                        title: 'Артисты',
                        onClick: () => {
                            dispatch({
                                type: actions.SelectFilterActionTypes.MusicCategory,
                                category: MusicCategory.Artist
                            } as actions.SelectMusicCategoryAction)
                            loadTracksActionCreator()(dispatch)
                        }
                    }
            }
        }
        const prev: MenuItemProps[] = items.slice(0, index).map(menuItem)
        const current: MenuItemProps = menuItem(items[index])
        const next: MenuItemProps[] = items.slice(index + 1, items.length).map(menuItem)
        return {
            prev: prev,
            current: current,
            next: next
        }
    }
}

export function createPlatformProps() {
    return (dispatch: (action: any) => void) => {
        const state: main.AppState = store.getState()
        var selectedPlatformId = state.selectFilter.platformId
            ?? state.platforms.byTrack.availablePlatformIds[0]

        if (state.platforms.byTrack.availablePlatformIds.indexOf(selectedPlatformId) === -1)
            selectedPlatformId = state.platforms.byTrack.availablePlatformIds[0]

        const selectedTitle = state.platforms.byTrack.titleByPlatformId[selectedPlatformId]

        type Platform = {
            id: string
            title: string
        }
        var platforms = state.platforms.byTrack.availablePlatformIds.map(id => {
            const platform: Platform = {
                id: id,
                title: state.platforms.byTrack.titleByPlatformId[id]
            }
            return platform
        })

        if (platforms === undefined)
            platforms = []

        const menuItem = (platform: Platform) => {
            const item: MenuItemProps = {
                title: platform.title,
                onClick: () => {
                    dispatch({
                        type: actions.SelectFilterActionTypes.Platform,
                        platform: platform.id
                    } as actions.SelectPlatformAction)
                    dispatch(loadTracksActionCreator())
                }
            }
            return item
        }

        var index = state.platforms
            .byTrack
            .availablePlatformIds
            .indexOf(selectedPlatformId)

        const prev: MenuItemProps[] = index >= 0 ? platforms.slice(0, index).map(menuItem) : []

        var current: MenuItemProps = {
            title: selectedTitle,
            onClick: () => {
                dispatch({
                    type: actions.SelectFilterActionTypes.Platform,
                    platform: selectedPlatformId
                } as actions.SelectPlatformAction)
                dispatch(loadTracksActionCreator())
            }
        }

        if (index !== -1)
            current = menuItem(platforms[index])

        const next: MenuItemProps[] = index >= 0
            ? platforms.slice(index + 1, platforms.length).map(menuItem)
            : platforms.slice(1, platforms.length).map(menuItem)

        return {
            prev: prev,
            current: current,
            next: next
        }
    }
}
