import store from "../../app/store"
import { Constants } from "../../core/Constants"
import fetch from 'cross-fetch'
import { SimilarArtist } from "../../core/SimilarArtist"
import * as actions from './SimilarArtistActions'

export function loadSimilarArtistsActionCreator(artistId: number) {
    const dispatch = store.dispatch    

    fetch(Constants.api.artist(artistId).similar, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },        
    })
    .then(
        response => response.json(),
        _ => undefined
    )
    .then(
        json => {
            const response = json as SimilarArtist[]

            if (response !== undefined)
                dispatch(actions.didDidLoadSimilarArtistAction(response, artistId))
        },
        error => {}
    )
}