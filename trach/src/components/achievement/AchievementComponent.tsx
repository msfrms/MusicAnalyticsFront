import Image from '../core/image'
import { useStyles, FireIcon } from './AchievementComponentStyles'

import React from 'react'

import Grid from '@material-ui/core/Grid'

export enum AchievementTypeProps {
    Text = "achievement_type_text",
    Icon = "achievement_type_icon"
}

export type AchievementTypeText = {
    type: AchievementTypeProps.Text,
    value: number
    max: number
}

export type AchievementTypeIcon = {
    type: AchievementTypeProps.Icon,
}

export type AchievementItemProps = {
    coverUrl: string
    title: string
    achievement: AchievementTypeText|AchievementTypeIcon
}

function AchievementItemComponent(props: AchievementItemProps) {
    const classes = useStyles()
    const content = () => {
        switch (props.achievement.type) {
           case AchievementTypeProps.Icon:
               return (
                    <Grid item container className={classes.icon} alignItems="center" justify="center">
                        <FireIcon />
                    </Grid>
               )
            case AchievementTypeProps.Text:
                return (
                    <Grid item container className={classes.icon} alignItems="center" justify="center">
                        <Grid className={classes.bigText} item>{props.achievement.value}</Grid>
                        <Grid className={classes.mediumText} item>/{props.achievement.max}</Grid>
                    </Grid>
                )
        }
    }
    return (
        <Grid style={{marginRight: 60, marginTop: 30}} container direction="column">
            <Grid item className={classes.coverContainer}>
                <Image src={props.coverUrl} className={classes.coverBackground}/>
                {content()}
            </Grid>
            <Grid style={{width: 120}} className={classes.smallText} item container>
                <Grid item container alignItems="center" justify="center">{props.title}</Grid>
            </Grid>
        </Grid>
    )
}

export type AchievementProps = {
    header: string
    achievements: AchievementItemProps[]
}

export default function AchievementComponent(props: AchievementProps) {
    const classes = useStyles()
    return (
        <Grid className={classes.root} container>
            <Grid className={classes.header} item>{props.header}</Grid>
            <Grid item container>
                {props.achievements.map(a => {
                    return (
                        <Grid item>
                            <AchievementItemComponent {...a}/>
                        </Grid>
                    )
                })}
            </Grid>
        </Grid>
    )
}
