

import type { SearchResultInfo } from '../types/stream'

type SearchResultPanelProps = {
    setModalState: (visible: boolean) => void
    searchResults: SearchResultInfo[]
    handleAddSearchResultToStream: (result: SearchResultInfo) => void
    setSearchQuery: (query: string) => void
}


export function SearchResultPanel({ setModalState, searchResults, handleAddSearchResultToStream,  }: SearchResultPanelProps) {

    function handleClose() {
        setModalState(false)
    }

    return (
        <div className="absolute left-1/2 -translate-x-1/2 top-full z-30 w-7/6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 text-zinc-100 shadow-xl">
            <div className="relative max-h-[70dvh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Search Results</h2>
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-3 rounded-md px-2 py-1 text-sm text-zinc-300 hover:bg-white/10 hover:text-white"
                >
                    X 
                </button>
                    {searchResults.length > 0 ? (
                        searchResults.map(stream => (
                            <div key={stream.id} className="border-b py-2 flex items-center gap-4 h-[13dvh]">
                                <img src={stream.thumbnailUrl} 
                                     alt={stream.title}
                                     className="ml-2 mb-1 h-32 w-42 shrink-0 object-cover rounded-md" 
                                />
                                <div className="min-w-0 flex-1" >
                                    <h3 className="font-semibold flex truncate text-sm">{stream.title}</h3>
                                    <p className=" mt-1 flex text-xs text-zinc-400"> {stream.channelName} </p>

                                    {stream.viewCount && (<span className="mt-1 flex text-xs text-zinc-400"> {stream.viewCount} viewers </span> )}
                                    {stream.description && (<p className="mt-1 truncate text-sm text-zinc-400"> {stream.description} </p>)}
                                    <div className="mt-2 flex items-center gap-2 text-xs text-zinc-400">
                                        {stream.isLive && ( <span className="rounded-full bg-red-500/15 px-2 py-0.5 font-medium text-red-400" > Live </span>)} 

                                    </div>
                                </div>
                                
                                <button onClick={() => handleAddSearchResultToStream(stream)} className="shrink-0 mr-2 py-2 text-sm font-medium bg-green-500 text-white rounded-md hover:bg-green-600">
                                    Add Stream
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className="px-4 py-3 text-sm text-zinc-400">No results found.</p>
                    )}
                
            </div>
        </div>
    )
}