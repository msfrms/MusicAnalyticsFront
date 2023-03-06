import { Achievement } from '../../../../actions/artist/ArtistInfoActions'
import store from '../../../../app/store'
import { AppState } from '../../../../reducers/mainReducer'
import { AchievementProps, AchievementTypeProps } from '../../../achievement/AchievementComponent'

export function achievementsSelector(artistId: number): AchievementProps {
    const state: AppState = store.getState()
    const achievements = state.achievements.achievementsByArtistId[artistId]
    if (achievements === undefined || achievements.length === 0) {
        return {
            header: 'Достижения',
            achievements: [],
        }
    }
    else {
        return {
            header: 'Достижения',
            achievements: achievements.map((a: Achievement) => {
                if (a.rating === undefined)
                    return {
                        title: a.title,
                        coverUrl: a.coverUrl ?? "",
                        achievement: {
                            type: AchievementTypeProps.Icon
                        }
                    }
                else
                    return  {
                        title: a.title,
                        coverUrl: a.coverUrl ?? "",
                        achievement: {
                            type: AchievementTypeProps.Text,
                            value: a.rating.value,
                            max: a.rating.max
                        }
                    }
            }),
        }
    }
}
