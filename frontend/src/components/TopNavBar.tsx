import { SearchResultPanel } from './SearchResultPanel'
import type { SearchResultInfo } from '../types/stream'

type TopNavBarProps = {
  items: number
  searchQuery: string
  setSearchQuery: (query: string) => void
  handleSearch: (query: string) => void
  isPanelOpen: boolean
  setIsPanelOpen: (open: boolean) => void
  searchResults: SearchResultInfo[]
  handleAddSearchResultToStream: (result: SearchResultInfo) => void
  isSearching: boolean
  searchError: string | null
}

export function TopNavBar({
  items,
  searchQuery,
  setSearchQuery,
  handleSearch,
  isPanelOpen,
  setIsPanelOpen,
  searchResults,
  handleAddSearchResultToStream,
  isSearching,
  searchError,
}: TopNavBarProps) {
  function handleSearchString(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value)
  }

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    handleSearch(searchQuery.trim())
  }

  return (
    <nav className="grid grid-cols-[auto_1fr_auto] h-[7dvh] items-center gap-2 bg-gray-800 px-2  text-white">
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <h1 className="text-lg font-bold">Bara Bara Watch</h1>
      </div>
      <div className="relative mx-auto w-full max-w-xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchString}
            className="w-full rounded-full border border-white/10 bg-white/95 px-4 py-2 text-sm text-zinc-900 outline-none transition focus:ring-2 focus:ring-blue-500"
          />
        </form>
        {isPanelOpen && (
          <SearchResultPanel
            setIsPanelOpen={setIsPanelOpen}
            searchResults={searchResults}
            handleAddSearchResultToStream={handleAddSearchResultToStream}
            items={items}
            isSearching={isSearching}
            searchError={searchError}
          />
        )}
      </div>
      <div className="justify-self-end">
        <p className="text-sm font-medium whitespace-nowrap pr-2">
          Available povs: {items} / 4
        </p>
      </div>
    </nav>
  )
}
