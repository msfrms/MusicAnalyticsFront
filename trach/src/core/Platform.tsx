export enum Platform {
    AppleMusic = "apple_music",
    BoomVK = "boom_vk",
    BoomOK = "boom_ok",
    Zvuk = "zvuk",
    Deezer = "deezer",
    Shazam = "shazam",
    YandexMusic = "yandex_music",
    Itunes = "itunes",
    Youtube = "youtube",
    Spotify = "spotify",
    Vk = "vk"
}

export function platformToColor(platformId: string): string {
    switch (platformId) {
        case "apple_music": return "#333333"
        case "boom_vk": return "#4986CC"
        case "boom_ok": return "#FF9933"
        case "zvuk": return "#4ADDBA"
        case "deezer": return "#29AB70"
        case "shazam": return "#00D2FF"
        case "yandex_music": return "#FFCC00"
        case "itunes": return "#E84BB8"
        case "youtube": return "#FF0000"
        case "spotify": return "#121925"
        case "vk": return "#333333"
        default: return ""
    }
}

export function platformToTitle(platform: Platform): string {
    switch (platform) {

        case Platform.AppleMusic:
            return "Apple Music"

        case Platform.BoomOK:
            return "BOOM OK"

        case Platform.BoomVK:
            return "BOOM VK"

        case Platform.Deezer:
            return "Deezer"

        case Platform.Itunes:
            return "iTunes"

        case Platform.Shazam:
            return "Shazam"

        case Platform.YandexMusic:
            return "Яндекс.Музыка"

        case Platform.Youtube:
            return "Youtube"

        case Platform.Zvuk:
            return "Сбер Звук"

        case Platform.Spotify:
            return "Spotify"

        case Platform.Vk:
            return "VK"
    }
}
