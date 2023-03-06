import store from '../app/store'
import { searchItems, searchEmpty } from './SearchActions'
import { Constants } from '../core/Constants'

import fetch from 'cross-fetch'

export type FoundItemResponse = {
    id: number
    title: string
    subtitle?: string
    coverUrl?: string
}

export type SearchResponse = {
    tracks: FoundItemResponse[]
    artists: FoundItemResponse[]
    albums: FoundItemResponse[]
}

export function searchActionCreator(search: string) {
    
    const dispatch = store.dispatch

    if (search.length < 2) {
        dispatch(searchEmpty(search))
        return
    }

    fetch(Constants.api.search, {
        method: 'POST',            
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
            query: search
        })
    })
    .then(
        response => response.json(),
        error => undefined
    )
    .then(
        json => {                
            const response = json as SearchResponse
            if (response !== undefined)
                dispatch(searchItems(search, response))
        }
    )    
}
