import store from "../../../../app/store";
import { AppState } from "../../../../reducers/mainReducer";
import { ArtistsSimilarProps } from "../../../artistsimilar/ArtistsSimilarComponent";

function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function artistSimilarSelector(artistId: number): ArtistsSimilarProps | undefined {
    const state: AppState = store.getState()
    const isLoaded = state.similarArtists.byArtistId[artistId] !== undefined && state.artists.byArtistId[artistId] !== undefined

    if (isLoaded) {
        const artistName = state.artists.byArtistId[artistId].name
        const artists = state.similarArtists.byArtistId[artistId]
        return {
            header: `Артисты похожие на ${artistName}`,
            artists: artists.map(artist => {
                return {
                    title: artist.name,
                    coverUrl: artist.coverUrl ?? "",
                    platformMatchCount: `Cовпадений по платформам: ${artist.platformMatchCount}`,
                    genresMatchCount: `Cовпадений по жанрам: ${artist.genresMatchCount}`,
                    audience: `Размер аудитории: ${numberWithSpaces(artist.audienceSize)}`,
                    router: {
                        link: `/artist/${artist.artistId}`,
                        onClick: () => { 
                            window.open(`/artist/${artist.artistId}`)
                        }
                    },
                    // eslint-disable-next-line
                    isSelected: artist.artistId == artistId
                }
            })
        }
    }
    else {
        return undefined
    }
}