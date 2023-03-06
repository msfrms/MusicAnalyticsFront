import store from '../../../../app/store'
import { AppState } from '../../../../reducers/mainReducer'
import { ArtistInfoProps } from '../../../artistinfo/ArtistInfoComponent'

export function artistInfoSelector(artistId: number): ArtistInfoProps {

    const state: AppState = store.getState()
    const artist = state.artists.byArtistId[artistId]
    const links = state.artistLinks.byArtistId[artistId]
    const isLoaded = artist !== undefined && links !== undefined

    if (isLoaded)
        return {
            coverUrl: artist.coverUrl ?? "",
            name: artist.name,
            contacts: links.map(link => {
                return {
                    title: link.title,
                    link: link.url,
                    onClick: () => window.open(link.url)
                }
            }),
            onClickBookmark: console.log
        }
    else
        return {
            coverUrl: '',
            name: '',
            contacts: [],
            onClickBookmark: console.log
        }    
}
