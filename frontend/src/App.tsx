import { useState, useRef } from 'react'
import { TopNavBar } from './components/TopNavBar'
import { Watchroom } from './components/Watchroom'
import type { StreamInfo, SearchResultInfo } from './types/stream'
import { fetchYoutubeSearchResults } from './api/endpoints'
function App() {
  const latestSearchRequestRef = useRef(0)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultInfo[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  async function handleSearch(searchQueryString: string) {
    const requestId = latestSearchRequestRef.current + 1
    latestSearchRequestRef.current = requestId
    if (!searchQueryString) {
      setSearchResults([])
      setIsPanelOpen(false)
      setSearchError(null)
      setIsSearching(false)
      return
    }
    try {
      setIsSearching(true)
      setSearchError(null)
      setIsPanelOpen(true)
      const results = await fetchYoutubeSearchResults(searchQueryString)
      if (latestSearchRequestRef.current !== requestId) {
        return
      }
      setSearchResults(results)
    } catch (err) {
      if (latestSearchRequestRef.current !== requestId) {
        return
      }
      console.error('Error fetching search results:', err)
      setSearchError('Failed to fetch search results. Please try again.')
      setSearchResults([])
    } finally {
      if (latestSearchRequestRef.current === requestId) {
        setIsSearching(false)
      }
    }
  }

  function handleAddSearchResultToStream(result: SearchResultInfo) {
    const newStreams: StreamInfo = {
      instanceId: crypto.randomUUID(),
      videoId: result.videoId,
      title: result.title,
      embedUrl: result.embedUrl,
      thumbnailUrl: result.thumbnailUrl,
    }
    setStreams((prevStreams) => {
      if (prevStreams.length >= 4) {
        return prevStreams
      }
      return [...prevStreams, newStreams]
    })
    setIsPanelOpen(false)
  }

  function swapStream(fromIndex: number, toIndex: number) {
    setStreams((prevStreams) => {
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= prevStreams.length ||
        toIndex >= prevStreams.length
      ) {
        return prevStreams
      }
      const updatedStreams = [...prevStreams]
      const temp = updatedStreams[fromIndex]
      updatedStreams[fromIndex] = updatedStreams[toIndex]
      updatedStreams[toIndex] = temp
      return updatedStreams
    })
  }

  function handleRemoveStream(streamId: string) {
    setStreams((prevStreams) =>
      prevStreams.filter((stream) => stream.instanceId !== streamId)
    )
  }

  return (
    <>
      <TopNavBar
        streamCount={streams.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        isPanelOpen={isPanelOpen}
        setIsPanelOpen={setIsPanelOpen}
        searchResults={searchResults}
        onAddSearchResult={handleAddSearchResultToStream}
        isSearching={isSearching}
        searchError={searchError}
      />
      <Watchroom
        streams={streams}
        onRemoveStream={handleRemoveStream}
        onSwapStream={swapStream}
      />
    </>
  )
}

export default App
