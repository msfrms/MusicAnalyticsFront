export type AppConstants = {
    api: {
        artist: (id: number) => {
            info: string
            achievement: string
            plot: string
            report: string
            similar: string
            tracks: {
                inCharts: string
                inPlaylists: string
            },
            albums: {
                chart: string
            }
        }
        list: {
            chart: {
                tracks: string
                albums: string
            }
            news: {
                tracks: string
                albums: string
                artists: string
            }
        }
        track: (id: number) => {
            info: string
            charts: {
                plot: string
                report: string
            }
            news: {
                plot: string
                report: string
            }
            playlists: string
            report: string
        }
        album: (id: number) => {
            info: string
            charts: {
                plot: string
                report: string
            }
            news: {
                plot: string
                report: string
            }
        }
        search: string
    }
}

const baseUrl = 'http://194.67.93.158:5050/api/v1'

export const Constants: AppConstants = {
    api: {
        artist: (id: number) => {
            return {
                info: `${baseUrl}/artist/${id}/info`,
                achievement: `${baseUrl}/artist/${id}/achievement`,
                plot: `${baseUrl}/artist/${id}/plot`,
                report: `${baseUrl}/artist/${id}/plot/report`,
                similar: `${baseUrl}/artist/${id}/similar`,
                tracks: {
                    inCharts: `${baseUrl}/artist/${id}/tracks/chart`,
                    inPlaylists: `${baseUrl}/artist/${id}/tracks/playlists`
                },
                albums: {
                    chart: `${baseUrl}/artist/${id}/albums/chart`
                }
            }
        },
        list: {
            chart: {
                tracks: `${baseUrl}/list/chart/tracks`,
                albums: `${baseUrl}/list/chart/albums`
            },
            news: {
                tracks: `${baseUrl}/list/news/tracks`,
                albums: `${baseUrl}/list/news/albums`,
                artists: `${baseUrl}/list/artists/tracks`,
            },
        },
        track: (id: number) => {
            return {
                info: `${baseUrl}/track/${id}/info`,
                charts: {
                    plot: `${baseUrl}/track/${id}/charts/plot`,
                    report: `${baseUrl}/track/${id}/charts/plot/report`
                },
                news: {
                    plot: `${baseUrl}/track/${id}/news/plot`,
                    report: `${baseUrl}/track/${id}/news/plot/report`,
                },
                playlists: `${baseUrl}/track/${id}/playlists`,
                report: `${baseUrl}/track/${id}/exist/report`,
            }
        },
        album: (id: number) => {
            return {
                info: `${baseUrl}/album/${id}/info`,
                charts: {
                    plot: `${baseUrl}/album/${id}/charts/plot`,
                    report: `${baseUrl}/album/${id}/charts/plot/report`
                },
                news: {
                    plot: `${baseUrl}/album/${id}/news/plot`,
                    report: `${baseUrl}/album/${id}/news/plot/report`
                },
            }
        },
        search: `${baseUrl}/search`,
    }
}

export function maxDateInDatabase(): Date {
    return new Date(2022, 1, 14)
}