import type { SearchResultInfo } from '../types/stream'
import { SearchResultRow } from './SearchResultRow'

type SearchResultPanelProps = {
  setIsPanelOpen: (visible: boolean) => void
  searchResults: SearchResultInfo[]
  onAddSearchResult: (result: SearchResultInfo) => void
  streamCount: number
  isSearching: boolean
  searchError: string | null
}

export function SearchResultPanel({
  setIsPanelOpen,
  searchResults,
  onAddSearchResult,
  streamCount,
  isSearching,
  searchError,
}: SearchResultPanelProps) {
  function handleClose() {
    setIsPanelOpen(false)
  }

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-full z-30 w-[min(56rem,95vw)] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 text-zinc-100 shadow-xl">
      {isSearching ? (
        <div className="flex items-center justify-center gap-3 px-4 py-4 text-zinc-300">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-600 border-t-blue-400" />
          <h2 className="text-xl font-bold">Searching...</h2>
        </div>
      ) : searchError ? (
        <h2 className="text-xl font-bold mb-4 text-red-400">{searchError}</h2>
      ) : (
        <h2 className="text-xl font-bold mb-4">Search Results</h2>
      )}
      <button
        onClick={handleClose}
        className="absolute right-1 top-1 rounded-md px-2 py-1 mb-2 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
        aria-label="Close search results panel"
      >
        X
      </button>
      <div className="relative max-h-[70dvh] overflow-y-auto">
        {isSearching ? null : searchError ? (
          <p>Failed to get any results. Please try again.</p>
        ) : searchResults.length > 0 ? (
          searchResults.map((stream) => (
            <SearchResultRow
              key={stream.videoId}
              stream={stream}
              streamCount={streamCount}
              onAddSearchResult={onAddSearchResult}
            />
          ))
        ) : (
          <p className="px-4 py-3 text-sm text-zinc-400">No results found.</p>
        )}
      </div>
    </div>
  )
}
