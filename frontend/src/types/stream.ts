export type StreamInfo = {
    instanceId: string,
    videoId: string,
    title: string,
    embedUrl: string,
    thumbnailUrl?: string,
    channelName?: string
}

export type SearchResultInfo = {
    videoId: string,
    title: string,
    embedUrl: string,
    thumbnailUrl: string,
    channelName: string,
    isLive?: boolean,
    viewCount?: string
    description?: string,
    publishedAt?: string,
    duration?: string
}

export type TwoStreamLayout = 'side-by-side' | 'stacked'

export type ThreeStreamLayout = 'main-on-top' | 'main-on-left'

export type ActiveLayout = TwoStreamLayout | ThreeStreamLayout | null

export type LayoutMode = '2-stream' | '3-stream' | null