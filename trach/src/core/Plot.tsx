import { Stats } from './Stats'

export enum Change {
    Increment = "up",
    Decrement = "down",
    New = "new",
    Unchanged = "same"
}

export type ChangePosition = {
    change: Change
    value?: number  
}

export type Timeline = {
    position: number
    date: string
}

export type Platform = {
    id: string
    title: string
    stats?: Stats
    timelines: Timeline[]
}

export type Plot = {
    platforms: Platform[]
    dates: string[]
}
