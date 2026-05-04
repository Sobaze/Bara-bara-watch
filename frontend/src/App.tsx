import { useState } from 'react'
import { TopNavBar } from './components/TopNavBar'
import { Watchroom } from './components/Watchroom'
import type { StreamInfo, SearchResultInfo } from './types/stream'
// import { dummyData } from './mockData/searchResults'
import { fetchYoutubeSearchResults } from './api/endpoints'



function App() {

  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultInfo[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  

  // const dummyStreams = dummyData

  async function handleSearch(searchQuery: string) {
    if (!searchQuery) {
      setSearchResults([]);
      setIsPanelOpen(false);
      setSearchError(null);
      return;
    }
    try {
      setIsSearching(true);
      setSearchError(null);
      setIsPanelOpen(true);
      const results = await fetchYoutubeSearchResults(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    } catch (err) {
      console.error('Error fetching search results:', err);
      setSearchError('Failed to fetch search results. Please try again.');
      setSearchResults([]);
      setIsSearching(false);
    }
  }

  function handleAddSearchResultToStream(result: SearchResultInfo) {
    if (streams.length >= 4) {
      return
    }
    const newStreams: StreamInfo = {
      instanceId: crypto.randomUUID(),
      videoId: result.videoId,
      title: result.title,
      embedUrl: result.embedUrl,
      thumbnailUrl: result.thumbnailUrl,
    }
    setStreams(prevStreams => [...prevStreams, newStreams])
    setIsPanelOpen(false)
  }
  function swapStream(fromIndex: number, toIndex: number) {
    setStreams(prevStreams => {
      if (fromIndex < 0 || toIndex < 0 || fromIndex >= prevStreams.length || toIndex >= prevStreams.length) {
        return prevStreams
      }
      const updatedStreams = [...prevStreams]
      const temp = updatedStreams[fromIndex]
      updatedStreams[fromIndex] = updatedStreams[toIndex]
      updatedStreams[toIndex] = temp
      return updatedStreams
    });
  }
  function handleRemoveStream(streamId: string) {
    setStreams(prevStreams => prevStreams.filter(stream => stream.instanceId !== streamId))
  }
  return (
    <>
      <TopNavBar items={streams.length} 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}
        isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} 
        searchResults={searchResults} handleAddSearchResultToStream={handleAddSearchResultToStream} 
        isSearching={isSearching}
        searchError={searchError}

         />
      <Watchroom streams={streams} onRemoveStream={handleRemoveStream} swapStream={swapStream} />
      
    </>
  )
}

export default App
