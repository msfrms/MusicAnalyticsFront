import * as actions from "../../actions/artist/ArtistInfoActions"
import { Achievement } from "../../actions/artist/ArtistInfoActions"

export type AchievementState = {    
    achievementsByArtistId: {
        [id: number]: Achievement[]
    }
}

export const initialState: AchievementState = {
    achievementsByArtistId: {}
}

export function reducer(state = initialState, action: actions.ArtistInfoAction): AchievementState {
    switch (action.type) {
        case actions.ArtistInfoActionTypes.DidLoadAchievements: {
            const newState = {...state}

            newState.achievementsByArtistId[action.artistId] = action.achievements

            return newState
        }

        default:
            return state
    }
}