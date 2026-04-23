export type StreamInfo = {
    id: number,
    title: string,
    embedUrl: string,
    thumbnailUrl?: string,
    channelName?: string
}

export type SearchResultInfo = {
    id: number,
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