import { useState } from 'react'
import { TopNavBar } from './components/TopNavBar'
import { Watchroom } from './components/Watchroom'
import type { StreamInfo, SearchResultInfo } from './types/stream'
import { dummyData } from './mockData/searchResults'



function App() {

  
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultInfo[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  

  const dummyStreams = dummyData

  function handleSearch(searchQuery: string) {
    if (!searchQuery) {
      setSearchResults([]);
      setIsPanelOpen(false);
      return;
    }
    // Simulate search results
   
    const results = dummyStreams.filter(stream => stream.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(results)
    setIsPanelOpen(true)
  }

  function handleAddSearchResultToStream(result: SearchResultInfo) {
    if (streams.length >= 4) {
      return
    }
    const newStreams: StreamInfo = {
      id: result.id,
      title: result.title,
      embedUrl: result.embedUrl,
      thumbnailUrl: result.thumbnailUrl,
    }
    setStreams(prevStreams => [...prevStreams, newStreams])
    setIsPanelOpen(false)
    // setSearchQuery('')
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
  function handleRemoveStream(streamId: number) {
    setStreams(prevStreams => prevStreams.filter(stream => stream.id !== streamId))
  }
  return (
    <>
      <TopNavBar items={streams.length} 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch}
        isPanelOpen={isPanelOpen} setIsPanelOpen={setIsPanelOpen} 
        searchResults={searchResults} handleAddSearchResultToStream={handleAddSearchResultToStream} 

         />
      <Watchroom streams={streams} onRemoveStream={handleRemoveStream} swapStream={swapStream} />
      
    </>
  )
}

export default App
