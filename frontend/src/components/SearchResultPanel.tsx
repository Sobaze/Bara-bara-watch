

import type { SearchResultInfo } from '../types/stream'

type SearchResultPanelProps = {
    setIsPanelOpen: (visible: boolean) => void
    searchResults: SearchResultInfo[]
    handleAddSearchResultToStream: (result: SearchResultInfo) => void
    items: number
    isSearching: boolean
    searchError: string | null
}


export function SearchResultPanel({ setIsPanelOpen, searchResults, handleAddSearchResultToStream, items, isSearching, searchError }: SearchResultPanelProps) {

    function handleClose() {
        setIsPanelOpen(false)
    }
    function formatViewNumbers(viewCount?: string) {
        const num = Number(viewCount);
        if (isNaN(num)) return viewCount; // Return original string if it's not a number
        return num.toLocaleString('sv-SE');
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
                >
                    X 
                </button>
                <div className="relative max-h-[70dvh] overflow-y-auto">
                        { isSearching ? null : 
                            searchError? 
                            <p> Failed to get any results. Please try again.</p> :
                            searchResults.length > 0 ? (
                            searchResults.map(stream => (
                                <div key={stream.videoId} className="border-b py-2 flex items-center gap-4 ">
                                    <img src={stream.thumbnailUrl} 
                                        alt={stream.title}
                                        className="ml-2 mb-1 h-30 w-38 shrink-0 object-cover rounded-md" 
                                    />
                                    <div className="min-w-0 flex-1" >
                                        <h3 className="font-semibold flex truncate text-sm">{stream.title}</h3>
                                        <p className=" mt-1 flex text-xs text-zinc-400"> {stream.channelName} </p>

                                            {!stream.isLive && stream.viewCount ? (
                                            <span className="mt-1 flex text-xs text-zinc-400"> {formatViewNumbers(stream.viewCount)} views </span> 
                                            ) : stream.isLive && stream.currentViewers ? (
                                            <span className="mt-1 flex text-xs text-zinc-400"> {formatViewNumbers(stream.currentViewers)} viewers </span> 
                                            ) : null}
                                            {stream.description && (<p className="mt-1 flex truncate text-sm text-zinc-400"> {stream.description} </p>)}
                                            <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                                                {stream.isLive && ( <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-medium text-red-400" > Live </span>)} 
                                            </div>
                                    </div>
                                        {items < 4 && (
                                            <button onClick={() => handleAddSearchResultToStream(stream)} className="shrink-0 mr-2 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600">
                                                Add Stream
                                            </button>
                                        )}
                                </div>
                                ))
                            ) : (
                            <p className="px-4 py-3 text-sm text-zinc-400">No results found.</p>
                        )}
                    
                </div>
        </div>
    )
}