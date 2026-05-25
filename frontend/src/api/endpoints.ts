import type { SearchResultInfo } from '../types/stream'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')

export const apiEndpoints = {
  youtubeSearch: (query: string) =>
    `${apiBaseUrl}/api/youtube/search?q=${encodeURIComponent(query)}`,
  youtubeVideoByInputUrl: (input: string) =>
    `${apiBaseUrl}/api/youtube/video?input=${encodeURIComponent(input)}`,
}

export async function fetchYoutubeSearchResults(
  query: string
): Promise<SearchResultInfo[]> {
  const response = await fetch(apiEndpoints.youtubeSearch(query))
  if (!response.ok) {
    throw new Error(
      `Failed to fetch YouTube search results: ${response.statusText}`
    )
  }
  const data = await response.json()
  return data as SearchResultInfo[]
}

export async function fetchYoutubeVideoByUrl(
  input: string
): Promise<SearchResultInfo> {
  const response = await fetch(apiEndpoints.youtubeVideoByInputUrl(input))
  if (!response.ok) {
    throw new Error(`Failed to fetch Video with URL: ${response.statusText}`)
  }
  const data = await response.json()
  return data as SearchResultInfo
}
