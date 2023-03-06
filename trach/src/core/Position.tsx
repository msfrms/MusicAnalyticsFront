export enum TrackProgress {
    Same = "track.position.same",
    Up = "track.position.up",
    Down = "track.position.down"
}

export type Position = {
    value: number
    progress: TrackProgress
    shift?: number
}