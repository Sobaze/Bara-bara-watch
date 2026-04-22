import { useState } from 'react'
import { TopNavBar } from './components/TopNavBar'
import { Watchroom } from './components/Watchroom'
import type { StreamInfo } from './types/stream'



function App() {

  
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<StreamInfo[]>([])
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
          { id: 1, title: "Stream 1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "Stream 2", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 3, title: "Stream 3", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 3, title: "Stream 3", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 3, title: "Stream 3", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ]
    const results = dummyStreams.filter(stream => stream.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setSearchResults(results)
    setIsPanelOpen(true)
  }
  console.log(searchResults)

  function handleAddStreams(newStreams: StreamInfo[]) {
    setStreams(prevStreams => [...prevStreams, ...newStreams])
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
        searchResults={searchResults} handleAddStreams={handleAddStreams} 

         />
      <Watchroom streams={streams} onRemoveStream={handleRemoveStream} />
      
    </>
  )
}

export default App
