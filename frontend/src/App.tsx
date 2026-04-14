import { useState } from 'react'
import { TopNavBar } from './components/TopNavBar'
import { Watchroom } from './components/Watchroom'
import { SearchResultModal } from './components/SearchResultModal'
import type { StreamInfo } from './types/stream'



function App() {

  const dummyStreams = [
          { id: 1, title: "Stream 1", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 2, title: "Stream 2", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 3, title: "Stream 3", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
          { id: 3, title: "Stream 3", url: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
      ]
  const [streams, setStreams] = useState<StreamInfo[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  function handleSearch(query: string) {
    // Simulate search results
    const results = dummyStreams.filter(stream => stream.title.toLowerCase().includes(query.toLowerCase()))
    setStreams(results)
    setIsModalOpen(false)
  }

  function handleAddStreams(newStreams: StreamInfo[]) {
    setStreams(prevStreams => [...prevStreams, ...newStreams])
  }
  function handleRemoveStream(streamId: number) {
    setStreams(prevStreams => prevStreams.filter(stream => stream.id !== streamId))
  }
  return (
    <>
      <TopNavBar items={dummyStreams.length} />
      <Watchroom streams={dummyStreams} onRemoveStream={handleRemoveStream} />
      {isModalOpen && <SearchResultModal />}
    </>
  )
}

export default App
