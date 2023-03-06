export type Timeline = {
    value: number
    date: string
}

export type Metric = {
    id: string
    title: string
    timelines: Timeline[]
}

export type ArtistMetric = {
    metrics: Metric[]
    dates: string[]
}