import { useState } from 'react'
import { TopNavBar } from './components/TopNavBar'
import { Watchroom } from './components/Watchroom'
import type { StreamInfo, SearchResultInfo } from './types/stream'



function App() {

  
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResultInfo[]>([])
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  
  console.log(searchQuery)

  function handleSearch(searchQuery: string) {
    if (!searchQuery) {
      setSearchResults([]);
      setIsPanelOpen(false);
      return;
    }
    console.log(searchQuery)
    // Simulate search results
    const dummyStreams = [
          { id: 1, title: "Stream 1", embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", thumbnailUrl: "https://img.youtube.com/embed/dQw4w9WgXcQ/hqdefault.jpg", channelName: "Stream1", isLive: true, viewCount: "250", description: "this asdasd sdajsdnas sadjshna sadjsknajda sadjansd sadjkan" },
          { id: 2, title: "Stream 2", embedUrl: "https://www.youtube.com/embed/SonfK-rTHPQ", thumbnailUrl: "https://img.youtube.com/embed/SonfK-rTHPQ/hqdefault.jpg", channelName: "Stream2", isLive: false, viewCount: "12422"  },
          { id: 3, title: "Stream 3", embedUrl: "https://www.youtube.com/embed/ri35YKhV-ME", thumbnailUrl: "https://img.youtube.com/embed/ri35YKhV-ME/hqdefault.jpg", channelName: "Stream3", isLive: true, viewCount: "1337"  },
          { id: 4, title: "Stream 4", embedUrl: "https://www.youtube.com/embed/WJOAvttDJ-Q", thumbnailUrl: "https://img.youtube.com/embed/WJOAvttDJ-Q/hqdefault.jpg", channelName: "Stream4", isLive: true, viewCount: "67"  },
          { id: 5, title: "Stream 5", embedUrl: "https://www.youtube.com/embed/yAtUSvVayM0", thumbnailUrl: "https://img.youtube.com/embed/yAtUSvVayM0/hqdefault.jpg", channelName: "Stream5", isLive: false, viewCount: "54230"  },
          
        ]
    const results = dummyStreams.filter(stream => stream.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(results)
    setIsPanelOpen(true)
  }
  console.log(searchResults)

  function handleAddSearchResultToStream(result: SearchResultInfo) {
    const newStreams: StreamInfo = {
      id: result.id,
      title: result.title,
      embedUrl: result.embedUrl,
      thumbnailUrl: result.thumbnailUrl,
    }
    setStreams(prevStreams => [...prevStreams, newStreams])
    setIsPanelOpen(false)
    setSearchQuery('')
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
      <Watchroom streams={streams} onRemoveStream={handleRemoveStream} />
      
    </>
  )
}

export default App
