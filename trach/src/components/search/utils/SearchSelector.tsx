import store from '../../../app/store'
import { SearchProps, PredictProps } from '../SearchComponent'
import { searchActionCreator } from '../../../actions/SearchActionCreator'
import { AppState } from '../../../reducers/mainReducer'

import { throttle } from 'throttle-typescript'
import { FoundItem } from '../../../actions/SearchActions'

const throttleSearchActionCreator = throttle(searchActionCreator, 300)
const throttleActionCreator = (text: string) => (_: (action: any) => void) => throttleSearchActionCreator(text)

export function searchSelector(): SearchProps {
    const state: AppState = store.getState()
    const dispatch = store.dispatch
    const onEditing = (text: string) => {
        dispatch(throttleActionCreator(text))
    }    
    return {
        tracks: state.search.tracks.map((track: FoundItem) => {
            const trackProps: PredictProps = {
                id: `${track.id}`, 
                coverUrl: track.coverUrl ?? "",
                title: track.title,
                subtitle: track.subtitle ?? "",
                onClick: (router) => router.push(`/track/${track.id}`),
                onClickInfo: (router) => router.push(`/track/${track.id}`)
            }
            return trackProps
        }),
        artists: state.search.artists.map((artist: FoundItem) => {
            const artistProps: PredictProps = {
                id: `${artist.id}`,
                coverUrl: artist.coverUrl ?? "",
                title: artist.title,
                onClick: (router) => router.push(`/artist/${artist.id}`),
                onClickInfo: (router) => router.push(`/artist/${artist.id}`)
            }
            return artistProps 
        }),
        albums: state.search.albums.map((album: FoundItem) => {
            const artistProps: PredictProps = {
                id: `${album.id}`, 
                coverUrl: album.coverUrl ?? "",
                title: album.title,
                subtitle: album.subtitle ?? "",
                onClick: (router) => router.push(`/album/${album.id}`),
                onClickInfo: (router) => router.push(`/album/${album.id}`)
            }
            return artistProps 
        }),
        onEditing: onEditing
    }
}
